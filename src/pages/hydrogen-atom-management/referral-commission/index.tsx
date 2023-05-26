import { useState, useRef } from 'react'
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from '@/components/pro-table'
import { Input, InputNumber } from "antd"

import type { ProColumns } from "@ant-design/pro-table"
import type { PropsTable } from "./data"
import type { FormInstance } from "@ant-design/pro-form"

import { queryStatisticsCommissionList } from "@/services/hydrogen-atom-management/referral-commission"
import { amountTransform } from '@/utils/utils'
import Export from "@/components/export"
import Detail from "./detail"

function ReferralCommission () {
  const [detailVisible, setDetailVisible] = useState<boolean>(false)
  const [data, setData] = useState<PropsTable>()
  const [lowLimitAmount, setLowLimitAmount] = useState<number>()
  const [highLimitAmount, setHighLimitAmount] = useState<number>()
  const [lowNum, setLowNum] = useState<number>()
  const [highNum, setHighNum] = useState<number>()

  const  form = useRef<FormInstance>()

  const columns: ProColumns<PropsTable>[] = [
    {
      title: 'pMemId',
      dataIndex: 'pMemId',
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: '邀请人社区店ID',
      dataIndex: 'storeId',
      hideInTable: true
    },
    {
      title: '推荐用户提成数',
      dataIndex: 'totalUser',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '推荐人手机',
      dataIndex: 'pMobile',
      align: 'center'
    },
    {
      title: '推荐人用户ID',
      dataIndex: 'pMemId',
      align: 'center',
    },
    {
      title: '总提成金额(元)',
      dataIndex: 'totalAccount',
      align: 'center',
      hideInSearch: true,
      render: (_) => amountTransform(_, '/')
    },
    {
      title: '总业绩金额(元)',
      dataIndex: 'orderAmountTotal',
      align: 'center',
      hideInSearch: true,
      render: (_) => amountTransform(_, '/')
    },
    {
      title: '总产品数',
      dataIndex: 'totalDriverCount',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '最近交易时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '店铺名称',
      dataIndex: 'storeName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '社区店ID',
      dataIndex: 'pStoreId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '提货点地区',
      dataIndex: 'address',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '社区店状态',
      dataIndex: 'storeStatus',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '提成金额',
      dataIndex: 'limitAmount',
      hideInTable: true,
      renderFormItem: ()=> (
        <Input.Group compact>
          <InputNumber  
            style={{ 
              width: 100,
              textAlign: 'center',
              borderRight: 0
            }}
            min={0}
            onChange={(v: number)=> setLowLimitAmount(v)}
            placeholder="最低金额" 
          />
          <Input
            style={{
              width: 30,
              borderLeft: 0,
              borderRight: 0,
              pointerEvents: 'none',
              background: 'transparent'
            }}
            placeholder="~"
            disabled
          />
          <InputNumber 
            style={{
              width: 100,
              textAlign: 'center',
              borderLeft: 0
            }}
            min={0}
            onChange={(v: number)=> setHighLimitAmount(v)}
            placeholder="最高金额"
          />
        </Input.Group>
      )
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r) => (
        <a onClick={()=> {setDetailVisible(true); setData(r)}}>查看明细</a>
      )
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable<PropsTable>
        rowKey='pMemId'
        columns={columns}
        params={{
          lowLimitAmount: lowNum && amountTransform(lowNum, '*'),
          highLimitAmount: highNum && amountTransform(highNum, '*')
        }}
        onSubmit={()=> { setLowNum(lowLimitAmount); setHighNum(highLimitAmount) }}
        request={queryStatisticsCommissionList}
        onReset={()=> {
          setLowNum(undefined)
          setHighNum(undefined)
          setLowLimitAmount(undefined)
          setHighLimitAmount(undefined)
        }}
        options={false}
        formRef={form}
        pagination={{
          pageSize: 10,
          showQuickJumper: true
        }}
        search={{
          labelWidth: 'auto',
          optionRender: (searchConfig, props, dom)=> [
            ...dom.reverse(),
            <Export
              type='queryStatisticsCommissionListExport'
              conditions={{...form.current?.getFieldsValue()}}
              key='export'
            />
          ]
        }}
      />
      {
        detailVisible&&
        <Detail
          visible={detailVisible}
          setVisible={setDetailVisible}
          data={data}
        />
      }
    </PageContainer>
  )
}

export default ReferralCommission
