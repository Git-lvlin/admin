import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { history } from 'umi'

import { amountTransform } from '@/utils/utils'
import { commissionPage } from '@/services/financial-management/transaction-detail-management'

// bonus detail
const BonusDetailManagement = () =>{
  const skipToDetail = data => {
    history.push(`/financial-management/transaction-detail-management/royalty-details/${data}?type=bonus`)
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
      title: '受益方类型',
      dataIndex: 'accountType',
      valueType: 'select',
      valueEnum: {
        'store': '社区店',
        'supplier': '商家',
        'platform': '平台',
        'agentStore': '内部店',
        'agentCompany': '经销商'
      }
    },
    {
      title: '受益方ID',
      dataIndex: 'accountId'
    },
    {
      title: '受益方手机',
      dataIndex: 'accountMobile'
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      valueType: 'select',
      valueEnum: {
        'normalOrder': '普通商品订单',
        'second': '秒约订单',
        'commandSalesOrder': '集约批发订单',
        'activeSalesOrder': '主动集约店主订单',
        'dropShipping1688': '1688代发订单',
        'commandCollect': '集约销售订单',
        'activeCollect': '主动集约C端订单'
      },
      hideInSearch: true
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      valueType: 'select',
      valueEnum: {
        'commandSalesOrder': '集约批发订单',
        'dropShipping1688': '1688代发订单',
      },
      hideInTable: true
    },
    {
      title: '订单号',
      dataIndex: 'orderNo'
    },
    {
      title: '平台单号',
      dataIndex: 'payNo'
    },
    {
      title: '资金流水号',
      dataIndex: 'transactionId'
    },
    {
      title: '金额',
      dataIndex: 'amount',
      render: (_)=> amountTransform(_, '/'),
      hideInSearch: true
    },
    {
      title: '手续费',
      dataIndex: 'fee',
      render: (_)=> amountTransform(_, '/'),
      hideInSearch: true
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '操作',
      dataIndex: 'optoion',
      valueType: 'option',
      render: (_, records)=> <a onClick={()=>{skipToDetail(records?.orderNo)}}>详情</a>
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
        params={{}}
        request={commissionPage}
      />
    </PageContainer>
  )
}

export default BonusDetailManagement
