import { useState, useRef,useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from '@/components/pro-table'
import type { ProColumns, ActionType } from "@ant-design/pro-table"
import type { DescriptionsProps, TableProps } from "./data"
import { Descriptions } from 'antd';

import { cityAgentManage,cityAgentManageStats } from "@/services/city-office-management/hydrogen-atom-generation/generation-management"
import { amountTransform } from '@/utils/utils'
import StoreInformation from './store-information'
import CumulativePerformance from './cumulative-performance'
import EditInformation from './edit-information'
import ResetPasswords from './reset-passwords'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import moment from "moment"

export default function GenerationManagement () {
  const [type, setType] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(false)
  const [storeVisible, setStoreVisible] = useState<boolean>(false)
  const [editVisible, setEditVisible] = useState<boolean>(false)
  const [resetVisible, setResetVisible] = useState<boolean>(false)
  const [msgDetail, setMsgDetail] = useState<TableProps>()
  const [detailList,setDetailList]=useState<DescriptionsProps>()
  const [time,setTime]=useState<TableProps>()
  const [visit, setVisit] = useState<boolean>(false)
  const form = useRef<ActionType>()

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

  const getFieldValue = (searchConfig: any) => {
    const { createTime, ...rest } = searchConfig.form.getFieldsValue()
    const params = {
      ...rest,
      startTime:createTime&&moment(createTime[0]).format('YYYY-MM-DD'),
      endTime:createTime&&moment(createTime[1]).format('YYYY-MM-DD'),
    }
    return params
  }

  const tableColumns: ProColumns[] = [
    {
      title: 'ID',
      dataIndex: 'agentId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '氢原子市代名称',
      dataIndex: 'agentName',
      align: 'center',
      order: 4,
      fieldProps:{
        placeholder:'请输入氢原子市代名称'
      },
    },
    {
      title: '交易时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '累计业绩（元）',
      dataIndex: 'totalAmount',
      align: 'center',
      render: (_,data)=>{
        if(parseFloat(_)){
          return <a onClick={()=>{setVisible(true);setMsgDetail(data);setType(1)}}>{amountTransform(_,'/').toFixed(2)}</a>
        }else{
          return '0.00'
        }
      },
      hideInSearch: true,
    },
    {
      title: '累计提成（元）',
      dataIndex: 'totalCommission',
      align: 'center',
      render: (_,data)=>{
        if(parseFloat(_)){
          return <span>{amountTransform(_,'/').toFixed(2)}</span>
        }else{
          return '0.00'
        }

      },
      hideInSearch: true
    },
    {
      title: '氢原子全款销售提成',
      dataIndex: 'hydrogenCommission',
      align: 'center',
      render: (_,data)=>{
        if(parseFloat(_)){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(2)}}>{amountTransform(_,'/').toFixed(2)}</a>
        }else{
          return '0.00'
        }

      },
      hideInSearch: true
    },
    {
      title: '新集约批发业绩提成',
      dataIndex: 'wholesaleCommission',
      align: 'center',
      render: (_,data)=>{
        if(parseFloat(_)){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(3)}}>{amountTransform(_,'/').toFixed(2)}</a>
        }else{
          return '0.00'
        }
      },
      hideInSearch: true
    },
    {
      title: '氢原子租赁管理费提成',
      dataIndex: 'hydrogenLeaseCommission',
      align: 'center',
      render: (_,data)=>{
        if(parseFloat(_)){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(4)}}>{amountTransform(_,'/').toFixed(2)}</a>
        }else{
          return '0.00'
        }
      },
      hideInSearch: true
    },
    {
      title: '登录账号',
      dataIndex: 'accountName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>([
        <a onClick={()=>{setEditVisible(true);setMsgDetail(data)}} key='edit'>编辑</a>,
        <a onClick={()=>{setResetVisible(true);setMsgDetail(data)}} key='reset'>重置密码</a>
      ])
    },
  ]

  return (
    <PageContainer title={false}>
      <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff'}} column={9} layout="vertical" bordered>
        <Descriptions.Item  label="氢原子市代总数量">{detailList?.agentNum}  </Descriptions.Item>
        <Descriptions.Item  label="总提成">{amountTransform(detailList?.totalCommission,'/').toFixed(2)}  </Descriptions.Item>
        <Descriptions.Item  label="总氢原子全款销售提成">{amountTransform(detailList?.hydrogenCommission,'/').toFixed(2)}  </Descriptions.Item>
        <Descriptions.Item  label="总新集约批发业绩提成">{amountTransform(detailList?.wholesaleCommission,'/').toFixed(2)}  </Descriptions.Item>
        <Descriptions.Item  label="氢原子租赁管理费提成">{amountTransform(detailList?.hydrogenLeaseCommission,'/').toFixed(2)}  </Descriptions.Item>
      </Descriptions>
      <ProTable
        rowKey="agentId"
        headerTitle='列表'
        columns={tableColumns}
        request={cityAgentManage}
        columnEmptyText={false}
        actionRef={form}
        onSubmit={(val:TableProps)=>{
          setTime({
            agentId:val.agentId,
            agentName:val.agentName,
            createTime:val.createTime
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
          labelWidth: 200,
          optionRender: (searchConfig: any, formProps: any, dom: any[]) => [
            ...dom.reverse(),
            <Export
              key='export'
              change={(e: boolean | ((prevState: boolean) => boolean)) => { setVisit(e) }}
              type={'invitation-friend-red-packet-detail-export'}
              conditions={()=>{return getFieldValue(searchConfig)}}
            />,
            <ExportHistory key='task' show={visit} setShow={setVisit} type='invitation-friend-red-packet-detail-export'/>,
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
      {
        visible&&
        <CumulativePerformance
          visible={visible}
          setVisible={setVisible}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
          type={type}
        />
      }
      {
        editVisible&&
        <EditInformation
          visible={editVisible}
          setVisible={setEditVisible}
          msgDetail={msgDetail}
          callback={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
          onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
        />
      }
      {
        resetVisible&&
        <ResetPasswords
          visible={resetVisible}
          setVisible={setResetVisible}
          msgDetail={msgDetail}
          callback={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
          onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
        />
      }
    </PageContainer>
  )
}
