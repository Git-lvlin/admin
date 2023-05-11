import { useState, useRef } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import type { TableProps } from "./data"
import EditInformation from './edit-information'
import ResetPasswords from './reset-passwords'
import EnteringInformation from './entering-information'
import OnOffModel from './on-off-model'
import HeadRegimentManagement from './head-regiment-management'
import { subCompanyGetList } from "@/services/aed-team-leader/team-leader-management"
import { Button } from "antd"

export default function TransactionData () {
  const [visible, setVisible] = useState<boolean>(false)
  const [resetVisible, setResetVisible] = useState<boolean>(false)
  const [enteringVisible, setEnteringVisible] = useState<boolean>(false)
  const [onOffVisible, setOnOffVisible] = useState<boolean>(false)
  const [regimentVisible, setRegimentVisible] = useState<boolean>(false)
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
      title: 'AED子公司名称',
      dataIndex: 'name',
      align: 'center',
      fieldProps: {
        placeholder: '请输入子公司名称'
      },
      hideInTable: true
    },
    {
      title: '类型',
      dataIndex: 'type',
      align: 'center',
      hideInTable: true,
      valueEnum: {
        1: '子公司',
        2: '非子公司'
      },
      fieldProps: {
        placeholder: '请选择子公司类型'
      }
    },
    {
      title: '类型',
      dataIndex: 'typeDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '用户ID',
      dataIndex: 'buyerId',
      valueType: 'text',
    },
    {
      title: '子公司名称',
      dataIndex: 'name',
      align: 'center',
      fieldProps: {
        placeholder: '请输入子公司名称'
      },
      hideInSearch: true
    },
    {
      title: '负责人',
      dataIndex: 'manager',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '负责人手机',
      dataIndex: 'managerPhone',
      align: 'center',
      hideInSearch: true,
      render: (_,record) => {
        return <div>{record.managerPhone?record.managerPhone:<span style={{ color:'red' }}>{record.managerPhone}（第1次注销）</span>}</div>
      }
    },
    {
      title: '团长数量',
      dataIndex: 'teamNum',
      align: 'center',
      hideInSearch: true,
      render: (_,data) => {
        return <a onClick={()=>{setRegimentVisible(true);setMsgDetail(data)}}>{_}</a> 
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
      title: '登录状态',
      dataIndex: 'loginStatus',
      align: 'center',
      hideInSearch: true,
      valueEnum: {
        0: '已禁用',
        1: '已启用'
      }
    },
    {
      title: '登录账号',
      dataIndex: 'accountName',
      align: 'center',
      fieldProps: {
        placeholder: '请输入子公司登录账号'
      }
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>([
        <a onClick={()=>{setVisible(true);setMsgDetail(data)}} key='edit'>编辑</a>,
        <a onClick={()=>{setResetVisible(true);setMsgDetail(data)}} key='reset'>重置密码</a>,
        <a onClick={()=>{setOnOffVisible(true);setMsgDetail(data)}} key='onOff'>{data?.loginStatus?'禁用登录':'启用登录'}</a>,
      ])
    },
  ]
  return (
    <PageContainer title={false}>
      <ProTable<TableProps>
        headerTitle='列表'
        rowKey="id"
        columns={tableColumns}
        request={subCompanyGetList}
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
      {
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
      }
      {
        enteringVisible&&
        <EnteringInformation
          visible={enteringVisible}
          setVisible={setEnteringVisible}
          msgDetail={msgDetail}
          callback={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
          onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
          type={1}
        />
      }
      {
        onOffVisible&&
        <OnOffModel
          visible={onOffVisible}
          setVisible={setOnOffVisible}
          msgDetail={msgDetail}
          callback={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
          onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
          type={1}
        />
      }
      {
        regimentVisible&&
        <HeadRegimentManagement
          visible={regimentVisible}
          setVisible={setRegimentVisible}
          listDetail={msgDetail}
          callback={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
          onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
        />
      }
    </PageContainer>
  )
}
