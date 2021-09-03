import React, { useState, useRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { useLocation } from "umi"
import { Button } from 'antd'

import { logPage } from '@/services/financial-management/yeahgo-virtual-account-management'
import { amountTransform } from '@/utils/utils'
import { Export,ExportHistory } from '@/pages/export-excel'

const TransactionDetails = () => {
  const {query} = useLocation()
  const [visit, setVisit] = useState(false)
  const actionform = useRef()

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
        'suggestCommissionReturn': '推荐提成回退',
        'deposit': '保证金入账',
        'depositReturn': '保证金回退',
        'agentCompanyCommission': '经销商佣金收入',
        'agentCompanyCommissionReturn': '经销商佣金回退',
        'withdraw': '提现'
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
        'second': '秒约订单',
        'commandSalesOrder': '集约采购订单',
        'dropShipping1688': '1688代发订单',
        'commandCollect': '集约C端订单'
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
      title: '交易金额',
      dataIndex: 'changeAmount',
      render: (_) => amountTransform(_, '/'),
      hideInSearch: true
    },
    {
      title: '交易后余额',
      dataIndex: 'balanceAmount',
      render: (_) => amountTransform(_, '/'),
      hideInSearch: true
    },
    {
      title: '交易描述',
      dataIndex: 'description',
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
        actionRef={actionform}
        search={{
          optionRender: ({searchText, resetText}, {form}) => [
            <Button
              key="search"
              type="primary"
              onClick={() => {
                form?.submit()
              }}
            >
              {searchText}
            </Button>,
            <Button
              key="rest"
              onClick={() => {
                form?.resetFields()
                form?.submit()
              }}
            >
              {resetText}
            </Button>,
            query.accountId==='platform'&&
            <Export
              change={(e)=> {setVisit(e)}}
              key="export" 
              type="financial-account-log-page-export"
              conditions={
                {
                  accountId: 'platform',
                  accountType: 'platform',
                  ...form?.getFieldValue()
                }
              }
            />,
            query.accountId==='platform'&&
            <ExportHistory
              key="exportHistory"
              show={visit}
              setShow={setVisit}
              type="financial-account-log-page-export"
            />
          ],
        }}
      />
    </PageContainer>
  )
}

export default TransactionDetails
