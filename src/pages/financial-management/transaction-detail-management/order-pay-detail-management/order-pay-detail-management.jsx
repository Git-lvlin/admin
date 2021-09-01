import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { history } from 'umi'

import { amountTransform } from '@/utils/utils'
import { orderPage } from '@/services/financial-management/transaction-detail-management'

// Order payment detail
const OrderPayDetailManagement = () =>{
  const skipToDetail = data=> {
    history.push(`/financial-management/transaction-detail-management/order-pay-detail-management/detail/${data}`)
  }
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
        'ALI_PAY': '支付宝支付',
        'WX_PAY': '微信支付',
        'MINI_PRO_PAY': '微信小程序支付',
        'UNION_PAY': '银联支付',
        'YEAH_CARD_PAY': '约卡支付',
        'alipay': '汇付天下支付宝支付',
        'wx_lite': '汇付天下微信小程序支付',
        'union': '汇付天下银联支付',
        'fast_pay': '快捷支付',
        'alipay_qr': '支付宝正扫'
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
      valueEnum: {
        'normalOrder': '普通订单',
        'second': '秒约订单',
        'commandSalesOrder': '集约批发订单',
        'dropShipping1688': '1688代发订单',
        'commandCollect': '集约销售订单'
      }
    },
    {
      title: '订单号',
      dataIndex: 'orderNo',
      
    },
    {
      title: '支付单号',
      dataIndex: 'payNo',
      
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
      render: (_, records)=> <a onClick={()=>{skipToDetail(records?.orderNo)}}>详情</a>
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
    </PageContainer>
  )
}

export default OrderPayDetailManagement
