import { useState, useRef } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from '@/components/pro-table'
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import type { TableProps } from "./data"

import { providerGetList } from "@/services/outpatient-service-management/digital-store-account-management"
import EditInformation from './edit-information'
import ResetPasswords from './reset-passwords'
import AddressCascader from '@/components/address-cascader'
import { Button } from "antd"
import AddAccount from './add-account'
import AddArea from './add-area'

export default function GenerationManagement () {
  const [editVisible, setEditVisible] = useState<boolean>(false)
  const [resetVisible, setResetVisible] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)
  const [areaVisible, setAreaVisible] = useState<boolean>(false)
  const [msgDetail, setMsgDetail] = useState<TableProps>()
  const ref = useRef<ActionType>()


  const tableColumns: ProColumns[] = [
    {
      title: 'ID',
      dataIndex: 'accountId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '名称',
      dataIndex: 'name',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '联系人姓名',
      dataIndex: 'contactName',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '联系人手机号',
      dataIndex: 'contactPhone',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '服务区域',
      dataIndex: 'areaAddress',
      align: 'center',
      hideInSearch: true
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
      title: '服务区域',
      dataIndex: 'serviceArea',
      renderFormItem: () => <AddressCascader changeOnSelect/>,
      hideInTable: true
    },
    {
      title: '启用状态',
      dataIndex: 'status',
      align: 'center',
      hideInSearch: true,
      valueEnum: {
        1: '启用',
        2: '禁用'
      }
    },
    {
      title: '门店数量',
      dataIndex: 'nums',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>([
        <a onClick={()=>{setEditVisible(true);setMsgDetail(data)}} key='edit'>编辑</a>,
        <a onClick={()=>{setResetVisible(true);setMsgDetail(data)}} key='reset'>重置密码</a>,
        // <a onClick={()=>{setAreaVisible(true);setMsgDetail(data) }} key='addArea'>添加区域</a>,
      ])
    },
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey="accountId"
        columns={tableColumns}
        request={providerGetList}
        columnEmptyText={false}
        actionRef={ref}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        options={false}
        search={{
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Button onClick={()=>{ setVisible(true) }}>添加</Button>
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
      {
        visible&&
        <AddAccount
          visible={visible}
          setVisible={setVisible}
          callback={()=>{ ref?.current?.reload();setMsgDetail(undefined)}}
        />
      }
       {
        areaVisible&&
        <AddArea
          visible={areaVisible}
          setVisible={setAreaVisible}
          msgDetail={msgDetail}
          callback={()=>{ ref?.current?.reload();setMsgDetail(undefined)}}
        />
      }
    </PageContainer>
  )
}
