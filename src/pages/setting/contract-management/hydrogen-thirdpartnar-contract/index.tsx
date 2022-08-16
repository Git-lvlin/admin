import ProTable from "@ant-design/pro-table"

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { TableProps } from "../data"

import { contractPage } from "@/services/setting/contract-management"

const HydrogenThirdpartnarContract: FC = () => {

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
      title: '代运营订单号',
      dataIndex: 'operatorOrderSn',
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

export default HydrogenThirdpartnarContract