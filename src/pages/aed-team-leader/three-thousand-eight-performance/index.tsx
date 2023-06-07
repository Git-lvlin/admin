import TimeSelect from '@/components/time-select'
import { useState, useRef,useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import type { DescriptionsProps, MsgDetailProps, Refer } from "./data"
import { Descriptions } from 'antd';

import { AEDRecordSubPage,AEDRecordSubSum } from "@/services/aed-team-leader/three-thousand-eight-performance"
import { amountTransform } from '@/utils/utils'
import StoreInformation from './store-information'

export default function TransactionData () {
  const [type, setType] = useState<number>(0)
  const [storeVisible, setStoreVisible] = useState<boolean>(false)
  const [msgDetail, setMsgDetail] = useState<MsgDetailProps>()
  const [detailList,setDetailList]=useState<DescriptionsProps>()
  const [time,setTime]=useState<Refer>()
  const form = useRef<ActionType>()

  useEffect(() => {
    const params={
      subName:time?.subName,
      startTime:time?.dateRange&&time?.dateRange[0],
      endTime:time?.dateRange&&time?.dateRange[1]
    }
    AEDRecordSubSum(params).then(res=>{
      if(res.code==0){
        setDetailList(res.data)
      }
    })

  }, [time])

  const tableColumns: ProColumns[] = [
    {
      title: 'ID',
      dataIndex: 'subId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '子公司名称',
      dataIndex: 'subName',
      align: 'center',
      order: 4,
      fieldProps:{
        placeholder:'请输入子公司名称'
      },
    },
    {
      title: '交易时间',
      dataIndex: 'dateRange',
      renderFormItem: () => <TimeSelect />,
      hideInTable: true
    },
    {
      title: '累计业绩（元）',
      dataIndex: 'amountSum',
      align: 'center',
      render: (_,data)=>{
        if(_){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(1)}}>{amountTransform(_,'/').toFixed(2)}</a>
        }else{
          return '0'
        }
      },
      hideInSearch: true,
    },
    {
      title: '提成（元）',
      dataIndex: 'commissionSum',
      align: 'center',
      render: (_,data)=>{
        if(_){
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

      <ProTable
        rowKey="subId"
        headerTitle='列表'
        columns={tableColumns}
        request={AEDRecordSubPage}
        columnEmptyText={false}
        actionRef={form}
        tableExtraRender={() => 
          <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff'}} column={9} layout="vertical" bordered>
            <Descriptions.Item  label="总交易业绩（元）">{amountTransform(detailList?.totalAmount,'/').toFixed(2)}  </Descriptions.Item>
            <Descriptions.Item  label="总提成">{amountTransform(detailList?.totalCommission,'/').toFixed(2)}  </Descriptions.Item>
          </Descriptions>
        }
        onSubmit={(val)=>{
          setTime({
            subName: val.subName,
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
