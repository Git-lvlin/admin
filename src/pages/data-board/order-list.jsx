import React, { useState, useEffect } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { history, useLocation, useParams } from 'umi'
import { Button, Spin } from 'antd'
import moment from 'moment'

import {
  getOrderPage,
  findAdminOrderList
} from '@/services/data-board/ranking'
import { amountTransform } from '@/utils/utils'

const orderList = () => {
  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(false) 
  const {id} = useParams()
  const { query } = useLocation()
  const endTime = moment(+new Date()).format('YYYY-MM-DD')
  const startTime = () => {
    return moment().subtract(30, 'days').calendar().replaceAll('/', '-')
  }

  const skipToOrderDetail = (e) => {
    history.push(`/order-management/normal-order-detail/${e.id}`)
  }

  useEffect(()=> {
    setLoading(true)
    if(query.type === 'normal'){
      findAdminOrderList({
        // storeId: id,
        startCreateTime: startTime(),
        endCreateTime: endTime,
        size: 100
      }).then(res=> {
        if(res.success) {
          setOrderData(res.data)
        } else {
          setOrderData([])
        }
      }).finally(()=> {
        setLoading(false)
      })
    } else if(query.type === 'intensive') {
      getOrderPage({
        // storeId: id,
        beginTime: startTime(),
        endTime: endTime,
        size: 100
      }).then(res=> {
        if(res.success) {
          setOrderData(res.data)
        } else {
          setOrderData([])
        }
      }).finally(()=> {
        setLoading(false)
      })
    } else {
      setOrderData([])
    }
    return ()=> {
      setOrderData([])
    }
  }, [])
  const columns = [
    {
      title: '序号',
      dataIndex: 'serialNum',
      valueType: 'indexBorder'
    },
    {
      title: '订单号',
      dataIndex: 'orderSn',
      align: 'center'
    },
    {
      title: '订单金额（￥/元）',
      dataIndex: 'totalAmount',
      align: 'center',
      render: (_) => amountTransform(_, '/')
    },
    {
      title: '订单详情',
      dataIndex: 'option',
      align: 'center',
      render: (_, records)=> <a onClick={()=>skipToOrderDetail(records)}>查看</a>
    },
  ]

  return (
    <PageContainer title={false}>
      <Spin spinning={loading}>
        <ProTable
          rowKey='orderSn'
          columns={columns}
          search={false}
          toolBarRender={false}
          toolbar={false}
          dataSource={orderData}
          pagination={false}
        />
      </Spin>
      <Button
        type='primary'
        onClick={
          ()=>{ history.goBack()}
        }
      >
        返回
      </Button>
    </PageContainer>
  )
}

export default orderList
