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
      title: '退方ID',
      dataIndex: 'accountId'
    },
    {
      title: '退方手机',
      dataIndex: 'accountMobile'
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
      dataIndex: 'tradeType',
      valueType: 'select',
      valueEnum: {
        'goodsAmountReturn': '货款回退',
        'platformCommissionReturn': '平台收益回退',
        'commissionReturn': '店铺收益回退',
        'suggestCommissionReturn': '店铺推荐收益回退',
        'feeReturn': '交易通道费回退',
        'agentCompanyCommissionReturn': '运营中心收益回退'
      }
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
        'second': '秒约订单',
        'dropShipping1688': '1688代发订单',
        'commandSalesOrder': '集约批发订单',
        'commandCollect': '集约销售订单',
        'blindBox': '盲盒订单',
        'signIn': '签到订单'
      }
    },
    {
      title: '关联订单号',
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
      render: (_)=> `￥${Math.abs(amountTransform(_, '/'))}`,
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
