import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { Button } from 'antd'
import { history, useLocation } from 'umi'

import { amountTransform } from '@/utils/utils'
import { logPage } from '@/services/financial-management/yeahgo-virtual-account-management'

const WithdrawalBalanceDetails = () =>{
  const {query} = useLocation()
  const columns = [
    {
      title: '序号',
      dataIndex: 'serial',
      valueType: 'indexBorder'
    },
    {
      title: 'id',
      dataIndex: 'id',
      hideInTable: true
    },
    {
      title: '虚拟子账户',
      dataIndex: 'accountSn',
    },
    {
      title: '交易类型',
      dataIndex: 'tradeType',
      valueType: 'select',
      valueEnum: {
        'goodsAmount': '货款入账',
        'goodsAmountReturn': '货款回退',
        'commission': '店主收益入账',
        'commissionReturn': '店主收益回退',
        'platformCommission': '平台收益入账',
        'platformCommissionReturn': '平台收益回退',
        'fee': '交易通道费',
        'feeReturn': '交易通道费回退',
        'recharge': '充值',
        'giveOut': '划扣',
        'withdraw': '提现',
        'refundRecharge': '售后款入账',
        'debt': '欠款入账',
        'debtReturn': '欠款偿还',
        'unfreeze': '解冻',
        'freeze': '冻结',
        'suggestCommission': '推荐店主收益入账',
        'suggestCommissionReturn': '推荐店主收益回退',
        'agentCompanyCommission': '经销商收益入账',
        'agentCompanyCommissionReturn': '经销商收益回退',
        'freight': '运费',
        'freightReturn': '运费回退',
        'yeahCardRecharge': '约卡充值'
      }
    },
    {
      title: '订单号',
      dataIndex: 'billNo'
    },
    {
      title: '平台单号',
      dataIndex: 'payNo',
    },
    {
      title: '资金流水号',
      dataIndex: 'transactionId',
    },
    {
      title: '交易时间',
      dataIndex: 'createTime'
    },
    {
      title: '交易金额',
      dataIndex: 'changeAmount',
      render: (_) => amountTransform(_, '/'),
    },
    {
      title: '账户余额',
      dataIndex: 'balanceAmount',
      render: (_) => amountTransform(_, '/')
    }
  ]
  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='id'
        columns={columns}
        toolBarRender={false}
        pagination={{
          pageSize: 10,
          hideOnSinglePage: true,
          showQuickJumper: true
        }}
        search={false}
        params={{...query}}
        request={logPage}
      />
      <div
        style={{
          background: 'rgb(255, 255, 255)'
        }}
      >
        <Button
          style={{
            margin: 20
          }}
          type='primary'
          onClick={
            ()=> {
              history.goBack()
            }
          }
        >
          返回
        </Button>
      </div>
    </PageContainer>
  )
}

export default WithdrawalBalanceDetails
