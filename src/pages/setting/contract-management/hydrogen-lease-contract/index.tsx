import { useState, useRef } from "react"
import ProTable from "@ant-design/pro-table"
import moment from "moment"

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from "antd"
import type { TableProps, LeaseContractProps } from "../data"

import { deviceContract } from "@/services/setting/contract-management"

const HydrogenLeaseContract: FC<LeaseContractProps> = (props: LeaseContractProps) => {
  const { type } = props
  const [memberPhone, setMemberPhone] = useState(JSON.parse(window.localStorage.getItem('managed') as string)?.memberPhone)
  const form = useRef<FormInstance>()
  window.localStorage.removeItem('managed')

  const tableHeader = {
    1: '租赁订单号',
    3: '托管订单号'
  }

  const columns: ProColumns<TableProps>[] = [
    {
      title: '序号',
      valueType: 'indexBorder'
    },
    {
      dataIndex: 'id',
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: '店主手机',
      dataIndex: 'memberPhone',
      align: 'center',
      initialValue: memberPhone
    },
    {
      title: '社区店ID',
      dataIndex: 'storeNo',
      align: 'center'
    },
    {
      title: '签订时间',
      dataIndex: 'signTime',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => r.signTime && moment(r.signTime).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '机器ID',
      dataIndex: 'imei',
      align: 'center'
    },
    {
      title: tableHeader[type],
      dataIndex: 'orderSn',
      align: 'center',
    },
    {
      title: '合同ID',
      dataIndex: 'contractId',
      align: 'center',
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
        params={{occupationMode: type}}
        request={deviceContract}
        pagination={{
          pageSize: 10,
          showQuickJumper: true
        }}
        formRef={form}
        options={false}
        search={{
          optionRender: (searchConfig, props, dom)=> [
            ...dom.reverse()
          ]
        }}
        onReset={()=> {
          setTimeout(()=> {
            setMemberPhone(undefined)
            form.current?.resetFields()
            form.current?.submit()
          }, 0)
        }}
      />
    </>
  )
}

export default HydrogenLeaseContract