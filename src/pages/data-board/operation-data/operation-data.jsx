import React, { useState, useEffect, useRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Space, Radio, Tooltip } from 'antd'
import moment from 'moment'
import ProTable from '@ant-design/pro-table'
import { QuestionCircleOutlined } from '@ant-design/icons'

import BarChart from './bar-chart'
import styles from './styles.less'
import SelectDate from '../components/SelectDate'
import AddressCascader from '@/components/address-cascader'
import { operationsCenterData, operationsCenterRank } from '@/services/data-board/operation-data'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import { getTimeDistance } from '@/utils/utils'

const OperationData = () => {
  const [rangePickerValue, setRangePickerValue] = useState(getTimeDistance('nearly-7-days'))
  const [value, setValue] = useState(1)
  const [charData, setCharData] = useState([])
  const [visit, setVisit] = useState(false)
  const form = useRef()

  const getFieldValue = () => {
    const { time, area, storeName, ...rest } = form.current.getFieldsValue()
    return {
      startTime: time?.[0]?.format('YYYY-MM-DD'),
      endTime: time?.[1]?.format('YYYY-MM-DD'),
      province: area?.[0],
      city: area?.[1],
      area: area?.[2],
      name: storeName,
      ...rest
    }
  }

  const selectDate = (type) => {
    setRangePickerValue(getTimeDistance(type))
  }

  useEffect(()=> {
    operationsCenterRank({
      startTime: moment(rangePickerValue?.[0]).format("YYYY-MM-DD"),
      endTime: moment(rangePickerValue?.[1]).format("YYYY-MM-DD"),
      type: value
    }).then(res=> {
      setCharData(res.data.map(item=>(
        {companyName: item.companyName, value: Number(item.value)}
      )))
    })
    return ()=> {
      setCharData([])
    }
  }, [value, rangePickerValue])
  
  const onChange = e => {
    setValue(e.target.value)
  }

  const handleRangePickerChange = (value) => {
    setRangePickerValue(value)
  }

  const columns = [
    {
      title: '运营中心名称',
      dataIndex: 'companyName',
      align: 'center'
    },
    {
      title: ()=>(
        <Space>
          <span>创建时间</span>
          <Tooltip title='在平台进行创建账号的时间'>
            <QuestionCircleOutlined/>
          </Tooltip>
        </Space>
      ),
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '地区范围',
      dataIndex: 'area',
      renderFormItem: () => (<AddressCascader areaData={window.yeahgo_area.filter(item=>item.deep !== 3)} />),
      hideInTable: true
    },
    {
      title: '统计时间范围',
      dataIndex: 'time',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: ()=>(
        <Space>
          <span>下属社区店总数量</span>
          <Tooltip title='已和运营中心进行绑定且社区店已通过审核的店主总数量'>
            <QuestionCircleOutlined/>
          </Tooltip>
        </Space>
      ),
      dataIndex: 'storeCt',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: ()=>(
        <Space>
          <span>运营中心集约率</span>
          <Tooltip title='下属社区店有下单的店主数/下属社区店总数量'>
            <QuestionCircleOutlined/>
          </Tooltip>
        </Space>
      ),
      dataIndex: '',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '社区店采购订单总量',
      dataIndex: 'payCt',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '社区店采购订单总额',
      dataIndex: 'payTotal',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '总收益额',
      dataIndex: 'totalAll',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '佣金总收益',
      dataIndex: '',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '补贴总收益',
      dataIndex: '',
      hideInSearch: true,
      align: 'center'
    }
  ]

  return (
    <PageContainer title={false}>
      <div className={styles.timeSearch}>
        <Space size={20}>
          <h3>运营中心排名</h3>
          <SelectDate
            setDateSelect={setRangePickerValue}
            selectDate={selectDate}
            rangePickerValue={rangePickerValue}
            handleRangePickerChange={handleRangePickerChange}
          />
        </Space>
      </div>
      <div className={styles.radioArea}>
        <Radio.Group 
          onChange={onChange}
          value={value}
          size="large"
        >
          <Radio value={1}>社区店采购订单总量</Radio>
          <Radio value={2}>总收益排名</Radio>
        </Radio.Group>
        <BarChart data={charData} />
      </div>
      <ProTable
        rowKey="companyName"
        formRef={form}
        search={{
          labelWidth: 120,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Export
              change={(e)=> {setVisit(e)}}
              key="export" 
              type="data-board-operations-centers-export"
              conditions={getFieldValue}
            />,
            <ExportHistory 
              key="export-history" 
              show={visit} setShow={setVisit}
              type="data-board-operations-centers-export"
            />
          ]
        }}
        columns={columns}
        request={operationsCenterData}
        params={{}}
        toolbar={{
          settings: false
        }}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
      />
    </PageContainer>
  )
}

export default OperationData
