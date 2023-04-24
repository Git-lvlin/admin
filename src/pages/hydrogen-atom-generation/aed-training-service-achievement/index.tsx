import { useState, useRef,useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"
import type { ProColumns } from "@ant-design/pro-table"
import type { FormInstance } from "@ant-design/pro-form"
import type { DescriptionsProps, TableProps } from "./data"
import { Descriptions } from 'antd';

import { hpaAedTrain,hpaAedTrainStats } from "@/services/hydrogen-atom-generation/aed-training-service-achievement"
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
      agencyId:time?.agencyId,
      name:time?.name,
      startTime:time?.dateRange&&time?.dateRange[0],
      endTime:time?.dateRange&&time?.dateRange[1]
    }
    hpaAedTrainStats(params).then(res=>{
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
      title: '氢原子市代名称',
      dataIndex: 'name',
      align: 'center',
      order: 4,
      fieldProps:{
        placeholder:'请输入氢原子市代名称'
      },
    },
    {
      title: '交易时间',
      dataIndex: 'dateRange',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: 'AED培训及服务套餐单业绩',
      dataIndex: 'totalPayAmount',
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
      dataIndex: 'totalCommission',
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
      dataIndex: 'scopeDesc',
      align: 'center',
      hideInSearch: true
    }
  ]

  return (
    <PageContainer title={false}>
      <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff'}} column={9} layout="vertical" bordered>
        <Descriptions.Item  label="氢原子市代总数量">{detailList?.totalNum}  </Descriptions.Item>
        <Descriptions.Item  label="AED培训及服务套餐业绩">{amountTransform(detailList?.totalAmount,'/').toFixed(2)}  </Descriptions.Item>
        <Descriptions.Item  label="AED培训及服务套餐提成">{amountTransform(detailList?.totalCommission,'/').toFixed(2)}  </Descriptions.Item>
      </Descriptions>
      <ProTable<TableProps>
        rowKey="agencyId"
        headerTitle='列表'
        columns={tableColumns}
        request={hpaAedTrain}
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
