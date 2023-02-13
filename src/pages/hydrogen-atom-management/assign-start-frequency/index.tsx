import { useState, useRef } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"
import { Button } from "antd"

import type { ProColumns,ActionType } from "@ant-design/pro-table"
import type { FormInstance } from "@ant-design/pro-form"
import type { TableProps } from "./data"

import { findMemberDevicePage } from "@/services/hydrogen-atom-management/transaction-data"
import AlterModel from "./alter-model"
import { getPageQuery } from "@/utils/utils"

export default ()=> {
  const [visible, setVisible] = useState<boolean>(false)
  const form = useRef<FormInstance>()
  const ref = useRef<ActionType>()


  const tableColumns: ProColumns<TableProps>[] = [
    {
      title: 'ID',
      dataIndex: 'memberId',
      align: 'center',
      initialValue: getPageQuery().memberId,
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
      dataIndex: 'icon',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '修改原因',
      dataIndex: 'nickName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '操作人',
      dataIndex: 'userType',
      align: 'center',
      fieldProps:{
        placeholder:'请输入操作人'
      }
    },
    {
      title: '操作时间',
      dataIndex: 'storeNo',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '操作时间',
      dataIndex: 'storeNo',
      valueType:'dateTimeRange',
      align: 'center',
      hideInTable: true,
      fieldProps:{
        placeholder:['开始时间','结束时间']
      }
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable<TableProps>
        rowKey="memberId"
        columns={tableColumns}
        request={findMemberDevicePage}
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
             修改指定用户每日可启用氢原子次数
            </Button>
          ]
        }}
      />
      {
        visible&&
        <AlterModel
          visible={visible}
          setVisible={setVisible}
          callback={()=>{ ref?.current?.reload() }}
        />
      }
    </PageContainer>
  )
}
