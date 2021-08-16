import React, { useState, useEffect } from 'react'
import ProTable from '@ant-design/pro-table'
import { Spin } from 'antd'

import { findMoreYueGmv } from '@/services/data-board/data-board'
import { amountTransform } from '@/utils/utils'

const columns = [
  {
    title: '日期',
    dataIndex: 'orderDate',
    align: 'center'
  },
  {
    title: 'GMV（￥/元）',
    dataIndex: 'dayGmv',
    align: 'center',
    render: (_)=> amountTransform(_, '/')
  },
  {
    title: 'GMV订单数',
    dataIndex: 'gmvOrderCount',
    align: 'center',
    render: (_)=> <a>{_}</a>
  },
  {
    title: '销售额（￥/元）',
    dataIndex: 'daySale',
    align: 'center',
    render: (_)=> amountTransform(_, '/')
  },
  {
    title: '支付订单数',
    dataIndex: 'payCount',
    align: 'center',
    render: (_)=> <a>{_}</a>
  },
  {
    title: '支付用户数',
    dataIndex: 'payUserCount',
    align: 'center'
  },
]

const TableList = (props)=>  {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const {
    startTime,
    endTime,
    type,
    form,
    search
  } = props
  useEffect(()=>{
    setLoading(true)
    findMoreYueGmv({
      startTime,
      endTime,
      type
    }).then(res=> {
      if(res.success) {
        setData(res.data)
      } else {
        setData([])
      }
    }).finally(()=> {
      setLoading(false)
    })
  }, [startTime, endTime, type, form, search])
  return (
    <Spin spinning={loading}>
      <ProTable 
        rowKey="orderDate"
        search={false}
        dataSource={data}
        toolbar={false}
        toolBarRender={false}
        columns={columns}
        pagination={false}
      />
    </Spin>
  )
}

export default TableList
