import { useState, useRef } from 'react'
import moment from 'moment'

import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import ProTable from '@/components/pro-table'
import { providerList } from '@/services/outpatient-service-management/county-service-providers-management'
import Export from '@/components/export'
import RangeNumberInput from '@/components/range-number-input'

const ShopMonthIPOPrize:React.FC = () => {
  const [visible, setVisible] = useState(false)
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
      title: '状态',
      dataIndex: 'contractStatus',
      valueType: 'select',
      valueEnum: {
        1: '待合格',
        2: '待到期',
      },
      hideInSearch: true
    },
    {
      title: '状态',
      dataIndex: 'contractStatus',
      valueType: 'select',
      valueEnum: {
        1: '待合格',
        2: '待到期',
      },
      hideInTable: true
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
    }
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

export default ShopMonthIPOPrize