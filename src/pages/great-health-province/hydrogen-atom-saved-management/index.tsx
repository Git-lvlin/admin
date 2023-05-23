import { useState, useRef } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from '@/components/pro-table'
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import type { TableProps } from "./data"

import { configHpa } from "@/services/great-health-province/hydrogen-atom-saved-management"
import EditInformation from './edit-information'
import ResetPasswords from './reset-passwords'

export default function GenerationManagement () {
  const [editVisible, setEditVisible] = useState<boolean>(false)
  const [resetVisible, setResetVisible] = useState<boolean>(false)
  const [msgDetail, setMsgDetail] = useState<TableProps>()
  const ref = useRef<ActionType>()


  const tableColumns: ProColumns<TableProps>[] = [
    {
      title: 'ID',
      dataIndex: 'agencyId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '生效状态',
      dataIndex: 'status',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '氢原子省代名称',
      dataIndex: 'name',
      align: 'center',
      fieldProps:{
        placeholder:'请输入氢原子省代名称'
      },
    },
    {
      title: '登录账号',
      dataIndex: 'userName',
      align: 'center',
      fieldProps: {
        placeholder: '请输入登录账号'
      }
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
      <ProTable<TableProps>
        rowKey="agencyId"
        headerTitle='列表'
        columns={tableColumns}
        request={configHpa}
        columnEmptyText={false}
        actionRef={ref}
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
        editVisible&&
        <EditInformation
          visible={editVisible}
          setVisible={setEditVisible}
          msgDetail={msgDetail}
          callback={()=>{ ref?.current?.reload();setMsgDetail(undefined)}}
          onClose={()=>{ ref?.current?.reload();setMsgDetail(undefined)}}
        />
      }
      {
        resetVisible&&
        <ResetPasswords
          visible={resetVisible}
          setVisible={setResetVisible}
          msgDetail={msgDetail}
          callback={()=>{ ref?.current?.reload();setMsgDetail(undefined)}}
          onClose={()=>{ ref?.current?.reload();setMsgDetail(undefined)}}
        />
      }
    </PageContainer>
  )
}
