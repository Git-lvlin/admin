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
      title: '卡号',
      dataIndex: 'cardName',
      align: 'center',
      order:4
    },
    {
      title: '所属账户',
      dataIndex: 'ty',
      align: 'center',
      order:3
    },
    {
      title: '卡名称',
      dataIndex: 'cardName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '卡类型',
      dataIndex: 'type',
      align: 'center',
      valueEnum:{
        1: '标准卡',
        2: '平台赠卡',
      },
      hideInSearch: true
    },
    {
      title: '获得方式',
      dataIndex: 'type',
      align: 'center',
      valueEnum:{
        1: '支付购买',
        2: '他人赠送',
        3: '平台赠送'
      },
      hideInTable: true,
      order:1
    },
    {
      title: '获得方式',
      dataIndex: 'type',
      align: 'center',
      valueEnum:{
        1: '支付购买',
        2: '他人赠送',
        3: '平台赠送'
      },
      hideInSearch: true,
    },
    {
      title: '获得时间',
      dataIndex: 'totalMonth',
      align: 'center',
      hideInSearch: true
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
      title: '卡总次数（次）',
      dataIndex: 'totalAmount',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '剩余次数（次）',
      dataIndex: 'totalAmount',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '卡状态',
      dataIndex: 'type',
      align: 'center',
      valueEnum:{
        1: '正常',
        2: '已过期',
        3: '已用完'
      },
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
