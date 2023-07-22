import { useState, useRef } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from '@/components/pro-table'
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import TimeSelect from '@/components/time-select'
import AddressCascader from '@/components/address-cascader';

import { orderGoodsPm } from "@/services/product-performance-management/early-screening-order-performance"
import moment from 'moment';
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'

export default function TransactionData () {
  const form = useRef<ActionType>()
  const [visit, setVisit] = useState<boolean>(false)

  const getFieldValue = (searchConfig: any) => {
    const { dateRange, area = [], ...rest}=searchConfig.form.getFieldsValue()
    return {
      startTime: dateRange && moment(dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: dateRange && moment(dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      provinceId: area[0]?.value,
      cityId: area[1]?.value,
      areaId: area[2]?.value,
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
      title: '订单时间',
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
      title: '金额',
      dataIndex: 'payAmountDesc',
      align: 'center',
      hideInSearch: true,
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
      hideInSearch: true,
    },
    {
      title: '子公司地址',
      dataIndex: 'subAddress',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '直推人手机号',
      dataIndex: 'recomMemberPhone',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '体检市区域',
      dataIndex: 'cityAgentName',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '体检省区域',
      dataIndex: 'provinceAgentName',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'process',
      align: 'center',
      hideInTable: true,
      valueType: 'select',
      valueEnum:  {
        0 :'待报名',
        1 :'待采样',
        5 :'检测中', 
        10 :'已完成',
        14 :'退款中',
        15 :'退款成功',
        20 :'已失效', 
      }
    },
    {
      title: '状态',
      dataIndex: 'processDesc',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '体检省市区',
      dataIndex: 'area',
      hideInTable: true,
      renderFormItem: () => (<AddressCascader changeOnSelect />)
    },
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey="id"
        columns={tableColumns}
        request={orderGoodsPm}
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
            type={'scrOrderGoodsPm'}
            conditions={()=>{return getFieldValue(searchConfig)}}
          />,
          <ExportHistory key='task' show={visit} setShow={setVisit} type={'scrOrderGoodsPm'}/>
          ],
        }}
      />
    </PageContainer>
  )
}