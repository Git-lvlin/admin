import { useState, useRef } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"

import type { ProColumns } from "@ant-design/pro-table"
import type { FormInstance } from "@ant-design/pro-form"
import type { TableProps } from "./data"

import { platformCardList } from "@/services/hydrogen-atom-trusteeship/health-card-management"

export default function TransactionData () {
  const ref = useRef<FormInstance>()

  const columns: ProColumns<TableProps>[] = [
    {
      title: '交易卡号',
      dataIndex: 'cardName',
      align: 'center',
      order:3
    },
    {
      title: '交易订单号',
      dataIndex: 'totalNum',
      align: 'center',
      order:2
    },
    {
      title: '交易时间',
      dataIndex: 'amount',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '交易类型',
      dataIndex: 'type',
      align: 'center',
      valueEnum:{
        1: '赠送',
        2: '消费',
      },
      hideInTable: true,
      order:1
    },
    {
      title: '交易类型',
      dataIndex: 'type',
      align: 'center',
      valueEnum:{
        1: '赠送',
        2: '消费',
      },
      hideInSearch: true,
    },
    {
      title: '交易对象',
      dataIndex: 'ty',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '交易次数',
      dataIndex: 'totalAmount',
      align: 'center',
      hideInSearch: true
    },
  ]

  return (
    <PageContainer title={false}>
      <ProTable<TableProps>
        rowKey="id"
        headerTitle='列表'
        columns={columns}
        request={platformCardList}
        columnEmptyText={false}
        actionRef={ref}
        pagination={{
          pageSize: 10
        }}
        options={false}
      />
    </PageContainer>
  )
}
