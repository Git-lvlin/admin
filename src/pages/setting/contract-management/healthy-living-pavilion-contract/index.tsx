import { useState, useRef } from "react"
import ProTable from "@ant-design/pro-table"
import moment from 'moment'

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from "antd"
import type { HealthyLivingPavilionProps } from "../data"

import { MemberLifeHouse } from "@/services/setting/contract-management"

const HealthyLivingPavilionContract: FC = () => {
  const [storeId, setStoreId] = useState(JSON.parse(window.localStorage.getItem('managed') as string)?.storeId)
  const form = useRef<FormInstance>()

  const columns: ProColumns<HealthyLivingPavilionProps>[] = [
    {
      title: '序号',
      valueType: 'indexBorder'
    },
    {
      title: '店主手机',
      dataIndex: 'memberPhone',
      align: 'center'
    },
    {
      title: '社区店ID',
      dataIndex: 'storeId',
      align: 'center',
      initialValue: storeId,
    },
    {
      title: '签订时间',
      dataIndex: 'signTime',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => moment(r.signTime * 1000).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '开通生活馆缴费单号',
      dataIndex: 'businessId',
      align: 'center'
    },
    {
      title: '合同ID',
      dataIndex: 'contractId',
      align: 'center',
      render: (_, r)=> {
        if(r.contractUrl) {
          return <a target="_blank" href={`${r.contractUrl}`}>{_}</a>
        } else {
          return <span>{_}</span>
        }
      }
    }
  ]

  return (
    <ProTable<HealthyLivingPavilionProps>
      rowKey='id'
      columns={columns}
      params={{}}
      request={MemberLifeHouse}
      pagination={{
        pageSize: 10,
        showQuickJumper: true
      }}
      options={false}
      search={{
        labelWidth: 140,
        optionRender: (searchConfig, props, dom)=> [
          ...dom.reverse()
        ]
      }}
      onReset={()=>{
        setTimeout(()=> {
          setStoreId(undefined)
          form.current?.resetFields()
          form.current?.submit()
        }, 0)
      }}
    />
  )
}

export default HealthyLivingPavilionContract