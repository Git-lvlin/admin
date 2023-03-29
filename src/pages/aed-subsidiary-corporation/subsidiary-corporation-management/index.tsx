import { useState, useRef } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import type { TableProps } from "./data"
// import EditInformation from './edit-information'
// import ResetPasswords from './reset-passwords'
import EnteringInformation from './entering-information'
import ForbiddenModel from './forbidden-model'

import { subsidiaryList } from "@/services/aed-subsidiary-corporation/subsidiary-corporation-management"
import { Button } from "antd"

export default function TransactionData () {
  // const [visible, setVisible] = useState<boolean>(false)
  // const [resetVisible, setResetVisible] = useState<boolean>(false)
  const [enteringVisible, setEnteringVisible] = useState<boolean>(false)
  const [forbiddenVisible, setForbiddenVisible] = useState<boolean>(false)
  const [msgDetail, setMsgDetail] = useState<TableProps>()
  const form = useRef<ActionType>()
  const tableColumns: ProColumns<TableProps>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '子公司手机号',
      dataIndex: 'phone',
      align: 'center',
      fieldProps: {
        placeholder: '请输入子公司手机号码'
      }
    },
    {
      title: '子公司姓名',
      dataIndex: 'name',
      align: 'center',
      fieldProps: {
        placeholder: '请输入子公司姓名'
      }
    },
    {
      title: '录入时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '录入人',
      dataIndex: 'operateName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '业绩状态',
      dataIndex: 'status',
      align: 'center',
      hideInSearch: true,
      valueEnum: {
        0: '已禁用',
        1: '已启用'
      }
    },
    // {
    //   title: '子公司登录账号',
    //   dataIndex: 'userName',
    //   align: 'center',
    //   hideInTable: true,
    //   fieldProps: {
    //     placeholder: '请输入子公司登录账号'
    //   }
    // },
    // {
    //   title: '登录账号',
    //   dataIndex: 'manager',
    //   align: 'center',
    //   hideInSearch: true,
    // },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>([
        <a onClick={()=>{setForbiddenVisible(true);setMsgDetail(data)}} key='forbidden'>{data?.status?'禁用业绩计算':'启用业绩计算'}</a>,
        // <a onClick={()=>{setVisible(true);setMsgDetail(data)}} key='edit'>编辑</a>,
        // <a onClick={()=>{setResetVisible(true);setMsgDetail(data)}} key='reset'>重置密码</a>
      ])
    },
  ]
  return (
    <PageContainer title={false}>
      <ProTable<TableProps>
        headerTitle='列表'
        rowKey="id"
        columns={tableColumns}
        request={subsidiaryList}
        columnEmptyText={false}
        actionRef={form}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        options={false}
        search={{
          defaultCollapsed: true,
          labelWidth: 110,
          optionRender: (searchConfig, formProps, dom) => [
            <Button type="primary" onClick={()=>{ setEnteringVisible(true) }}>录入</Button>,
            ...dom.reverse(),
          ],
        }}
      />
      {/* {
        visible&&
        <EditInformation
          visible={visible}
          setVisible={setVisible}
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
      } */}
      {
        enteringVisible&&
        <EnteringInformation
          visible={enteringVisible}
          setVisible={setEnteringVisible}
          msgDetail={msgDetail}
          callback={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
          onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
        />
      }
      {
        forbiddenVisible&&
        <ForbiddenModel
          visible={forbiddenVisible}
          setVisible={setForbiddenVisible}
          msgDetail={msgDetail}
          callback={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
          onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
        />
      }
    </PageContainer>
  )
}
