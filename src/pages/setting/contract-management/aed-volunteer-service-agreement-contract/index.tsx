import ProTable from "@ant-design/pro-table"
import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { AedVolunteerServiceAgreementContract } from "../data"

import { contractList } from "@/services/setting/contract-management"

const HealthyLivingPavilionContract: FC = () => {

  const columns: ProColumns<AedVolunteerServiceAgreementContract>[] = [
    {
      title: '序号',
      valueType: 'indexBorder'
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '',
      dataIndex: 'phoneNumber',
      align: 'center',
      fieldProps: {
        placeholder: '请输入手机号'
      },
      hideInTable: true
    },
    {
      title: '下单人手机',
      dataIndex: 'phoneNumber',
      align: 'center',
      hideInSearch: true
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
      hideInSearch: true,
    },
    {
      title: '',
      dataIndex: 'contractId',
      align: 'center',
      fieldProps: {
        placeholder: '请输入合同ID'
      },
      hideInTable: true
    },
    {
      title: '法大大合同ID',
      dataIndex: 'contractId',
      align: 'center',
      hideInSearch: true,
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
    <ProTable<AedVolunteerServiceAgreementContract>
      rowKey='contractId'
      columns={columns}
      params={{}}
      request={contractList}
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
    />
  )
}

export default HealthyLivingPavilionContract