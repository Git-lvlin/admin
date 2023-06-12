import { useState, useRef,useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from '@/components/pro-table'
import type { ProColumns, ActionType } from "@ant-design/pro-table"
import type { DescriptionsProps, TableProps } from "./data"
import { Descriptions } from 'antd';

import { cityAgentAedTrain,cityAgentAedTrainStats } from "@/services/hydrogen-atom-generation/aed-training-service-achievement"
import { amountTransform } from '@/utils/utils'
import StoreInformation from './store-information'
import CumulativePerformance from './cumulative-performance'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import moment from "moment"

export default function GenerationManagement () {
  const [visible, setVisible] = useState<boolean>(false)
  const [storeVisible, setStoreVisible] = useState<boolean>(false)
  const [msgDetail, setMsgDetail] = useState<TableProps>()
  const [detailList,setDetailList]=useState<DescriptionsProps>()
  const [time,setTime]=useState<TableProps>()
  const form = useRef<ActionType>()
  const [visit, setVisit] = useState<boolean>(false)

  useEffect(() => {
    const params={
      agencyId:time?.agencyId,
      name:time?.name,
      startTime:time?.dateRange&&time?.dateRange[0],
      endTime:time?.dateRange&&time?.dateRange[1]
    }
    cityAgentAedTrainStats(params).then(res=>{
      if(res.code==0){
        setDetailList(res.data[0])
      }
    })

  }, [time])

  const getFieldValue = (searchConfig: any) => {
    const { dateRange, ...rest } = searchConfig.form.getFieldsValue()
    const params = {
      ...rest,
      startTime:dateRange&&moment(dateRange[0]).format('YYYY-MM-DD'),
      endTime:dateRange&&moment(dateRange[1]).format('YYYY-MM-DD'),
    }
    return params
  }

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
        <Descriptions.Item  label="AED培训及服务套餐业绩">{amountTransform(detailList?.totalPayAmount,'/').toFixed(2)}  </Descriptions.Item>
        <Descriptions.Item  label="AED培训及服务套餐提成">{amountTransform(detailList?.totalCommission,'/').toFixed(2)}  </Descriptions.Item>
      </Descriptions>
      <ProTable
        rowKey="agencyId"
        headerTitle='列表'
        columns={tableColumns}
        request={cityAgentAedTrain}
        columnEmptyText={false}
        actionRef={form}
        onSubmit={(val: TableProps) => {
          setTime({
            agencyId: val.agencyId,
            name: val.name,
            dateRange: val.dateRange
          })
        } }
        onReset={() => {
          setTime({})
        } }
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        options={false}
        search={{
          labelWidth: 200,
          optionRender: (searchConfig: any, formProps: any, dom: any[]) => [
            ...dom.reverse(),
            <Export
              key='export'
              change={(e: boolean | ((prevState: boolean) => boolean)) => { setVisit(e) } }
              type={'cityAgentAedTrain'}
              conditions={() => { return getFieldValue(searchConfig) } } />,
            <ExportHistory key='task' show={visit} setShow={setVisit} type='cityAgentAedTrain' />,
          ],
        }} 
        paginationProps={false}      
        />
      {
        storeVisible&&
        <StoreInformation
          visible={storeVisible}
          setVisible={setStoreVisible}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
        />
      }
      {
        visible&&
        <CumulativePerformance
          visible={visible}
          setVisible={setVisible}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
        />
      }
    </PageContainer>
  )
}
