import React, { useState, useEffect } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
// import { history } from 'umi'

import { amountTransform } from '@/utils/utils'
import { orderPage } from '@/services/financial-management/transaction-detail-management'
import Detail from './order-pay-detail-popup'
import { orderTypes } from '@/services/financial-management/common'

// Order payment detail
const OrderPayDetailManagement = () =>{
  const [detailVisible, setDetailVisible] = useState(false)
  const [selectItem, setSelectItem] = useState({})
  const [orderType, setOrderType] = useState(null)

  useEffect(() => {
    orderTypes({}).then(res => {
      setOrderType(res.data)
    })
    return () => {
      setOrderType(null)
    }
  }, [])

  // const skipToDetail = data=> {
  //   history.push(`/financial-management/transaction-detail-management/order-pay-detail-management/detail/${data}`)
  // }
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '序号',
      dataIndex: 'serial',
      valueType: 'indexBorder'
    },
    {
      title: '支方会员ID',
      dataIndex: 'buyerSn',
      
    },
    {
      title: '支付渠道',
      dataIndex: 'payType',
      valueType: 'select',
      valueEnum: {
        'MONI_PAY': '模拟支付',
        'alipay': '汇付天下支付宝支付',
        'wx_lite': '汇付天下微信小程序支付'
      }
    },
    {
      title: '交易类型',
      dataIndex: 'salesOrderType',  
      valueEnum: {
        'deposit': '定金',
        'balance': '尾款',
        'full': '全款'
      }
    },
    {
      title: '收方会员ID',
      dataIndex: 'sellerSn',
      
    },
    {
      title: '收方手机',
      dataIndex: 'sellerMobile',
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      valueEnum: orderType
    },
    {
      title: '订单号',
      dataIndex: 'orderNo',
      
    },
    {
      title: '平台单号',
      dataIndex: 'payNo',
      render: (_, records) => (
        records?.orderNo?
        <a onClick={() => { setSelectItem(records.orderNo); setDetailVisible(true); }}>{_}</a>:
        <span>{_}</span>
      )
    },
    {
      title: '资金流水号',
      dataIndex: 'transactionId',
      
    },
    {
      title: '支付金额',
      dataIndex: 'amount',
      render: (_)=> amountTransform(_, '/'),
      hideInSearch: true
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: 80,
      valueType: 'option',
      fixed: 'right',
      render: (_, records)=> <a target='_blank' href={`/financial-management/transaction-detail-management/order-pay-detail-management/detail/${records?.orderNo}`}>详情</a>
    }

  ]
  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='id'
        columns={columns}
        toolBarRender={false}
        scroll={{ x: 2100 }}
        pagination={{
          pageSize: 10,
          hideOnSinglePage: true,
          showQuickJumper: true
        }}
        params={{}}
        request={orderPage}
      />
      {
        detailVisible &&
        <Detail
          id={selectItem}
          visible={detailVisible}
          setVisible={setDetailVisible}
        />
      }
    </PageContainer>
  )
}

export default OrderPayDetailManagement
