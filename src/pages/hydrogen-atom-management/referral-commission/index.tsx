import { useState, useRef } from 'react'
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"

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

  const  form = useRef<FormInstance>()

  const columns: ProColumns<PropsTable>[] = [
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
      title: '总提成金额(元)',
      dataIndex: 'totalAccount',
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
      title: '机器ID',
      dataIndex: 'imei',
      hideInTable: true
    },
    {
      title: '被推荐人手机',
      dataIndex: 'buyMobile',
      hideInTable: true
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
        rowKey='pMobile'
        columns={columns}
        request={queryStatisticsCommissionList}
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
