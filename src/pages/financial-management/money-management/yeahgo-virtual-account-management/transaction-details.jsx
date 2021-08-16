import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { useLocation } from "umi"

import { logPage } from '@/services/financial-management/yeahgo-virtual-account-management'
import { amountTransform } from '@/utils/utils'

const TransactionDetails = () => {
  const {query} = useLocation()
  const transactionType = () =>{
    if(query.accountId==='platform') {
      return {
        'goodsAmount': '货款入账',
        'goodsAmountReturn': '贷款回退',
        'platformCommission': '佣金收入',
        'platformCommissionReturn': '佣金回退',
        'commission': '提成入账',
        'commissionReturn': '提成回退',
        'suggestCommission': '推荐提成入账',
        'suggestCommissionReturn': '推荐提成回退'
      }
    }else if(query.accountId==='platformFee'){
      return {
        'fee': '代收交易费',
        'feeReturn': '交易费退回'
      }
    }else if(query.accountId==='platformXinbao'){
      return {
        'recharge': '充值',
        'giveOut': '划扣'
      }
    }
  }
  const orderType = () => {
    if(query.accountId==='platform') {
      return {
        'normalOrder': '普通商品订单',
        'second': '秒约订单',
        'single': '单约订单',
        'group': '团约订单',
        'commandSalesOrder': '指令集约店主订单',
        'activeSalesOrder': '主动集约店主订单',
        'dropShipping1688': '1688代发订单',
        'commandCollect': '指令集约C端订单',
        'activeCollect': '主动集约C端订单'
      }
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
      title: '交易类型',
      dataIndex:'tradeType',
      valueType: 'select',
      valueEnum: transactionType()
    },
    {
      title: '订单号',
      dataIndex:'billNo',
      hideInSearch: true,
      hideInTable: query.accountId==='platformFee' ? false : true,
    },
    {
      title: '订单类型',
      dataIndex:'orderType',
      valueType: 'select',
      valueEnum: orderType(),
      hideInSearch: query.accountId==='platform' ? false : true,
      hideInTable: query.accountId==='platform' ? false : true
    },
    {
      title: '资金流水号',
      dataIndex:'transactionId',
    },
    {
      title: '支付单号',
      dataIndex:'payNo',
      hideInSearch: query.accountId==='platformXinbao' ? true : false,
      hideInTable: query.accountId==='platformXinbao' ? true : false
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
      title: '入账金额',
      dataIndex: 'changeAmount',
      render: (_) => amountTransform(_, '/'),
      hideInSearch: true
    },
    {
      title: '账户余额',
      dataIndex: 'balanceAmount',
      render: (_) => amountTransform(_, '/'),
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

export default TransactionDetails
