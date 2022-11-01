import { useState, useRef,useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"
import type { ProColumns } from "@ant-design/pro-table"
import type { FormInstance } from "@ant-design/pro-form"
import type { DescriptionsProps, TableProps } from "./data"
import { Descriptions } from 'antd';

import { listPage,cityBusinessDeptSum } from "@/services/city-office-management/city-office-achievements"
import { amountTransform } from '@/utils/utils'
import StoreInformation from './store-information'
import CumulativePerformance from './cumulative-performance'

export default function TransactionData () {
  const [type, setType] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(false)
  const [storeVisible, setStoreVisible] = useState<boolean>(false)
  const [msgDetail, setMsgDetail] = useState<string>()
  const [detailList,setDetailList]=useState<DescriptionsProps>()
  const [time,setTime]=useState()
  const form = useRef<FormInstance>()

  useEffect(() => {
    const params={
      cityBusinessDeptId:time?.cityBusinessDeptId,
      cityBusinessDeptName:time?.cityBusinessDeptName,
      begin:time?.createTime&&time?.createTime[0],
      end:time?.createTime&&time?.createTime[1]
    }
    cityBusinessDeptSum(params).then(res=>{
      if(res.code==0){
        setDetailList(res.data)
      }
    })

  }, [time])

  const tableColumns: ProColumns<TableProps>[] = [
    {
      title: 'ID',
      dataIndex: 'cityBusinessDeptId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '办事处名称',
      dataIndex: 'cityBusinessDeptName',
      align: 'center',
      order: 4,
      fieldProps:{
        placeholder:'请输入办事处名称'
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
      dataIndex: 'totalTradeCommission',
      align: 'center',
      render: (_,data)=>{
        return <a onClick={()=>{setVisible(true);setMsgDetail(data);setType(1)}}>{amountTransform(_,'/').toFixed(2)}</a>

      },
      hideInSearch: true,
    },
    {
      title: '累计提成（元）',
      dataIndex: 'totalCommission',
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
      title: '全款销售提成（元）',
      dataIndex: 'totalSaleCommission',
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
      title: '托管购买交易提成（元）',
      dataIndex: 'totalBuyCommission',
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
      title: '运营租赁服务费提成(元)',
      dataIndex: 'totalTrainingCommission',
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
      title: '托管租赁管理费提成（元）',
      dataIndex: 'totalLeaseCommission',
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
      title: '租赁管理费提成（元）',
      dataIndex: 'totalLeaseCommission',
      align: 'center',
      render: (_,data)=>{
        if(parseFloat(_)){
          return <p>{amountTransform(_,'/').toFixed(2)}</p>
        }else{
          return _
        }

      },
      hideInSearch: true
    }
  ]

  return (
    <PageContainer title={false}>
      <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff'}} column={9} layout="vertical" bordered>
        <Descriptions.Item  label="总交易业绩（元）">{amountTransform(detailList?.totalTradeCommission,'/').toFixed(2)}  </Descriptions.Item>
        <Descriptions.Item  label="总提成">{amountTransform(detailList?.totalCommission,'/').toFixed(2)}  </Descriptions.Item>
        <Descriptions.Item  label="总全款销售提成">{amountTransform(detailList?.totalSaleCommission,'/').toFixed(2)}  </Descriptions.Item>
        <Descriptions.Item  label="总托管购买交易提成">{amountTransform(detailList?.totalBuyCommission,'/').toFixed(2)}  </Descriptions.Item>
        <Descriptions.Item  label="总运营租赁服务费提成">{amountTransform(detailList?.totalTrainingCommission,'/').toFixed(2)}  </Descriptions.Item>
        <Descriptions.Item  label="托管租赁管理费提成">{amountTransform(detailList?.totalLeaseCommission,'/').toFixed(2)}  </Descriptions.Item>
        <Descriptions.Item  label="租赁管理费业绩">{amountTransform(detailList?.totalLeaseCommission,'/').toFixed(2)}  </Descriptions.Item>
      </Descriptions>
      <ProTable<TableProps>
        rowKey="businessDeptId"
        headerTitle='列表'
        columns={tableColumns}
        request={listPage}
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
    </PageContainer>
  )
}
