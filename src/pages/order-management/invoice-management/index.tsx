import { useState, useRef,useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"
import type { ProColumns } from "@ant-design/pro-table"
import type { FormInstance } from "@ant-design/pro-form"
import type { DescriptionsProps, TableProps } from "./data"

import { cityAgentManage,cityAgentManageStats } from "@/services/city-office-management/hydrogen-atom-generation/generation-management"
import { amountTransform } from '@/utils/utils'
import { Button } from "antd"
// import StoreInformation from './store-information'
// import CumulativePerformance from './cumulative-performance'
// import EditInformation from './edit-information'
// import ResetPasswords from './reset-passwords'

export default function GenerationManagement () {
  const [type, setType] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(false)
  const [storeVisible, setStoreVisible] = useState<boolean>(false)
  const [editVisible, setEditVisible] = useState<boolean>(false)
  const [resetVisible, setResetVisible] = useState<boolean>(false)
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
      title: '序号',
      dataIndex:'id',
      valueType: 'borderIndex',
      hideInSearch: true,
      valueType: 'indexBorder'
    },
    {
      title: '申请人',
      dataIndex: 'agentName',
      align: 'center',
    },
    {
      title: '订单类型',
      dataIndex: 'agentName',
      align: 'center',
    },
    {
      title: '订单号',
      dataIndex: 'agentName',
      align: 'center',
      render: (_,data)=>{
        return <a onClick={()=>{setVisible(true);setMsgDetail(data);setType(1)}}>{_}</a>
      },
    },
    {
      title: '商品',
      dataIndex: 'agentName',
      align: 'center',
    },
    {
      title: '数量',
      dataIndex: 'agentName',
      align: 'center',
    },
    {
      title: '申请时间',
      dataIndex: 'createTime',
      align: 'center',
    },
    {
      title: '订单金额(元)',
      dataIndex: 'totalAmount',
      align: 'center',
      render: (_,data)=>{
          return amountTransform(_,'/').toFixed(2)
      },
    },
    {
      title: '供应商ID',
      dataIndex: 'totalCommission',
      align: 'center',
    },
    {
      title: '开票详情',
      dataIndex: 'hydrogenCommission',
      align: 'center',
      render: (_,data)=>{
        return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(2)}}>查看开票信息</a>
      }
    },
    {
      title: '开票时间',
      dataIndex: 'wholesaleCommission',
      align: 'center',
    },
    {
      title: '最近操作人',
      dataIndex: 'hydrogenLeaseCommission',
      align: 'center',
    },
    {
      title: '最近操作时间',
      dataIndex: 'accountName',
      align: 'center',
    },
    {
      title: '开票状态',
      dataIndex: 'accountName',
      align: 'center',
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>([
        <Button onClick={()=>{setEditVisible(true);setMsgDetail(data)}} key='edit'>拒绝</Button>,
        <Button onClick={()=>{setResetVisible(true);setMsgDetail(data)}} key='reset'>重置密码</Button>
      ])
    },
  ]

  return (
    <PageContainer title={false}>
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
      {/* {
        storeVisible&&
        <StoreInformation
          visible={storeVisible}
          setVisible={setStoreVisible}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail(null)}}
          type={type}
        />
      }
      {
        visible&&
        <CumulativePerformance
          visible={visible}
          setVisible={setVisible}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail(null)}}
          type={type}
        />
      }
      {
        editVisible&&
        <EditInformation
          visible={editVisible}
          setVisible={setEditVisible}
          msgDetail={msgDetail}
          callback={()=>{ form?.current?.reload();setMsgDetail(null)}}
          onClose={()=>{ form?.current?.reload();setMsgDetail(null)}}
        />
      }
      {
        resetVisible&&
        <ResetPasswords
          visible={resetVisible}
          setVisible={setResetVisible}
          msgDetail={msgDetail}
          callback={()=>{ form?.current?.reload();setMsgDetail(null)}}
          onClose={()=>{ form?.current?.reload();setMsgDetail(null)}}
        />
      } */}
    </PageContainer>
  )
}
