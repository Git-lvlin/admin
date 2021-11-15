import React, { useState, useEffect, useRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Space, Radio } from 'antd'
import moment from 'moment'
import ProTable from '@ant-design/pro-table'

import BarChart from './bar-chart'
import styles from './styles.less'
import SelectDate from '../components/SelectDate'
import AddressCascader from '@/components/address-cascader'
import { operationsCenterData, operationsCenterRank } from '@/services/data-board/operation-data'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'

const date = (day) => moment().subtract(day, 'days').calendar().replaceAll('/', '-')
const dateNow = moment(+new Date()).format('YYYY-MM-DD')

const OperationData = () => {
  const [dateSelect, setDateSelect] = useState(date(7))
  const [value, setValue] = useState(1)
  const [charData, setCharData] = useState([])
  const [visit, setVisit] = useState(false)
  const form = useRef()

  const getFieldValue = () => {
    const { time, area, ...rest } = form.current.getFieldsValue()
    return {
      startTime: time?.[0]?.format('YYYY-MM-DD'),
      endTime: time?.[1]?.format('YYYY-MM-DD'),
      province: area?.[0],
      city: area?.[1],
      area: area?.[2],
      ...rest
    }
  }

  useEffect(()=> {
    operationsCenterRank({
      startTime: dateSelect,
      endTime: dateNow,
      type: value
    }).then(res=> {
      setCharData(res.data)
    })
    return ()=> {
      setCharData([])
    }
  }, [value, dateSelect])
  
  const onChange = e => {
    setValue(e.target.value)
  }

  const columns = [
    {
      title: '运营中心名称',
      dataIndex: 'companyName',
      align: 'center'
    },
    {
      title: '地区范围',
      dataIndex: 'area',
      renderFormItem: () => (<AddressCascader />),
      hideInTable: true
    },
    {
      title: '统计时间范围',
      dataIndex: 'time',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '下属社区店数量',
      dataIndex: 'storeCt',
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
    }
  ]

  return (
    <PageContainer title={false}>
      <div className={styles.timeSearch}>
        <Space size={20}>
          <h3>运营中心排名</h3>
          <SelectDate setDateSelect={setDateSelect} dateSelect={dateSelect}/>
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
