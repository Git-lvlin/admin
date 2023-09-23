import { useRef } from 'react'
import moment from 'moment'

import type { ProColumns,ActionType } from "@ant-design/pro-table"
import { message } from 'antd'
import type { FormInstance } from "antd"

import ProTable from '@/components/pro-table'
import TimeSelect from '@/components/time-select'
import { ipoHistoryMonth, ipoNotice } from '@/services/outpatient-service-management/ipo-gift-management'
import Export from '@/components/export'
import RangeNumberInput from '@/components/range-number-input'
import { amountTransform } from '@/utils/utils'

const ShopHistoryIpoPrize:React.FC = () => {
  const form = useRef<FormInstance>()
  const ref= useRef<ActionType>()

  const getFieldsValue = () => {
    const { dateRange, orderNums, ...rest } = form.current?.getFieldsValue()
    return {
      ...rest,
      noticeStartTime: dateRange?.[0] && moment(dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      noticeEndTime: dateRange?.[1] && moment(dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss'),
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
      title: '合同状态',
      dataIndex: 'contractStatus',
      valueType: 'select',
      valueEnum: {
        1: '已签订',
        2: '未签订',
      },
      hideInTable: true,
    },
    {
      title: '业绩月份',
      dataIndex: 'months',
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
      dataIndex: 'ipoStatus',
      valueType: 'select',
      valueEnum: {
        1: '已领取',
        2: '未领取'
      },
      hideInTable: true
    },
    {
      title: '通知时间',
      dataIndex: 'dateRange',
      align: 'center',
      hideInTable: true,
      renderFormItem: ()=> <TimeSelect />
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        1: '待通知',
        2: '待支付',
        3: '待签订',
        4: '已领取',
        10: '已过期',
      },
      hideInTable: true
    },
    {
      title: 'IPO领取状态',
      dataIndex: 'ipoStatusDesc',
      hideInSearch: true
    },
    {
      title: '状态',
      dataIndex: 'statusDesc',
      hideInSearch: true
    },
    {
      title: 'IPO奖金额(元)',
      dataIndex: 'amount',
      align: 'center',
      hideInSearch: true,
      render: (_) => {
        return amountTransform(_,'/').toFixed(2)
      }
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
    },
    {
      title: '通知时间',
      dataIndex: 'noticeTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: 'IPO合同签订状态',
      dataIndex: 'contractStatusDesc',
      align: 'center', 
      hideInSearch: true,
    },
    {
      title: 'IPO合同ID',
      dataIndex: 'contractId',
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
      dataIndex: 'payStatusDesc',
      hideInSearch: true,
    },
    {
      title: 'IPO合同费订单号',
      dataIndex: 'orderSn',
      hideInSearch: true
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      render:(text, record, _, action)=>{
        if(record?.awardId){
          return  <a key='detail' onClick={()=>{ 
            ipoNotice({ awardId: record.awardId }).then(res=>{
              if(res.code==0){
                ref.current?.reload()
                message.success('操作成功')
              }
            })
  
          }}>通知<br/>领取</a>
        }else{
          return ''
        }
      }
    }, 
  ]

  return (
      <ProTable
        rowKey='id'
        columns={columns}
        options={false}
        params={{}}
        formRef={form}
        request={ipoHistoryMonth}
        search={{
          labelWidth: 120,
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export
              key='1'
              type='ipoHistoryMonth'
              conditions={getFieldsValue}
            />
          ]
        }}
      />
  )
}

export default ShopHistoryIpoPrize