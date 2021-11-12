import React, { useState, useEffect } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Space, Radio } from 'antd'
import moment from 'moment'
import ProTable from '@ant-design/pro-table'

import BarChart from './bar-chart'
import styles from './styles.less'
import SelectDate from '../components/SelectDate'
import AddressCascader from '@/components/address-cascader'
import { communityStoreSalesRank, communityStoreData } from '@/services/data-board/community-store-data'
import { amountTransform } from '@/utils/utils'

const date = (day) => moment().subtract(day, 'days').calendar().replaceAll('/', '-')
const dateNow = moment(+new Date()).format('YYYY-MM-DD')

const CommunityStoreData = () => {
  const [dateSelect, setDateSelect] = useState(date(7))
  const [value, setValue] = useState(1)
  const [data, setData] = useState([])

  useEffect(() => {
    communityStoreSalesRank({
      startTime: dateSelect,
      endTime: dateNow,
      type: value
    }).then(res => {
      setData(res.data)
    })
    return () => {
      setData([])
    }
  }, [dateSelect, value])
  
  const onChange = e => {
    setValue(e.target.value)
  }

  const columns = [
    {
      title: '社区店名称',
      dataIndex: 'storeName',
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
      title: '采购订单数量',
      dataIndex: 'orderCt',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '采购总金额',
      dataIndex: 'bSaleTotal',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '可参与集约活动的总数',
      dataIndex: 'totalWsCt',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '已参与集约活动的次数',
      dataIndex: 'wsCt',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '集约参与率',
      dataIndex: 'wsRat',
      hideInSearch: true,
      align: 'center',
      render: (_) => `${amountTransform(Number(_), '*')}%`

    },
    {
      title: 'C端销售订单数',
      dataIndex: 'cOrderCt',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: 'C端销售总金额',
      dataIndex: 'cSaleTotal',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '成功邀请用户数量',
      dataIndex: 'invitUserCt',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '成功邀请店主数量',
      dataIndex: 'invitStoreCt',
      hideInSearch: true,
      align: 'center'
    }
  ]

  return (
    <PageContainer title={false}>
      <div className={styles.timeSearch}>
        <Space size={20}>
          <h3>社区店销售排名</h3>
          <SelectDate
            setDateSelect={setDateSelect}
            dateSelect={dateSelect}
          />
        </Space>
      </div>
      <div className={styles.radioArea}>
        <Radio.Group 
          onChange={onChange}
          value={value}
          size="large"
        >
          <Radio value={1}>采购订单总量</Radio>
          <Radio value={2}>总收益排名</Radio>
        </Radio.Group>
        <BarChart data={data} />
      </div>
      <div className={styles.table}>
        <ProTable
          rowKey="storeName"
          search={{
            labelWidth: 120
          }}
          columns={columns}
          request={communityStoreData}
          params={{}}
          toolbar={{
            settings: false
          }}
          pagination={{
            showQuickJumper: true,
            pageSize: 10
          }}
        />
      </div>
    </PageContainer>
  )
}

export default CommunityStoreData