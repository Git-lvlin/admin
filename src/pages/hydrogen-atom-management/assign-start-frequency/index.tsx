import { useState, useRef } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"
import { Button } from "antd"

import type { ProColumns,ActionType } from "@ant-design/pro-table"
import type { FormInstance } from "@ant-design/pro-form"
import type { TableProps } from "./data"

import { queryPage } from "@/services/hydrogen-atom-management/assign-start-frequency"
import AlterModel from "./alter-model"

export default ()=> {
  const [visible, setVisible] = useState<boolean>(false)
  const form = useRef<FormInstance>()
  const ref = useRef<ActionType>()
  const [msgDetail, setMsgDetail] = useState<TableProps>()

  const tableColumns: ProColumns<TableProps>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'memberPhone',
      align: 'center',
      fieldProps:{
        placeholder:'请输入手机号码'
      }
    },
    {
      title: '每日可启用次数',
      dataIndex: 'times',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '修改原因',
      dataIndex: 'modifyReason',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '操作人',
      dataIndex: 'creator',
      align: 'center',
      fieldProps:{
        placeholder:'请输入操作人'
      }
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '操作时间',
      dataIndex: 'dataRange',
      valueType:'dateTimeRange',
      align: 'center',
      hideInTable: true,
      fieldProps:{
        placeholder:['开始时间','结束时间']
      }
    },
    {
      title: '修改人',
      dataIndex: 'updater',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '操作',
      valueType:'option',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>{
        return <a onClick={() => { setVisible(true);setMsgDetail(data) }}>修改</a>
      }
    },
  ]

  return (
    <PageContainer title={false}>
      <ProTable<TableProps>
        rowKey="id"
        columns={tableColumns}
        request={queryPage}
        columnEmptyText={false}
        formRef={form}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        actionRef={ref}
        options={false}
        search={{
          optionRender: (searchConfig, props, dom)=> [
            ...dom.reverse(),
            <Button 
             onClick={()=>{
                setVisible(true)
             }}
             type='primary'
            >
             添加指定用户每日可启用氢原子次数
            </Button>
          ]
        }}
      />
      {
        visible&&
        <AlterModel
          visible={visible}
          setVisible={setVisible}
          callback={()=>{ ref?.current?.reload();setMsgDetail(null) }}
          onClose={()=>{ setMsgDetail(null) }}
          msgDetail={msgDetail}
        />
      }
    </PageContainer>
  )
}
