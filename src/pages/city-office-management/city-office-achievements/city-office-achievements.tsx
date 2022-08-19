import { useState, useRef,useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"
import type { ProColumns } from "@ant-design/pro-table"
import type { FormInstance } from "@ant-design/pro-form"
import type { DescriptionsProps, TableProps } from "./data"
import { Descriptions } from 'antd';

import { findPage,businessDeptSum } from "@/services/office-management/office-achievements"
import { amountTransform } from '@/utils/utils'
import StoreInformation from './store-information'

export default function TransactionData () {
  const [type, setType] = useState<number>(0)
  const [storeVisible, setStoreVisible] = useState<boolean>(false)
  const [msgDetail, setMsgDetail] = useState<string>()
  const [detailList,setDetailList]=useState<DescriptionsProps>()
  const [time,setTime]=useState()
  const form = useRef<FormInstance>()

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
      title: 'ID',
      dataIndex: 'businessDeptId',
      align: 'center',
      hideInSearch: true
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
      title: '累计业绩（元）',
      dataIndex: 'totalOrderAmount',
      align: 'center',
      render: (_,data)=>{
        return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(1)}}>{amountTransform(_,'/').toFixed(2)}</a>

      },
      hideInSearch: true,
    },
    {
      title: '累计提成（元）',
      dataIndex: 'totalOrderAmount',
      align: 'center',
      render: (_,data)=>{
        if(parseFloat(_)){
          return <p>{amountTransform(_,'/').toFixed(2)}</p>
        }else{
          return _
        }

      },
      hideInSearch: true
    },
    {
      title: '销售提成（元）',
      dataIndex: 'totalCommission',
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
      title: '管理费提成（元））',
      dataIndex: 'totalSaleCommission',
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
      title: '托管推广提成（元）',
      dataIndex: 'totalRentCommission',
      align: 'center',
      render: (_,data)=>{
        if(parseFloat(_)){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(4)}}>{amountTransform(_,'/').toFixed(2)}</a>
        }else{
          return _
        }

      },
      hideInSearch: true
    },
    {
      title: '运营推广提成(元)',
      dataIndex: 'totalBootCommission',
      align: 'center',
      render: (_,data)=>{
        if(parseFloat(_)){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(5)}}>{amountTransform(_,'/').toFixed(2)}</a>
        }else{
          return _
        }

      },
      hideInSearch: true
    },
    {
      title: '启动费提成（元）',
      dataIndex: 'totalBootCommission',
      align: 'center',
      render: (_,data)=>{
        if(parseFloat(_)){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(6)}}>{amountTransform(_,'/').toFixed(2)}</a>
        }else{
          return _
        }

      },
      hideInSearch: true
    },
    {
      title: '门店营业额提成（元）',
      dataIndex: 'totalBootCommission',
      align: 'center',
      render: (_,data)=>{
        if(parseFloat(_)){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(7)}}>{amountTransform(_,'/').toFixed(2)}</a>
        }else{
          return _
        }
      },
      hideInSearch: true
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
            <Descriptions.Item  label="总业绩（元）">{amountTransform(detailList?.totalCommission,'/').toFixed(2)}  </Descriptions.Item>
            <Descriptions.Item  label="总提成">{amountTransform(detailList?.totalSaleCommission,'/').toFixed(2)}  </Descriptions.Item>
            <Descriptions.Item  label="总销售提成">{amountTransform(detailList?.totalRentCommission,'/').toFixed(2)}  </Descriptions.Item>
            <Descriptions.Item  label="总管理费提成">{amountTransform(detailList?.totalOrderAmount,'/').toFixed(2)}  </Descriptions.Item>
            <Descriptions.Item  label="总托管推广提成">{amountTransform(detailList?.totalBootCommission,'/').toFixed(2)}  </Descriptions.Item>
            <Descriptions.Item  label="总运营推广提成">{amountTransform(detailList?.totalBootCommission,'/').toFixed(2)}  </Descriptions.Item>
            <Descriptions.Item  label="总启动费提成">{amountTransform(detailList?.totalBootCommission,'/').toFixed(2)}  </Descriptions.Item>
            <Descriptions.Item  label="门店总营业额提成">{amountTransform(detailList?.totalBootCommission,'/').toFixed(2)}  </Descriptions.Item>
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
            ...dom.reverse()
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
