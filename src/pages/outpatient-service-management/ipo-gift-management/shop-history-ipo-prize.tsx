import { useState, useRef } from 'react'
import moment from 'moment'

import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import ProTable from '@/components/pro-table'
import TimeSelect from '@/components/time-select'
import { providerList } from '@/services/outpatient-service-management/county-service-providers-management'
import Export from '@/components/export'
import RangeNumberInput from '@/components/range-number-input'

const ShopHistoryIpoPrize:React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [id, setId] = useState<string>()
  const form = useRef<FormInstance>()

  const getFieldsValue = () => {
    const { serviceArea, signTime, ...rest } = form.current?.getFieldsValue()
    return {
      ...rest,
      signStartTime: signTime && moment(signTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      signEndTime: signTime && moment(signTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      provinceId: serviceArea && serviceArea?.[0].value,
      cityId: serviceArea && serviceArea?.[1].value,
      areaId: serviceArea && serviceArea?.[2].value,
    }
  }

  const columns: ProColumns[] = [
    {
      title: '领取人手机号',
      dataIndex: 'memberPhone',
      align: 'center'
    },
    {
      title: '订单直推成功单数',
      dataIndex: 'memberId',
      align: 'center',
      renderFormItem: () => <RangeNumberInput beforePlaceholder='最少单数' afterPlaceholder='最多单数'/>,
      hideInTable: true
    },
    {
      title: '合同状态',
      dataIndex: 'contractStatus',
      valueType: 'select',
      valueEnum: {
        1: '未签订',
        2: '已签订',
      },
      hideInTable: true,
    },
    {
      title: '业绩月份',
      dataIndex: 'month',
      valueType: 'select',
      valueEnum: {
        1: '2023-07',
        2: '2023-08',
        3: '2023-09',
        4: '2023-10',
        5: '2023-11',
        6: '2023-12',
      },
      hideInTable: true,
    },
    {
      title: 'IPO领取状态',
      dataIndex: 'contractStatus',
      valueType: 'select',
      valueEnum: {
        1: '已领取',
        2: '未领取'
      },
      hideInTable: true
    },
    {
      title: '通知时间',
      dataIndex: 'voucherNum',
      align: 'center',
      hideInTable: true,
      renderFormItem: ()=> <TimeSelect />
    },
    {
      title: '状态',
      dataIndex: 'contractStatus',
      valueType: 'select',
      valueEnum: {
        1: '待通知',
        2: '待支付',
        3: '待签订',
        4: '已领取',
        5: '已过期',
      },
      hideInTable: true
    },
    {
      title: 'IPO领取状态',
      dataIndex: 'contractStatus',
      valueType: 'select',
      valueEnum: {
        1: '已领取',
        2: '未领取'
      },
      hideInSearch: true
    },
    {
      title: '状态',
      dataIndex: 'contractStatus',
      valueType: 'select',
      valueEnum: {
        1: '待通知',
        2: '待支付',
        3: '待签订',
        4: '已领取',
        5: '已过期',
      },
      hideInSearch: true
    },
    {
      title: 'IPO奖金额(元)',
      dataIndex: 'memberId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '业绩月份',
      dataIndex: 'serviceArea',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '订单直推成功单数',
      dataIndex: 'signTime',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.contractUrl) {
            return <a onClick={()=>{  }}>{_}</a>
          } else {
            return <span>{_}</span>
          }
      }
    },
    {
      title: '通知时间',
      dataIndex: 'voucherNum',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: 'IPO合同签订状态',
      dataIndex: 'offlineAmountDesc',
      align: 'center', 
      hideInSearch: true,
      valueType: 'select',
      valueEnum: {
        1: '待通知',
        2: '待支付',
        3: '待签订',
        4: '已领取',
        5: '已过期',
      },
    },
    {
      title: 'IPO合同ID',
      dataIndex: 'signTime',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.contractUrl) {
            return <a href={r.contractUrl} target='_blank' referrerPolicy='no-referrer'>{_}</a>
          } else {
            return <span>{_}</span>
          }
      }
    },
    {
      title: 'IPO合同费订单支付状态',
      dataIndex: 'signTime',
      hideInSearch: true,
      valueType: 'select',
      valueEnum: {
        1: '已支付',
        2: '未支付',
      },
    },
    {
      title: 'IPO合同费订单号',
      dataIndex: 'contractStatus',
      hideInSearch: true
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      render:(text, record, _, action)=>[
        <a key='detail' onClick={()=>{  }}>通知<br/>领取</a>
      ],
    }, 
  ]

  return (
      <ProTable
        columns={columns}
        options={false}
        params={{}}
        formRef={form}
        request={providerList}
        search={{
          labelWidth: 120,
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export
              key='1'
              type='providerList'
              conditions={getFieldsValue}
            />
          ]
        }}
      />
  )
}

export default ShopHistoryIpoPrize