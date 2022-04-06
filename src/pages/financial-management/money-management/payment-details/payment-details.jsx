import React from 'react'
import { PageContainer } from '@/components/PageContainer';
import ProTable from '@ant-design/pro-table'
import { useLocation, history } from "umi"

import { logPage } from '@/services/financial-management/yeahgo-virtual-account-management'
import { amountTransform } from '@/utils/utils'
import { tradeType } from '../../common-enum'

const PaymentDetails = () => {
  const {query} = useLocation()

  const skipToOrder = (id, type)=> {
    switch(type) {
      case 'commandSalesOrder':
        history.push(`/order-management/intensive-order/supplier-order-detail/${id}`)
      break
      default:
        return  history.push(`/order-management/normal-order-detail/${id}`)
    }
  }

  const columns = [
    {
      title: '序号',
      dataIndex:'id',
      hideInSearch: true,
      valueType: 'indexBorder'
    },
    {
      title: '虚拟子账户',
      dataIndex:'accountSn',
      hideInSearch: true,
    },
    {
      title: '交易类型',
      dataIndex:'tradeType',
      valueType: 'select',
      valueEnum: tradeType,
      hideInTable: true
    },
    {
      title: '交易类型',
      dataIndex:'tradeType',
      valueType: 'select',
      valueEnum: tradeType,
      hideInSearch: true
    },
    {
      title: '订单号',
      dataIndex:'billNo',
      render: (_, records)=> (
        records.orderId ? 
        <a onClick={()=>skipToOrder(records.orderId, records.orderType)}>{_}</a>:
        <span>{_}</span>
      )
    },
    {
      title: '平台单号',
      dataIndex:'payNo'
    },
    {
      title: '资金流水号',
      dataIndex: 'transactionId',
      hideInSearch: true
    },
    {
      title: '交易时间',
      dataIndex: 'createTime',
      hideInSearch: true
    },
    {
      title: '交易时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '分账金额',
      dataIndex: 'divideAmount',
      render: (_) => amountTransform(Number(_), '/'),
      hideInSearch: true
    },
    {
      title: '手续费',
      dataIndex: 'fee',
      render: (_) => amountTransform(Number(_), '/'),
      hideInSearch: true
    },
    {
      title: '其他扣款',
      dataIndex: 'deductAmount',
      render: (_) => amountTransform(Number(_), '/'),
      hideInSearch: true
    },
    {
      title: '交易金额',
      dataIndex: 'changeAmount',
      render: (_) => amountTransform(Number(_), '/'),
      hideInSearch: true
    },
    {
      title: '交易后余额',
      dataIndex: 'balanceAmount',
      render: (_) => amountTransform(Number(_), '/'),
      hideInSearch: true
    },
    {
      title: '交易描述',
      dataIndex: 'description',
      hideInSearch: true
    }
  ]
  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='id'
        toolBarRender={false}
        pagination={{
          hideOnSinglePage: true,
          pageSize: 10,
          showQuickJumper: true
        }}
        columns={columns}
        params={{...query}}
        request={logPage}
      />
    </PageContainer>
  )
}

export default PaymentDetails
