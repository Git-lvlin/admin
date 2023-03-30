import { useState, useRef,useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import type { DescriptionsProps, TableProps, Refer } from "./data"
import { Descriptions } from 'antd';

import { AEDOrderPm,AEDOrderPmStats } from "@/services/aed-team-leader/order-performance"
import { amountTransform } from '@/utils/utils'
import StoreInformation from './store-information'

export default function TransactionData () {
  const [type, setType] = useState<number>(0)
  const [storeVisible, setStoreVisible] = useState<boolean>(false)
  const [msgDetail, setMsgDetail] = useState<TableProps>()
  const [detailList,setDetailList]=useState<DescriptionsProps>()
  const [time,setTime]=useState<Refer>()
  const form = useRef<ActionType>()

  useEffect(() => {
    const params={
      managerPhone:time?.managerPhone,
      startTime:time?.dateRange&&time?.dateRange[0],
      endTime:time?.dateRange&&time?.dateRange[1]
    }
    AEDOrderPmStats(params).then(res=>{
      if(res.code==0){
        setDetailList(res.data[0])
      }
    })

  }, [time])

  const tableColumns: ProColumns<TableProps>[] = [
    {
      title: 'ID',
      dataIndex: 'agencyId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '团长手机号',
      dataIndex: 'managerPhone',
      align: 'center',
      order: 4,
      fieldProps:{
        placeholder:'请输入团长手机号码'
      },
    },
    {
      title: '交易时间',
      dataIndex: 'dateRange',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '累计业绩（元）',
      dataIndex: 'totalPayAmount',
      align: 'center',
      render: (_,data)=>{
        if(_&&_>0){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(1)}}>{amountTransform(_,'/').toFixed(2)}</a>
        }else{
          return '0'
        }
      },
      hideInSearch: true,
    },
    {
      title: '提成（元）',
      dataIndex: 'totalCommission',
      align: 'center',
      render: (_,data)=>{
        if(_&&_>0){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(2)}}>{amountTransform(_,'/').toFixed(2)}</a>
        }else{
          return '0'
        }
      },
      hideInSearch: true
    }
  ]

  return (
    <PageContainer title={false}>
      <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff'}} column={9} layout="vertical" bordered>
        <Descriptions.Item  label="总交易业绩（元）">{amountTransform(detailList?.totalPayAmount,'/').toFixed(2)}  </Descriptions.Item>
        <Descriptions.Item  label="总提成">{amountTransform(detailList?.totalCommission,'/').toFixed(2)}  </Descriptions.Item>
      </Descriptions>
      <ProTable<TableProps>
        rowKey="businessDeptId"
        headerTitle='列表'
        columns={tableColumns}
        request={AEDOrderPm}
        columnEmptyText={false}
        actionRef={form}
        onSubmit={(val)=>{
          setTime({
            managerPhone: val.managerPhone,
            dateRange: val.dateRange,
          })
        }}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        options={false}
        search={{
          defaultCollapsed: true,
          labelWidth: 110,
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
          onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
          type={type}
        />
      }
    </PageContainer>
  )
}
