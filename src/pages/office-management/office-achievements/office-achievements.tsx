import { useState, useRef } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProDescriptions from "@ant-design/pro-descriptions"
import ProTable from "@ant-design/pro-table"
import { Image } from "antd"

import type { ProColumns } from "@ant-design/pro-table"
import type { ProDescriptionsItemProps } from "@ant-design/pro-descriptions"
import type { FormInstance } from "@ant-design/pro-form"
import type { DescriptionsProps, TableProps } from "./data"

import { findPage,businessDeptSum } from "@/services/office-management/office-achievements"
import { getPageQuery } from "@/utils/utils"
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import { amountTransform } from '@/utils/utils'

export default function TransactionData () {
  const [devicesVisible, setDevicesVisible] = useState<boolean>(false)
  const [type, setType] = useState<number>(0)
  const [memberId, setMemberId] = useState<string>()
  const [memberPhone, setMemberPhone] = useState<string>()
  const [visit, setVisit] = useState<boolean>(false)
  const form = useRef<FormInstance>()

  const getFieldValue = () => {
    return {
      ...form.current?.getFieldsValue()
    }
  }

  const descriptionsColumns: ProDescriptionsItemProps<DescriptionsProps>[] = [
    {
      title: '办事处总分成(元)',
      dataIndex: 'totalCommission',
      render: (_) => amountTransform(_,'/').toFixed(2)
    },
    {
      title: '办事处总销售分成(元)',
      dataIndex: 'totalSaleCommission',
      render: (_) => amountTransform(_,'/').toFixed(2)
    },
    {
      title: '办事处总管理费分成(元)',
      dataIndex: 'totalRentCommission',
      render: (_) => amountTransform(_,'/').toFixed(2)
    },
    {
      title: '办事处总业绩(元)',
      dataIndex: 'totalOrderAmount',
      render: (_) => amountTransform(_,'/').toFixed(2)
    },
  ]

  const tableColumns: ProColumns<TableProps>[] = [
    {
      title: '办事处ID',
      dataIndex: 'businessDeptId',
      align: 'center',
      hideInTable: true,
      order: 3
    },
    {
      title: 'ID',
      dataIndex: 'businessDeptId',
      align: 'center',
      hideInSearch: true
    },
    {
      dataIndex: 'memberId',
      align: 'center',
      valueType: 'select',
      hideInTable: true,
      valueEnum:{
        2020: '2020',
        2021: '2021',
        2022: '2022'
      }
    },
    {
      dataIndex: 'memberId',
      valueType: 'select',
      hideInTable: true,
      valueEnum:{
        1: '1月',
        2: '2月',
        3: '3月',
        4: '4月',
        5: '5月',
        6: '第一季度',
        7: '第二季度',
      }
    },
    {
      title: '办事处名称',
      dataIndex: 'businessDeptName',
      align: 'center',
      order: 4
    },
    {
      title: '累计分成(元)',
      dataIndex: 'totalCommission',
      align: 'center',
      render: (_)=>{
        return <a onClick={()=>{}}>{_}</a>
      },
      hideInSearch: true
    },
    {
      title: '销售分成(元)',
      dataIndex: 'totalSaleCommission',
      align: 'center',
      render: (_)=>{
        return <a onClick={()=>{}}>{_}</a>
      },
      hideInSearch: true
    },
    {
      title: '管理费分成(元)',
      dataIndex: 'totalRentCommission',
      align: 'center',
      render: (_)=>{
        return <a onClick={()=>{}}>{_}</a>
      },
      hideInSearch: true
    },
    {
      title: '累计业绩(元)',
      dataIndex: 'totalOrderAmount',
      align: 'center',
      render: (_,data)=>{
        return <>
                <a onClick={()=>{}}>{_}</a>
                <p>{data?.totalCount}台（销售{data?.totalSaleCount}台 + 租赁{data?.totalRentCount}台）</p>
               </>
      },
      hideInSearch: true
    },
  ]

  return (
    <PageContainer title={false}>
      <ProDescriptions<DescriptionsProps>
        column={8}
        bordered
        layout='vertical'
        columns={descriptionsColumns}
        request={businessDeptSum}
      />
      <ProTable<TableProps>
        rowKey="memberId"
        columns={tableColumns}
        request={findPage}
        columnEmptyText={false}
        formRef={form}
        pagination={{
          pageSize: 10
        }}
        options={false}
        search={{
          optionRender: (searchConfig, props, dom)=> [
            ...dom.reverse(),
            <Export
              key="1"
              type='financial-businessDept-commission-page'
              conditions={getFieldValue}
            />,
            <ExportHistory key='task' show={visit} setShow={setVisit} type={'financial-businessDept-commission-page'}/>,
          ]
        }}
      />
      {/* {
        devicesVisible&&
        <DevicesDetail
          visible={devicesVisible}
          setVisible={setDevicesVisible}
          type={type}
          memberId={memberId}
          memberPhone={memberPhone}
        />
      } */}
    </PageContainer>
  )
}
