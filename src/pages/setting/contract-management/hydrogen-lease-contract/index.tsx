import ProTable from "@ant-design/pro-table"
import moment from "moment"

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { TableProps, LeaseContractProps } from "../data"

import { deviceContract } from "@/services/setting/contract-management"

const HydrogenLeaseContract: FC<LeaseContractProps> = (props: LeaseContractProps) => {
  const { type } = props

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
      align: 'center'
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
        options={false}
        search={{
          optionRender: (searchConfig, props, dom)=> [
            ...dom.reverse()
          ]
        }}
      />
    </>
  )
}

export default HydrogenLeaseContract