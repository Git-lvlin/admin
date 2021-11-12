import React, { useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Space, Radio } from 'antd'
import moment from 'moment'
import ProTable from '@ant-design/pro-table'

import BarChart from './bar-chart'
import styles from './styles.less'
import SelectDate from '../components/SelectDate'
import AddressCascader from '@/components/address-cascader'

const date = (day) => moment().subtract(day, 'days').calendar().replaceAll('/', '-')

const OperationData = () => {
  const [dateSelect, setDateSelect] = useState(date(0))
  const [value, setValue] = useState(1)
  
  const onChange = e => {
    setValue(e.target.value)
  }

  const data = [
    {
      country: "中国",
      population: 131744
    },
    {
      country: "印度",
      population: 104970
    },
    {
      country: "美国",
      population: 29034
    },
    {
      country: "印尼",
      population: 23489
    },
    {
      country: "巴西",
      population: 18203
    }
  ]
  data.sort((a, b) => a.population - b.population)

  const columns = [
    {
      title: '社区店名称',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '地区范围',
      dataIndex: '',
      renderFormItem: () => (<AddressCascader />),
      hideInTable: true
    },
    {
      title: '统计时间范围',
      dataIndex: '',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '采购订单数量',
      dataIndex: '',
      hideInSearch: true,
      align: true
    },
    {
      title: '采购总金额',
      dataIndex: '',
      hideInSearch: true,
      align: true
    },
    {
      title: '参与集约次数',
      dataIndex: '',
      hideInSearch: true,
      align: true
    },
    {
      title: '集约参与率',
      dataIndex: '',
      hideInSearch: true,
      align: true
    },
    {
      title: 'C端销售订单数',
      dataIndex: '',
      hideInSearch: true,
      align: true
    },
    {
      title: 'C端销售总金额',
      dataIndex: '',
      hideInSearch: true,
      align: true
    },
    {
      title: '成功邀请用户数量',
      dataIndex: '',
      hideInSearch: true,
      align: true
    },
    {
      title: '成功邀请店主数量',
      dataIndex: '',
      hideInSearch: true,
      align: true
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
        <BarChart data={data} />
      </div>
      <ProTable
        rowKey=""
        search={{
          labelWidth: 120
        }}
        columns={columns}
        request={{}}
        params={{}}
        toolbar={{
          settings: false
        }}
        pagination={{
          showQuickJumper: true
        }}
      />
    </PageContainer>
  )
}

export default OperationData
