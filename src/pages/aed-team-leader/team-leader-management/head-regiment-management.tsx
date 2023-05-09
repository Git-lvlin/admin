import { useState, useRef } from "react"
import ProTable from "@ant-design/pro-table"
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import type { TableProps } from "./data"
import EnteringInformation from './entering-information'
import ForbiddenModel from './forbidden-model'
import OperatingRecord from './operating-record'
import {
    DrawerForm
  } from '@ant-design/pro-form';

import { subsidiaryList } from "@/services/aed-team-leader/team-leader-management"
import { Button } from "antd"
import type { RegimentProps } from "./data"

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

export default function TransactionData (props:RegimentProps) {
  const { visible, setVisible, listDetail,onClose} = props;
  const [enteringVisible, setEnteringVisible] = useState<boolean>(false)
  const [forbiddenVisible, setForbiddenVisible] = useState<boolean>(false)
  const [recordVisible, setRecordVisible] = useState<boolean>(false)
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
      title: '团长手机号',
      dataIndex: 'phone',
      align: 'center',
      fieldProps: {
        placeholder: '请输入团长手机号码'
      }
    },
    {
      title: '团长用户ID',
      dataIndex: 'buyerId',
      valueType: 'text',
      hideInTable: true,
    },
    {
      title: '用户ID',
      dataIndex: 'buyerId',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '团长姓名',
      dataIndex: 'name',
      align: 'center',
      fieldProps: {
        placeholder: '请输入团长姓名'
      }
    },
    {
      title: '团长类型',
      dataIndex: 'typeDesc',
      align: 'center',
      hideInSearch: true
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
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>([
        <a onClick={()=>{setForbiddenVisible(true);setMsgDetail(data)}} key='forbidden'>{data?.status?'禁用业绩计算':'启用业绩计算'}</a>,
        <a onClick={()=>{setRecordVisible(true);setMsgDetail(data)}} key='record'>操作记录</a>,
      ])
    },
  ]
  return (
    <DrawerForm
      layout="horizontal"
      title='首页  /  AED 子公司  /  子公司管理 / 团长管理'
      onVisibleChange={setVisible}
      visible={visible}
      width={1400}
      drawerProps={{
      forceRender: true,
      destroyOnClose: true,
      onClose: () => {
        onClose();
      }
      }}
      submitter={{
      render: (props, defaultDoms) => {
        return [];
      },
      }}
      {...formItemLayout}    
    >
      <p>子公司名称：{listDetail?.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 类型：{listDetail?.typeDesc}</p>
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
        params={{
          subId: listDetail?.id
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
        enteringVisible&&
        <EnteringInformation
          visible={enteringVisible}
          setVisible={setEnteringVisible}
          msgDetail={msgDetail}
          callback={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
          onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
          name={listDetail?.name}
          type={0}
          subId={listDetail?.id}
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
      {
        recordVisible&&
        <OperatingRecord
          visible={recordVisible}
          setVisible={setRecordVisible}
          msgDetail={msgDetail}
          callback={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
          onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
        />
      }
    </DrawerForm >
  )
}
