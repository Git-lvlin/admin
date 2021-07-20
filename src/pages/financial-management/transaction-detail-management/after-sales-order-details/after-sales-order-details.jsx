import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { history } from 'umi'

import { amountTransform } from '@/utils/utils'
import { refundPage } from '@/services/financial-management/transaction-detail-management'

// after sales order detail
const AfterSalesOrderDetails = () =>{

  const skipToDetails = data => {
    history.push(`/financial-management/transaction-detail-management/after-sales-order-details/detail/${data}`)
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
      title: '卖家ID',
      dataIndex: 'accountId'
    },
    {
      title: '卖家手机',
      dataIndex: 'accountMobile'
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
      dataIndex: 'tradeType',
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
      },
      hideInSearch: true
    },
    {
      title: '交易类型',
      dataIndex: 'tradeType',
      valueType: 'select',
      valueEnum: {
        'goodsAmountReturn': '货款回退',
        'platformCommissionReturn': '佣金回退',
        'commissionReturn': '提成回退',
        'feeReturn': '交易费回退'
      },
      hideInTable: true
    },
    {
      title: '买家会员ID',
      dataIndex: 'buyerId',
      
    },
    {
      title: '买家手机',
      dataIndex: 'buyerMobile'
    },
    {
      title: '售后订单号',
      dataIndex: 'refundNo',
      
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      valueType: 'select',
      valueEnum: {
        'normalOrder': '普通商品订单',
        'second': '秒约订单',
        'single': '单约订单',
        'group': '团约订单',
        'commandSalesOrder': '指令集约店主订单',
        'activeSalesOrder': '主动集约店主订单',
        'dropShipping1688': '1688代发订单',
        'commandCollect': '指令集约C端订单',
        'activeCollect': '主动集约C端订单'
      },
      hideInSearch: true
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      valueType: 'select',
      valueEnum: {
        'commandSalesOrder': '指令集约店主订单',
        'dropShipping1688': '1688代发订单',
        'second': '秒约订单',
        'single': '单约订单',
        'group': '团约订单',
      },
      hideInTable: true
    },
    {
      title: '关联订单号',
      dataIndex: 'orderNo',
      
    },
    {
      title: '平台支付单号',
      dataIndex: 'payNo',
      
    },
    {
      title: '资金流水号',
      dataIndex: 'transactionId',
      
    },
    {
      title: '支付金额',
      dataIndex: 'amount',
      render: (_)=> Math.abs(amountTransform(_, '/')),
      hideInSearch: true
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      
    },
    {
      title: '操作',
      dataIndex: 'optoion',
      valueType: 'option',
      fixed: 'right',
      render: (_, records)=> <a onClick={()=>{skipToDetails(records?.id)}}>详情</a>
    }
  ]
  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='id'
        scroll={{x: 2200}}
        columns={columns}
        toolBarRender={false}
        pagination={{
          pageSize:10,
          hideOnSinglePage: true,
          showQuickJumper: true
        }}
        params={{}}
        request={refundPage}
      />
    </PageContainer>
  )
}

export default AfterSalesOrderDetails
