import { useState, useRef } from 'react'
import moment from 'moment'

import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import ProTable from '@/components/pro-table'
import { ipoCurrMonth } from '@/services/outpatient-service-management/ipo-gift-management'
import Export from '@/components/export'
import RangeNumberInput from '@/components/range-number-input'

const ShopMonthIPOPrize:React.FC = () => {
  const [visible, setVisible] = useState(false)
  const form = useRef<FormInstance>()

  const getFieldsValue = () => {
    const { orderNums, ...rest } = form.current?.getFieldsValue()
    return {
      ...rest,
      min: orderNums && orderNums?.min,
      max: orderNums && orderNums?.max,
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
      dataIndex: 'orderNums',
      align: 'center',
      renderFormItem: () => <RangeNumberInput beforePlaceholder='最少单数' afterPlaceholder='最多单数'/>,
      hideInTable: true
    },
    {
      title: '状态',
      dataIndex: 'statusDesc',
      hideInSearch: true
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        1: '待合格',
        3: '待到期',
      },
      hideInTable: true
    },
    {
      title: 'IPO奖金额(元)',
      dataIndex: 'amountDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '业绩月份',
      dataIndex: 'months',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '订单直推成功单数',
      dataIndex: 'orderNums',
      align: 'center',
      hideInSearch: true,
      render: (_) => {
        if(_) {
            return <a onClick={()=>{  }}>{_}</a>
          } else {
            return <span>{_}</span>
          }
      }
    }
  ]

  return (
      <ProTable
        rowKey='memberId'
        columns={columns}
        options={false}
        formRef={form}
        request={ipoCurrMonth}
        search={{
          labelWidth: 120,
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export
              key='1'
              type='ipoCurrMonth'
              conditions={getFieldsValue}
            />
          ]
        }}
      />
  )
}

export default ShopMonthIPOPrize