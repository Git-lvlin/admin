import { useState, useRef } from "react"
import ProTable from "@ant-design/pro-table"

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from "antd"
import type { TableProps } from "../data"

import { contractPage } from "@/services/setting/contract-management"

const HydrogenThirdpartnarContract: FC = () => {
  const [memberPhone, setMemberPhone] = useState(JSON.parse(window.localStorage.getItem('managed') as string)?.memberPhone)
  const form = useRef<FormInstance>()

  // const memberPhone = JSON.parse(window.localStorage.getItem('managed') as string).memberPhone
  window.localStorage.removeItem('managed')

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
      dataIndex: 'contractSignTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '机器ID',
      dataIndex: 'imei',
      align: 'center'
    },
    {
      title: '开通资质交易单号',
      dataIndex: 'payOrderNo',
      align: 'center',
    },
    {
      title: '签订状态',
      dataIndex: '',
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
        params={{}}
        request={contractPage}
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
        onReset={()=>{
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

export default HydrogenThirdpartnarContract