import { useRef } from "react"
import ProTable from "@ant-design/pro-table"
import { history } from "umi"

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from "antd"
import type { TableProps } from "../data"

import { contractPage } from "@/services/setting/contract-management"
import { getPageQuery } from '@/utils/utils'

const HydrogenThirdpartnarContract: FC = () => {
  const form = useRef<FormInstance>()

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
      initialValue: getPageQuery().memberPhone
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
        onReset={async()=>{
          await new Promise<void>((resolve) => {
            getPageQuery().memberPhone && history.push('/setting/contract-management')
            resolve()
          }).then(()=> {
            form.current?.resetFields()
            form.current?.submit()
          })
        }}
      />
    </>
  )
}

export default HydrogenThirdpartnarContract