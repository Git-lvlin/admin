import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { history } from 'umi'

import { allowance } from '@/services/financial-management/subsidy-summary'
import { amountTransform } from '@/utils/utils'

const SubsidySummary = ()=> {

  const columns = [
    {
      title: 'id',
      dataIndex: 'accountId',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '所属商家',
      dataIndex: 'accountName',
      align: 'center'
    },
    {
      title: '订单数量',
      dataIndex: 'count',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '未结算补贴总金额',
      dataIndex: 'unSettle',
      align: 'center',
      hideInSearch: true,
      render: (_, records)=> (
        <a
          onClick={()=> {
            history.push(`/financial-management/subsidy-summary/detail/${records?.accountId}?status=unSettle`)}
          }
        >
            {`￥${amountTransform(_, '/')}`}
        </a>
      )
    },
    {
      title: '已结算补贴总金额',
      dataIndex: 'settled',
      align: 'center',
      hideInSearch: true,
      render: (_, records)=> (
        <a
        onClick={()=> {
          history.push(`/financial-management/subsidy-summary/detail/${records?.accountId}?status=settled`)}
        }
      >
          {`￥${amountTransform(_, '/')}`}
      </a>
      )
    }
  ]
  return (
    <PageContainer title={false}>
      <ProTable
        columns={columns}
        pagination={{
          pageSize: 10,
          hideOnSinglePage: true
        }}
        rowKey='accountId'
        toolBarRender={false}
        params={{}}
        request={allowance}
      />
    </PageContainer>
  )
}

export default SubsidySummary
