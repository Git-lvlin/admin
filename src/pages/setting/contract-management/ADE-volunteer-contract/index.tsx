import { useRef } from "react"
import ProTable from "@ant-design/pro-table"

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from "antd"
import type { TableProps } from "../data"

import { contractList } from "@/services/setting/contract-management"

const ADEVolunteerContract: FC = () => {
  const form = useRef<FormInstance>()

  const columns: ProColumns<TableProps>[] = [
    {
      title: '序号',
      valueType: 'indexBorder'
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '下单人手机',
      dataIndex: 'phoneNumber',
      align: 'center'
    },
    {
      title: '订单号',
      dataIndex: 'orderSn',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '签订时间',
      dataIndex: 'signTime',
      align: 'center',
      hideInSearch: true
    },
    // {
    //   title: '签订状态',
    //   dataIndex: '',
    //   align: 'center',
    // },
    // {
    //   title: '签订人姓名',
    //   dataIndex: '',
    //   align: 'center',
    // },
    // {
    //   title: '签订人身份证号',
    //   dataIndex: '',
    //   align: 'center',
    // },
    {
      title: '法大大合同ID',
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
    <ProTable<TableProps>
      columns={columns}
      params={{
        orderType: 2,
        subType: 25
      }}
      request={contractList}
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
  )
}

export default ADEVolunteerContract