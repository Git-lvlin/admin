import { useState, useRef,useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import type { DescriptionsProps, TableProps, Refer } from "./data"
import { Descriptions } from 'antd';

import { AEDOrderPm,AEDOrderPmStats } from "@/services/aed-team-leader/order-performance"
import { amountTransform } from '@/utils/utils'
import StoreInformation from './store-information'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import moment from "moment"

export default function TransactionData () {
  const [type, setType] = useState<number>(0)
  const [storeVisible, setStoreVisible] = useState<boolean>(false)
  const [msgDetail, setMsgDetail] = useState<TableProps>()
  const [detailList,setDetailList]=useState<DescriptionsProps>()
  const [time,setTime]=useState<Refer>()
  const form = useRef<ActionType>()
  const [visit, setVisit] = useState<boolean>(false)

  useEffect(() => {
    const params={
      startTime:time?.dateRange&&time?.dateRange[0],
      endTime:time?.dateRange&&time?.dateRange[1],
      ...time
    }
    AEDOrderPmStats(params).then(res=>{
      if(res.code==0){
        setDetailList(res.data[0])
      }
    })

  }, [time])

  const tableColumns: ProColumns<TableProps>[] = [
    {
      title: '序号',
      dataIndex:'agencyId',
      hideInSearch: true,
      valueType: 'indexBorder'
    },
    {
      title: 'ID',
      dataIndex: 'agencyId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '子公司名称',
      dataIndex: 'name',
      align: 'center',
      order: 4,
      fieldProps:{
        placeholder:'请输入子公司名称'
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
    },
    {
      title: '已解冻提成(元)【含通道费】',
      dataIndex: 'freezeAmountDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '未解冻提成(元)【含通道费】',
      dataIndex: 'unFreezeAmountDesc',
      align: 'center',
      hideInSearch: true
    }
  ]

  const getFieldValue = (searchConfig: any) => {
    const {dateRange,...rest}=searchConfig.form.getFieldsValue()
    return {
      startTime:dateRange&&moment(dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime:dateRange&&moment(dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest,
    }
  }
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
            name: val.name,
            dateRange: val.dateRange,
          })
        }}
        onReset={()=>{
          setTime(undefined)
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
            ...dom.reverse(),
            <Export
            key='export'
            change={(e: boolean | ((prevState: boolean) => boolean)) => { setVisit(e) }}
            type={'AEDOrder'}
            conditions={()=>{return getFieldValue(searchConfig)}}
          />,
          <ExportHistory key='task' show={visit} setShow={setVisit} type={'AEDOrder'}/>
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
