import { useState, useRef, useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import type { TableProps,DescriptionsProps } from "./data"
import EditInformation from './edit-information'
import ResetPasswords from './reset-passwords'

import { teamLeaderManager,agencyCityCount } from "@/services/great-project-team/great-project-team-management"

export default function TransactionData () {
  const [visible, setVisible] = useState<boolean>(false)
  const [resetVisible, setResetVisible] = useState<boolean>(false)
  const [detailList,setDetailList]=useState<DescriptionsProps>()
  const [msgDetail, setMsgDetail] = useState<string>()
  const form = useRef<ActionType>()
  const tableColumns: ProColumns<TableProps>[] = [
    {
      title: 'ID',
      dataIndex: 'accountId',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '大团队长手机号',
      dataIndex: 'managerPhone',
      align: 'center',
      fieldProps:{
        placeholder:'请输入大团长手机号码'
      }
    },
    {
      title: '大团队长姓名',
      dataIndex: 'manager',
      align: 'center',
      fieldProps:{
        placeholder:'请输入大团长姓名'
      }
    },
    {
      title: '大团长登录账号',
      dataIndex: 'accountName',
      align: 'center',
      fieldProps:{
        placeholder:'请输入大团长登录账号'
      },
      hideInTable: true
    },
    {
      title: '登录账号',
      dataIndex: 'accountName',
      align: 'center',
      hideInSearch: true,
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
      <ProTable<TableProps>
        headerTitle='列表'
        rowKey="accountId"
        columns={tableColumns}
        request={teamLeaderManager}
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
    </PageContainer>
  )
}
