import { useState, useRef, useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import type { TableProps,DescriptionsProps } from "./data"
import EditInformation from './edit-information'
import ResetPasswords from './reset-passwords'
import StoreInformation from './store-information'
import { Descriptions } from 'antd';

import { userLists,userCount } from "@/services/office-management/office-management-list"

export default function TransactionData () {
  const [visible, setVisible] = useState<boolean>(false)
  const [resetVisible, setResetVisible] = useState<boolean>(false)
  const [storeVisible, setStoreVisible] = useState<boolean>(false)
  const [detailList,setDetailList]=useState<DescriptionsProps>()
  const [type, setType] = useState<number>(0)
  const [msgDetail, setMsgDetail] = useState<string>()
  const form = useRef<ActionType>()
  const tableColumns: ProColumns<TableProps>[] = [
    {
      title: 'ID',
      dataIndex: 'agencyId',
      align: 'center',
    },
    {
      title: '办事处名称',
      dataIndex: 'name',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '登录账号',
      dataIndex: 'userName',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '负责人',
      dataIndex: 'manager',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '负责人手机',
      dataIndex: 'managerPhone',
      align: 'center'
    },
    {
      title: 'VIP店主数',
      dataIndex: 'vipStoreNums',
      align: 'center',
      render: (_,data)=>{
        if(_){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(1)}}>{_}</a>
        }else{
          return _
        }
      }
    },
    {
      title: '普通店主数',
      dataIndex: 'commonStoreNums',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>{
        if(_){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(0)}}>{_}</a>
        }else{
          return _
        }
      }
    },
    {
      title: '销售氢原子数',
      dataIndex: 'sellMachineNum',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>{
        if(_){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(0)}}>{_}</a>
        }else{
          return _
        }
      }
    },
    {
      title: '租赁氢原子数',
      dataIndex: 'rentMachineNum',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>{
        if(_){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(0)}}>{_}</a>
        }else{
          return _
        }
      }
    },
    {
      title: '托管氢原子数',
      dataIndex: 'rentMachineNum',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>{
        if(_){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(0)}}>{_}</a>
        }else{
          return _
        }
      }
    },
    {
      title: '运营氢原子数',
      dataIndex: 'rentMachineNum',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>{
        if(_){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(0)}}>{_}</a>
        }else{
          return _
        }
      }
    },
    {
      title: '投资商总人数',
      dataIndex: 'rentMachineNum',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>{
        if(_){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(0)}}>{_}</a>
        }else{
          return _
        }
      }
    },
    {
      title: '运营商总人数',
      dataIndex: 'rentMachineNum',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>{
        if(_){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(0)}}>{_}</a>
        }else{
          return _
        }
      }
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>([
        <a onClick={()=>{setVisible(true);setMsgDetail(data)}} key='edit'>编辑</a>,
        <a onClick={()=>{setResetVisible(true);setMsgDetail(data)}} key='reset'>重置密码</a>
      ])
    },
  ]
  useEffect(() => {
    userCount({}).then(res=>{
      if(res.code==0){
        setDetailList(res.data)
      }
    })

  }, [])
  return (
    <PageContainer title={false}>
      <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff',marginBottom:'20px'}} column={9} layout="vertical" bordered>
        <Descriptions.Item  label="市办事处总数量">{detailList?.agencyTotalNum}  </Descriptions.Item>
        {/* <Descriptions.Item  label="有登录记录办事处数">{detailList?.agencyLoginNum}  </Descriptions.Item> */}
        <Descriptions.Item  label="VIP店主数（家）">{detailList?.vipStoreNum}  </Descriptions.Item>
        <Descriptions.Item  label="普通店主数（家）">{detailList?.commonStoreNum}  </Descriptions.Item>
        <Descriptions.Item  label="销售氢原子（台）">{detailList?.sellMachineNum}  </Descriptions.Item>
        <Descriptions.Item  label="租赁氢原子（台）">{detailList?.rentMachineNum}  </Descriptions.Item>
        <Descriptions.Item  label="托管氢原子（台）">{detailList?.rentMachineNum}  </Descriptions.Item>
        <Descriptions.Item  label="运营氢原子（台）">{detailList?.rentMachineNum}  </Descriptions.Item>
        <Descriptions.Item  label="投资商总人数">{detailList?.rentMachineNum}  </Descriptions.Item>
        <Descriptions.Item  label="运营商总人数">{detailList?.rentMachineNum}  </Descriptions.Item>
      </Descriptions>
      <ProTable<TableProps>
        rowKey="agencyId"
        columns={tableColumns}
        request={userLists}
        columnEmptyText={false}
        actionRef={form}
        pagination={{
          pageSize: 10
        }}
        options={false}
        search={false}
      />
      {
        visible&&
        <EditInformation
          visible={visible}
          setVisible={setVisible}
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
      }
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
