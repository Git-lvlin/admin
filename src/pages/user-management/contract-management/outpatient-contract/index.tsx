import { useState, useEffect } from 'react'

import type { ProColumns } from '@ant-design/pro-table'

import ProTable from '@/components/pro-table'
import TimeSelect from '@/components/time-select'
import Export from '@/components/export'
import { orderContractPage, dict } from "@/services/setting/contract-management"

const OutpatientContract:React.FC = () => {
  const [type, setType] = useState<any[]>([])

  useEffect(()=> {
    dict({ type: 'businessType' }).then(res => {
      if(res.code === 0) {
        setType(res.data)
      }
    })
  }, [])

  const columns: ProColumns[] = [
    {
      title: '序号',
      valueType: 'indexBorder',
      hideInSearch: true
    },
    {
      title: '合同业务',
      dataIndex: 'businessType',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '合同业务',
      dataIndex: 'businessType',
      valueType: 'select',
      fieldProps: {
        options: type
      },
      hideInTable: true
    },
    {
      title: '合同编号',
      dataIndex: 'contractNo',
      align: 'center'
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '下单人手机号',
      dataIndex: 'phoneNumber',
      align: 'center'
    },
    {
      title: '下单用户ID',
      dataIndex: 'buyerId',
      align: 'center'
    },
    {
      title: '订单号',
      dataIndex: 'orderSn',
      align: 'center'
    },
    {
      title: '订单金额',
      dataIndex: 'payAmount',
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
      title: '签订时间',
      dataIndex: 'signTime',
      hideInTable: true,
      renderFormItem: () => <TimeSelect />
    },
    {
      title: '签订状态',
      dataIndex: 'contractStatus',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '签订状态',
      dataIndex: 'contractStatus',
      valueType: 'select',
      valueEnum: {
        0: '未签订',
        1: '已签订'
      },
      hideInTable: true
    },
    {
      title: '签订人姓名',
      dataIndex: 'personName',
      align: 'center'
    },
    {
      title: '签订人身份证号',
      dataIndex: 'idCard',
      align: 'center'
    },
    {
      title: '法大大合同ID',
      dataIndex: 'contractId',
      align: 'center',
      render: (_, r)=> {
        if(r.contractUrl) {
          return <a href={r.contractUrl} target='_blank' rel='noopener'>{_}</a>
        } else {
          return <span>{_}</span>
        }
      }
    }
  ]

  return (
    <ProTable
      columns={columns}
      params={{}}
      request={orderContractPage}
      search={{
        labelWidth: 120,
        optionRender: (search, props, dom) => [
          ...dom.reverse(),
          <Export
            key='1'
            type=''
            conditions={{}}
          />
        ]
      }}
      options={false}
    />
  )
}

export default OutpatientContract