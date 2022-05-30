import { useState, useRef } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProDescriptions from "@ant-design/pro-descriptions"
import ProTable from "@ant-design/pro-table"
import moment from 'moment';
import type { ProColumns } from "@ant-design/pro-table"
import type { ProDescriptionsItemProps } from "@ant-design/pro-descriptions"
import type { FormInstance } from "@ant-design/pro-form"
import type { DescriptionsProps, TableProps } from "./data"

import { findPage,businessDeptSum } from "@/services/office-management/office-achievements"
import { getPageQuery } from "@/utils/utils"
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import { amountTransform } from '@/utils/utils'
import StoreInformation from './store-information'

export default function TransactionData () {
  const [type, setType] = useState<number>(0)
  const [storeVisible, setStoreVisible] = useState<boolean>(false)
  const [msgDetail, setMsgDetail] = useState<string>()
  const [visit, setVisit] = useState<boolean>(false)
  const form = useRef<FormInstance>()

  const getFieldValue = (searchConfig) => {
    const {dateRange,...rest}=searchConfig.form.getFieldsValue()
    return {
      begin:dateRange&&moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss'),
      end:dateRange&&moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest,
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
      dataIndex: 'dateRange',
      align: 'center',
      valueType: 'dateRange',
      hideInTable: true,
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
      render: (_,data)=>{
        if(parseFloat(_)){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(1)}}>{amountTransform(_,'/').toFixed(2)}</a>
        }else{
          return _
        }

      },
      hideInSearch: true
    },
    {
      title: '销售分成(元)',
      dataIndex: 'totalSaleCommission',
      align: 'center',
      render: (_,data)=>{
        if(parseFloat(_)){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(2)}}>{amountTransform(_,'/').toFixed(2)}</a>
        }else{
          return _
        }
      },
      hideInSearch: true
    },
    {
      title: '管理费分成(元)',
      dataIndex: 'totalRentCommission',
      align: 'center',
      render: (_,data)=>{
        if(parseFloat(_)){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(3)}}>{amountTransform(_,'/').toFixed(2)}</a>
        }else{
          return _
        }

      },
      hideInSearch: true
    },
    {
      title: '累计业绩(元)',
      dataIndex: 'totalOrderAmount',
      align: 'center',
      render: (_,data)=>{
        return <>
                <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(4)}}>{amountTransform(_,'/').toFixed(2)}</a>
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
        actionRef={form}
        pagination={{
          pageSize: 10
        }}
        options={false}
        search={{
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
              <Export
                 key='export'
                 change={(e) => { setVisit(e) }}
                 type={'financial-businessDept-commission-page'}
                 conditions={()=>{return getFieldValue(searchConfig)}}
               />,
               <ExportHistory key='task' show={visit} setShow={setVisit} type={'financial-businessDept-commission-page'}/>
          ],
        }}
      />
       {
        storeVisible&&
        <StoreInformation
          visible={storeVisible}
          setVisible={setStoreVisible}
          msgDetail={msgDetail}
          callback={()=>{ form?.current?.reload();setMsgDetail(null)}}
          onClose={()=>{ form?.current?.reload();setMsgDetail(null)}}
          type={type}
        />
      }
    </PageContainer>
  )
}
