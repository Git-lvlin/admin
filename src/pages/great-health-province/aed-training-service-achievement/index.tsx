import { useState, useRef,useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"
import type { ProColumns } from "@ant-design/pro-table"
import type { FormInstance } from "@ant-design/pro-form"
import type { DescriptionsProps, TableProps } from "./data"
import { Descriptions } from 'antd';

import { cityAgentManage,cityAgentManageStats } from "@/services/city-office-management/hydrogen-atom-generation/generation-management"
import { amountTransform } from '@/utils/utils'
import StoreInformation from './store-information'
import CumulativePerformance from './cumulative-performance'

export default function GenerationManagement () {
  const [visible, setVisible] = useState<boolean>(false)
  const [storeVisible, setStoreVisible] = useState<boolean>(false)
  const [msgDetail, setMsgDetail] = useState<string>()
  const [detailList,setDetailList]=useState<DescriptionsProps>()
  const [time,setTime]=useState()
  const form = useRef<FormInstance>()

  useEffect(() => {
    const params={
      agentId:time?.agentId,
      agentName:time?.agentName,
      startTime:time?.createTime&&time?.createTime[0],
      endTime:time?.createTime&&time?.createTime[1]
    }
    cityAgentManageStats(params).then(res=>{
      if(res.code==0){
        setDetailList(res.data[0])
      }
    })

  }, [time])

  const tableColumns: ProColumns<TableProps>[] = [
    {
      title: 'ID',
      dataIndex: 'agentId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '大健康省代名称',
      dataIndex: 'agentName',
      align: 'center',
      order: 4,
      fieldProps:{
        placeholder:'请输入大健康省代名称'
      },
    },
    {
      title: '交易时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: 'AED培训及服务套餐单业绩',
      dataIndex: 'totalAmount',
      align: 'center',
      render: (_,data)=>{
        if(parseFloat(_)){
          return <a onClick={()=>{setVisible(true);setMsgDetail(data)}}>{amountTransform(_,'/').toFixed(2)}</a>
        }else{
          return '0.00'
        }
      },
      hideInSearch: true,
    },
    {
      title: 'AED培训及服务套餐单提成',
      dataIndex: 'hydrogenCommission',
      align: 'center',
      render: (_,data)=>{
        if(parseFloat(_)){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data)}}>{amountTransform(_,'/').toFixed(2)}</a>
        }else{
          return '0.00'
        }

      },
      hideInSearch: true
    },
    {
      title: '业绩范围',
      dataIndex: 'accountName',
      align: 'center',
      hideInSearch: true
    }
  ]

  return (
    <PageContainer title={false}>
      <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff'}} column={9} layout="vertical" bordered>
        <Descriptions.Item  label="大健康省代总数量">{detailList?.agentNum}  </Descriptions.Item>
        <Descriptions.Item  label="AED培训及服务套餐业绩">{amountTransform(detailList?.hydrogenLeaseCommission,'/').toFixed(2)}  </Descriptions.Item>
        <Descriptions.Item  label="AED培训及服务套餐提成">{amountTransform(detailList?.hydrogenLeaseCommission,'/').toFixed(2)}  </Descriptions.Item>
      </Descriptions>
      <ProTable<TableProps>
        rowKey="agentId"
        headerTitle='列表'
        columns={tableColumns}
        request={cityAgentManage}
        columnEmptyText={false}
        actionRef={form}
        onSubmit={(val)=>{
          setTime(val)
        }}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        options={false}
        search={{
          labelWidth: 200,
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
        />
      }
      {
        visible&&
        <CumulativePerformance
          visible={visible}
          setVisible={setVisible}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail(null)}}
        />
      }
    </PageContainer>
  )
}
