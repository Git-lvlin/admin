import { useState, useRef,useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"
import moment from 'moment';
import type { ProColumns } from "@ant-design/pro-table"
import type { FormInstance } from "@ant-design/pro-form"
import type { DescriptionsProps, TableProps } from "./data"
import { Descriptions } from 'antd';

import { findPage,businessDeptSum } from "@/services/office-management/office-achievements"
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import { amountTransform } from '@/utils/utils'
import StoreInformation from './store-information'

export default function TransactionData () {
  const [type, setType] = useState<number>(0)
  const [storeVisible, setStoreVisible] = useState<boolean>(false)
  const [msgDetail, setMsgDetail] = useState<string>()
  const [visit, setVisit] = useState<boolean>(false)
  const [detailList,setDetailList]=useState<DescriptionsProps>()
  const [time,setTime]=useState()
  const form = useRef<FormInstance>()

  const getFieldValue = (searchConfig) => {
    const {dateRange,...rest}=searchConfig.form.getFieldsValue()
    return {
      begin:dateRange&&moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss'),
      end:dateRange&&moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest,
    }
  }

  useEffect(() => {
    const params={
      businessDeptName:time?.businessDeptName,
      businessDeptId:time?.businessDeptId,
      begin:time?.dateRange&&time?.dateRange[0],
      end:time?.dateRange&&time?.dateRange[1]
    }
    businessDeptSum(params).then(res=>{
      if(res.code==0){
        setDetailList(res.data)
      }
    })

  }, [time])

  const tableColumns: ProColumns<TableProps>[] = [
    {
      title: '办事处ID',
      dataIndex: 'businessDeptId',
      align: 'center',
      hideInTable: true,
      fieldProps:{
        placeholder:'请输入办事处ID'
      },
      order: 3
    },
    {
      title: 'ID',
      dataIndex: 'businessDeptId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '业绩时段',
      dataIndex: 'dateRange',
      align: 'center',
      valueType: 'dateRange',
      hideInTable: true,
    },
    {
      title: '办事处名称',
      dataIndex: 'businessDeptName',
      align: 'center',
      order: 4,
      fieldProps:{
        placeholder:'请输入办事处名称'
      },
    },
    {
      title: '累计分成(元)',
      dataIndex: 'totalCommission',
      align: 'center',
      render: (_,data)=>{
        if(parseFloat(_)){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(0)}}>{amountTransform(_,'/').toFixed(2)}</a>
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
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(1)}}>{amountTransform(_,'/').toFixed(2)}</a>
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
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(2)}}>{amountTransform(_,'/').toFixed(2)}</a>
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
                <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(3)}}>{amountTransform(_,'/').toFixed(2)}</a>
                <p>{data?.totalCount}台（销售{data?.totalSaleCount}台 + 租赁{data?.totalRentCount}台）</p>
               </>
      },
      hideInSearch: true,
      sorter:(a, b) =>a?.totalOrderAmount - b?.totalOrderAmount
    },
  ]

  return (
    <PageContainer title={false}>
      <ProTable<TableProps>
        rowKey="businessDeptId"
        columns={tableColumns}
        request={findPage}
        columnEmptyText={false}
        actionRef={form}
        tableExtraRender={(_, data) => (
          <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff'}} column={9} layout="vertical" bordered>
            <Descriptions.Item  label="办事处总分成(元)">{amountTransform(detailList?.totalCommission,'/').toFixed(2)}  </Descriptions.Item>
            <Descriptions.Item  label="办事处总销售分成(元)">{amountTransform(detailList?.totalSaleCommission,'/').toFixed(2)}  </Descriptions.Item>
            <Descriptions.Item  label="办事处总管理费分成(元)">{amountTransform(detailList?.totalRentCommission,'/').toFixed(2)}  </Descriptions.Item>
            <Descriptions.Item  label="办事处总业绩(元)">{amountTransform(detailList?.totalOrderAmount,'/').toFixed(2)}  </Descriptions.Item>
          </Descriptions>
        )}
        onSubmit={(val)=>{
          setTime(val)
        }}
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
          onClose={()=>{ form?.current?.reload();setMsgDetail(null)}}
          type={type}
        />
      }
    </PageContainer>
  )
}
