import { useState, useRef } from "react"
import ProTable from "@ant-design/pro-table"

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from "antd"
import type { TableProps } from "../data"

import { contractPage } from "@/services/setting/contract-management"

const ADEVolunteerContract: FC = () => {
  const form = useRef<FormInstance>()

  const columns: ProColumns<TableProps>[] = [
    {
      dataIndex: '',
      hideInTable: true,
      fieldProps: {
        placeholder: '请输入姓名或地址'
      }
    },
    {
      title: '序号',
      valueType: 'indexBorder'
    },
    {
      title: '下单时间',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '下单人手机',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '订单号',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '签订时间',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '合同ID',
      dataIndex: '',
      align: 'center',
      hideInSearch: true,
      render: (_, r)=> {
        if(r.contractUrl !== '') {
          return <a target="blank" href={`${r.contractUrl}`}>{_}</a>
        } else {
          return <span>{_}</span>
        }
      }
    }
  ]

  return (
    <>
      <ProTable<TableProps>
        rowKey='id'
        columns={columns}
        params={{}}
        // request={}
        pagination={{
          pageSize: 10,
          showQuickJumper: true
        }}
        formRef={form}
        options={false}
        search={{
          labelWidth: 120,
          optionRender: (searchConfig, props, dom)=> [
            ...dom.reverse()
          ]
        }}
      />
    </>
  )
}

export default ADEVolunteerContract