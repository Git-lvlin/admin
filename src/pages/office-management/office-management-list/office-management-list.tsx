import { useState, useRef, useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"
import ProDescriptions from "@ant-design/pro-descriptions"
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import type { DescriptionsProps, TableProps } from "./data"
import EditInformation from './edit-information'
import ResetPasswords from './reset-passwords'
import StoreInformation from './store-information'
import type { ProDescriptionsItemProps } from "@ant-design/pro-descriptions"

import { userLists,userCount } from "@/services/office-management/office-management-list"

export default function TransactionData () {
  const [visible, setVisible] = useState<boolean>(false)
  const [resetVisible, setResetVisible] = useState<boolean>(false)
  const [storeVisible, setStoreVisible] = useState<boolean>(false)
  const [type, setType] = useState<number>(0)
  const [msgDetail, setMsgDetail] = useState<string>()
  const [memberPhone, setMemberPhone] = useState<string>()
  const form = useRef<ActionType>()
  const descriptionsColumns: ProDescriptionsItemProps<DescriptionsProps>[] = [
    {
      title: '办事处总数量',
      dataIndex: 'agencyTotalNum',
      render: (_) => _
    },
    {
      title: '有登录记录办事处数',
      dataIndex: 'agencyLoginNum',
      render: (_) => _
    },
    {
      title: 'VIP社区店总数(家)',
      dataIndex: 'vipStoreNum',
      render: (_) => _
    },
    {
      title: '普通社区店总数(家)',
      dataIndex: 'commonStoreNum',
      render: (_) => _
    },
  ]
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
      title: 'VIP社区店数',
      dataIndex: 'vipStoreNums',
      align: 'center',
      render: (_,data)=>{
        return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data)}}>{_}</a>
      }
    },
    {
      title: '普通社区店数',
      dataIndex: 'commonStoreNums',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>{
        return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data)}}>{_}</a>
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

  return (
    <PageContainer title={false}>
      <ProDescriptions<DescriptionsProps>
        column={8}
        bordered
        layout='vertical'
        columns={descriptionsColumns}
        request={userCount}
      />
      <ProTable<TableProps>
        rowKey="memberId"
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
          callback={()=>{ form?.current?.reload();setMsgDetail(null)}}
          onClose={()=>{ form?.current?.reload();setMsgDetail(null)}}
        />
      }
    </PageContainer>
  )
}
