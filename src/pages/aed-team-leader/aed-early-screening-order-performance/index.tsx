import { useState, useRef } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from '@/components/pro-table'
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import TimeSelect from '@/components/time-select'

import { orderPm } from "@/services/aed-team-leader/aed-early-screening-order-performance"
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import moment from "moment"

export default function TransactionData () {
  const form = useRef<ActionType>()
  const [visit, setVisit] = useState<boolean>(false)

  const getFieldValue = (searchConfig: any) => {
    const { dateRange, ...rest }=searchConfig.form.getFieldsValue()
    return {
      startTime: dateRange[0]&& moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: dateRange[1]&& moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest,
    }
  }

  const tableColumns: ProColumns[] = [
    {
      title: '早筛码',
      dataIndex:'signCode',
    },
    {
      title: '子单号',
      dataIndex: 'subOrderSn',
      align: 'center',
    },
    {
      title: '总订单号',
      dataIndex: 'sumOrderId',
      align: 'center',
    },
    {
      title: '下单人手机号',
      dataIndex: 'memberPhone',
      align: 'center',
      fieldProps: {
        placeholder: '请输入下单人手机号'
      },
    },
    {
      title: '下单人用户ID',
      dataIndex: 'memberId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入下单人用户ID'
      },
    },
    {
      title: '交易分账时间',
      dataIndex: 'dateRange',
      renderFormItem: () => <TimeSelect />,
      hideInTable: true
    },
    {
      title: '订单支付时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '单品金额',
      dataIndex: 'payAmountDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '商品主图',
      dataIndex: 'goodsImg',
      align: 'center',
      hideInSearch: true,
      valueType: 'image'
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '收货人姓名',
      dataIndex: 'consignee',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '团长手机号',
      dataIndex: 'teamPhone',
      valueType: 'text',
    },
    {
      title: '子公司ID',
      dataIndex: 'subId',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '子公司名称',
      dataIndex: 'subName',
      align: 'center',
    },
    {
      title: '子公司类型',
      dataIndex: 'subTypeDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '状态',
      dataIndex: 'processDesc',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '结算状态',
      dataIndex: 'auditStatusDesc',
      align: 'center',
      hideInSearch: true
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey="orderSn"
        columns={tableColumns}
        request={orderPm}
        columnEmptyText={false}
        actionRef={form}
        options={false}
        search={{
          defaultCollapsed: true,
          labelWidth: 110,
          optionRender: (searchConfig: any, formProps: any, dom: any[]) => [
            ...dom.reverse(),
            <Export
            key='export'
            change={(e: boolean | ((prevState: boolean) => boolean)) => { setVisit(e) }}
            type={'scrOrderAdmPm'}
            conditions={()=>{return getFieldValue(searchConfig)}}
          />,
          <ExportHistory key='task' show={visit} setShow={setVisit} type={'scrOrderAdmPm'}/>
          ],
        }}
      />
    </PageContainer>
  )
}