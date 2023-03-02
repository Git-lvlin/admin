import { useState, useRef, useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import type { TableProps,DescriptionsProps } from "./data"
import EditInformation from './edit-information'
import ResetPasswords from './reset-passwords'
import MarketAtomicity from './market-atomicity'
import CollocationAtomicity from './collocation-atomicity'
import RentalAtomicity from './rental-atomicity'
import InvestorHeadcount from './investor-headcount'
import OperatorHeadcount from './operator-headcount'

import { Descriptions } from 'antd';

import { agencyCityList,agencyCityCount } from "@/services/city-office-management/city-office-management-list"

export default function TransactionData () {
  const [visible, setVisible] = useState<boolean>(false)
  const [resetVisible, setResetVisible] = useState<boolean>(false)
  const [storeVisible1, setStoreVisible1] = useState<boolean>(false)
  const [storeVisible2, setStoreVisible2] = useState<boolean>(false)
  const [storeVisible3, setStoreVisible3] = useState<boolean>(false)
  const [storeVisible4, setStoreVisible4] = useState<boolean>(false)
  const [storeVisible5, setStoreVisible5] = useState<boolean>(false)
  const [detailList,setDetailList]=useState<DescriptionsProps>()
  const [type, setType] = useState<number>(0)
  const [msgDetail, setMsgDetail] = useState<TableProps>()
  const form = useRef<ActionType>()
  const tableColumns: ProColumns<TableProps>[] = [
    {
      title: 'ID',
      dataIndex: 'agencyId',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '办事处名称',
      dataIndex: 'agencyName',
      align: 'center',
    },
    {
      title: '登录账号',
      dataIndex: 'accountName',
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
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '全款销售氢原子数',
      dataIndex: 'salesDeviceNum',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>{
        if(_){
          return <a onClick={()=>{setStoreVisible1(true);setMsgDetail(data);setType(1)}}>{_}</a>
        }else{
          return _
        }
      }
    },
    {
      title: '托管氢原子数',
      dataIndex: 'hostingDeviceNum',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>{
        if(_){
          return <a onClick={()=>{setStoreVisible2(true);setMsgDetail(data);setType(2)}}>{_}</a>
        }else{
          return _
        }
      }
    },
    {
      title: '氢原子租金单数',
      dataIndex: 'leaseOrderNum',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>{
        if(_){
          return <a onClick={()=>{setStoreVisible3(true);setMsgDetail(data);setType(3)}}>{_}</a>
        }else{
          return _
        }
      }
    },
    {
      title: '投资商总人数',
      dataIndex: 'hostingUserNum',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>{
        if(_){
          return <a onClick={()=>{setStoreVisible4(true);setMsgDetail(data);setType(4)}}>{_}</a>
        }else{
          return _
        }
      }
    },
    {
      title: '运营商总人数',
      dataIndex: 'operateUserNum',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>{
        if(_){
          return <a onClick={()=>{setStoreVisible5(true);setMsgDetail(data);setType(5)}}>{_}</a>
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
    agencyCityCount({}).then(res=>{
      if(res.code==0){
        setDetailList(res.data[0])
      }
    })

  }, [])
  return (
    <PageContainer title={false}>
      <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff',marginBottom:'20px'}} column={9} layout="vertical" bordered>
        <Descriptions.Item  label="市办事处总数量">{detailList?.totalNum}  </Descriptions.Item>
        <Descriptions.Item  label="全款销售氢原子（台）">{detailList?.salesDeviceNum}  </Descriptions.Item>
        <Descriptions.Item  label="托管氢原子（台）">{detailList?.hostingDeviceNum}  </Descriptions.Item>
        <Descriptions.Item  label="氢原子托管租金订单（笔）">{detailList?.leaseOrderNum}  </Descriptions.Item>
        <Descriptions.Item  label="投资商总人数">{detailList?.hostingUserNum}  </Descriptions.Item>
        <Descriptions.Item  label="运营商总人数">{detailList?.operateUserNum}  </Descriptions.Item>
      </Descriptions>
      <ProTable<TableProps>
        headerTitle='列表'
        rowKey="agencyId"
        columns={tableColumns}
        request={agencyCityList}
        columnEmptyText={false}
        actionRef={form}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        options={false}
        search={{
          defaultCollapsed: true,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
          ],
        }}
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
        storeVisible1&&
        <MarketAtomicity
          visible={storeVisible1}
          setVisible={setStoreVisible1}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail(null)}}
          type={type}
        />
      }
      {
        storeVisible2&&
        <CollocationAtomicity
          visible={storeVisible2}
          setVisible={setStoreVisible2}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail(null)}}
          type={type}
        />
      }
      {
        storeVisible3&&
        <RentalAtomicity
          visible={storeVisible3}
          setVisible={setStoreVisible3}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail(null)}}
          type={type}
        />
      }
      {
        storeVisible4&&
        <InvestorHeadcount
          visible={storeVisible4}
          setVisible={setStoreVisible4}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail(null)}}
          type={type}
        />
      }
      {
        storeVisible5&&
        <OperatorHeadcount
          visible={storeVisible5}
          setVisible={setStoreVisible5}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail(null)}}
          type={type}
        />
      }
    </PageContainer>
  )
}
