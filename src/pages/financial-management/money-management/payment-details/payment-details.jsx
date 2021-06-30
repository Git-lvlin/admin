import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { useLocation } from "umi"

import { logPage } from '@/services/financial-management/yeahgo-virtual-account-management'
import { amountTransform } from '@/utils/utils'

const PaymentDetails = () => {
  const {query} = useLocation()
  const columns = [
    {
      title: '序号',
      dataIndex:'id',
      hideInSearch: true,
      valueType: 'indexBorder'
    },
    {
      title: '会员ID',
      dataIndex:'memberId'
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
      valueEnum: {
        'goodsAmount': '货款入账',
        'goodsAmountReturn': '货款回退',
        'commission': '提成入账',
        'commissionReturn': '提成回退',
        'platformCommission': '佣金收入',
        'platformCommissionReturn': '佣金回退',
        'fee': '代收交易费',
        'feeReturn': '交易费回退',
        'recharge': '充值',
        'giveOut': '划扣',
        'withdraw': '提现',
        'refundRecharge': '售后款入账',
        'debt': '欠款入账',
        'debtReturn': '欠款偿还',
        'unfreeze': '解冻',
        'freeze': '冻结'
      }
    },
    {
      title: '订单号',
      dataIndex:'billNo',
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
      valueType: 'dateRange',
      hideInSearch: true
    },
    {
      title: '交易时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '交易金额',
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

export default PaymentDetails
