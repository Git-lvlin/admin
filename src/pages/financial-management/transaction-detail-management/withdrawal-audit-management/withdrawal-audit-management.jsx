import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'

import { amountTransform } from '@/utils/utils'
import { withdrawPage } from '@/services/financial-management/transaction-detail-management'

const WithdrawalAuditManagement = () =>{

  const columns = [
    {
      title: '序号',
      dataIndex: 'serial',
      hideInSearch: true,
      valueType: 'indexBorder'
    },
    {
      title: '会员ID',
      dataIndex: 'accountId',
    },
    {
      title: '注册手机号',
      dataIndex: 'registMobile',
    },
    {
      title: '用户类型',
      dataIndex: 'accountType',
      valueType: 'select',
      valueEnum: {
        'store': '店铺',
        'supplier': '供应商',
        'platform': '平台',
        'member': '会员',
        'agentStore': '代发店'
      }
    },
    {
      title: '提现类型',
      dataIndex: 'bankAcctType',
      valueType: 'select',
      valueEnum: {
        'business': '对公',
        'person': '对私'
      }
    },
    {
      title: '提现账户名',
      dataIndex: 'withdrawAccountName',
    },
    {
      title: '提现银行账户',
      dataIndex: 'withdrawAccount',
    },
    {
      title: '账户所属行',
      dataIndex: 'bankName',
      hideInSearch: true
    },
    {
      title: '资金流水号',
      dataIndex: 'voucher'
    },
    {
      title: '平台提现单号',
      dataIndex: 'sn',
    },
    {
      title: '提现时间',
      dataIndex: 'createTime',
      hideInSearch: true
      // valueType: 'dateTimeRange'
    },
    {
      title: '提现金额',
      dataIndex: 'amount',
      render: (_)=> amountTransform(_, '/'),
      hideInSearch: true
    },
    {
      title: '提现状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        'auditing': '待审核',
        'waitPay': '待打款',
        'paid': '已打款'
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, records) => (
        <a>详情</a>
      )
    }
  ]
  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='sn'
        columns={columns}
        toolBarRender={false}
        pagination={{
          pageSize: 10,
          hideOnSinglePage: true,
          showQuickJumper: true
        }}
        params={{}}
        request={withdrawPage}
      />
    </PageContainer>
  )
}

export default WithdrawalAuditManagement
