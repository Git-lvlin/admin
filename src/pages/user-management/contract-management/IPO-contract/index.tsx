import { useRef } from "react"
import moment from 'moment'

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from "antd"

import ProTable from '@/components/pro-table'
import { contractList } from "@/services/setting/contract-management"
import Export from '@/components/export'

const IPOContract: FC = () => {
  const form = useRef<FormInstance>()

  const getFiledsValue = () => {
    const { months, ...rest } = form.current?.getFieldsValue()
    return {
      orderType: 36,
      months: months && moment(months).format('YYYYMM'),
      ...rest
    }
  }

  const columns: ProColumns[] = [
    {
      title: '序号',
      valueType: 'indexBorder' 
    },
    {
      title: '业绩所属月份',
      dataIndex: 'months',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '业绩所属月份',
      dataIndex: 'months',
      valueType: 'dateMonth',
      hideInTable: true
    },
    {
      title: '销售人手机号',
      dataIndex: 'phoneNumber',
      align: 'center'
    },
    {
      title: 'IPO奖金金额(元)',
      dataIndex: 'rewardNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '签订时间',
      dataIndex: 'signTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '签订状态',
      dataIndex: 'contractStatus',
      valueType: 'select',
      valueEnum: {
        1: '已签订',
        0: '未签订'
      },
      hideInTable: true
    },
    {
      title: '签订状态',
      dataIndex: 'contractStatus',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '签订人姓名',
      dataIndex: 'personName',
      align: 'center',
    }, 
    {
      title: '签订人身份证号',
      dataIndex: 'idCard',
      align: 'center',
    },
    {
      title: '法大大合同ID',
      dataIndex: 'contractId',
      align: 'center',
      render: (_, r)=> {
        if(r.contractUrl) {
          return <a target="blank" href={`${r.contractUrl}`}>{_}</a>
        } else {
          return <span>{_}</span>
        }
      }
    }
  ]

  return (
    <ProTable
      columns={columns}
      params={{ orderType: 36 }}
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
          ...dom.reverse(),
          <Export
            key='export'
            type='orderContractPageIpo'
            conditions={getFiledsValue()}
          />
        ]
      }}
    />
  )
}

export default IPOContract