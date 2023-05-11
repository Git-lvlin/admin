import { useState, useRef,useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"
import type { ProColumns,ActionType } from "@ant-design/pro-table"

import { AEDOrderPm } from "@/services/aed-team-leader/order-performance"

export default function TransactionData () {
  const form = useRef<ActionType>()


  const tableColumns: ProColumns[] = [
    {
      title: '序号',
      dataIndex:'id',
      hideInSearch: true,
      valueType: 'indexBorder'
    },
    {
      title: '1、分账条件',
      dataIndex: 'agencyId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '2、解冻条件（技术可开关）',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '3、结算申请条件',
      dataIndex: 'dateRange',
    },
    {
      title: '4、汇款条件',
      dataIndex: 'totalPayAmount',
      align: 'center',
    },
    {
      title: '5、结款条件',
      dataIndex: 'totalCommission',
      align: 'center',
    }
  ]
  return (
    <PageContainer title={false}>
      <ProTable
        rowKey="businessDeptId"
        headerTitle='AED子公司的4300课程培训服务套餐交易业绩结算规则配置'
        columns={tableColumns}
        request={AEDOrderPm}
        columnEmptyText={false}
        actionRef={form}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        options={false}
        search={false}
      />
    </PageContainer>
  )
}
