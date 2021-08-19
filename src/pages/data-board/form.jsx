import React, { useState, useEffect } from 'react'
import ProTable from '@ant-design/pro-table'
import { Spin } from 'antd'
import { history } from 'umi'
import moment from 'moment'

import { findSumMoreYue } from '@/services/data-board/data-board'
import { amountTransform } from '@/utils/utils'

const skipToGMVDetail = (e, isGMV) => {
  const time = moment(e.orderDate).valueOf()
  history.push(`/data-board/GMVDetail?date=${time}&isGMV=${isGMV}`)
}

const columns = [
  {
    title: '日期',
    dataIndex: 'orderDate',
    align: 'center'
  },
  {
    title: 'GMV（￥/元）',
    dataIndex: 'sumDayGmv',
    align: 'center',
    render: (_, records)=> <a onClick={()=>skipToGMVDetail(records, 'gmv')}>{amountTransform(_, '/')}</a>
  },
  {
    title: 'GMV订单数',
    dataIndex: 'sumGmvOrderCount',
    align: 'center'
  },
  {
    title: '销售额（￥/元）',
    dataIndex: 'sumDaySale',
    align: 'center',
    render: (_, records)=> <a onClick={()=>skipToGMVDetail(records, 'sale')}>{amountTransform(_, '/')}</a>
  },
  {
    title: '支付订单数',
    dataIndex: 'sumPayCount',
    align: 'center'
  },
  {
    title: '支付用户数',
    dataIndex: 'sumPayUserCount',
    align: 'center'
  },
]

const TableList = (props)=>  {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const {
    startTime,
    endTime,
    form,
    search
  } = props
  useEffect(()=>{
    setLoading(true)
    findSumMoreYue({
      startTime,
      endTime
    }).then(res=> {
      if(res.success) {
        setData(res.data)
      } else {
        setData([])
      }
    }).finally(()=> {
      setLoading(false)
    })
  }, [startTime, endTime, form, search])
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
