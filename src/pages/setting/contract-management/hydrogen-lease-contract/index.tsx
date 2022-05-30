import ProTable from "@ant-design/pro-table"
import moment from "moment"

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { TableProps } from "../data"

import { deviceContract } from "@/services/setting/contract-management"

const HydrogenLeaseContract: FC = () => {

  const columns: ProColumns<TableProps>[] = [
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
      title: '租赁订单号',
      dataIndex: 'orderSn',
      align: 'center'
    },
    {
      title: '合同ID',
      dataIndex: 'contractId',
      align: 'center'
    }
  ]

  return (
    <>
      <ProTable<TableProps>
        rowKey='storeNo'
        columns={columns}
        params={{}}
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