import { useState, useRef } from 'react'
import moment from 'moment'

import type { ProColumns,ActionType } from "@ant-design/pro-table"
import { message } from 'antd'
import type { FormInstance } from "antd"

import ProTable from '@/components/pro-table'
import TimeSelect from '@/components/time-select'
import { ipoProviderDirectAward, ipoProviderAward, ipoNotice } from '@/services/outpatient-service-management/ipo-gift-management'
import Export from '@/components/export'
import { amountTransform } from '@/utils/utils'

const IPOPrize = (props:{ activeKey:string }) => {
  const { activeKey } = props
  const form = useRef<FormInstance>()
  const ref= useRef<ActionType>()

  const getFieldsValue = () => {
    const { serviceArea, recheckTime, dateRange, ...rest } = form.current?.getFieldsValue()
    return {
      ...rest,
      finishStartTime: recheckTime?.[0] && moment(recheckTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      finishEndTime: recheckTime?.[1] && moment(recheckTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      noticeStartTime: dateRange?.[0] && moment(dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      noticeEndTime: dateRange?.[1] && moment(dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss'),
    }
  }

  const columns: ProColumns[] = [
    {
      title: '领取人手机号',
      dataIndex: 'memberPhone',
      align: 'center'
    },
    {
      title: '服务商编号',
      dataIndex: 'houseNumber',
      align: 'center',
      hideInTable: true
    },
    {
      title: '复审时间',
      dataIndex: 'recheckTime',
      align: 'center',
      hideInTable: true,
      renderFormItem: ()=> <TimeSelect />
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
      title: '下单人手机号',
      dataIndex: 'buyerPhone',
      align: 'center',
      hideInTable: true,
    },
    {
      title: '通知时间',
      dataIndex: 'dateRange',
      align: 'center',
      hideInTable: true,
      renderFormItem: ()=> <TimeSelect />
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
      title: 'IPO领取状态',
      dataIndex: 'ipoStatusDesc',
      hideInSearch: true
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
      title: '服务区域',
      dataIndex: 'area',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '服务商下单手机号',
      dataIndex: 'buyerPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '复审时间',
      dataIndex: 'finishTime',
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
      dataIndex: 'contractStatus',
      align: 'center', 
      hideInSearch: true,
      valueType: 'select',
      valueEnum: {
        1: '未签订',
        2: '已签订',
      },
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
      title: 'IPO合同费订单状态',
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
      fixed: 'right',
      valueType: 'option',
      align: 'center', 
      width: 100,
      render:(text, record, _, action)=>{
        if(record.status == 1){
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
        formRef={form}
        actionRef={ref}
        request={activeKey=='1'?ipoProviderDirectAward:ipoProviderAward}
        search={{
          labelWidth: 120,
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export
              key='1'
              type={activeKey=='1'?'ipoProviderDirectAward':'ipoProviderAward'}
              conditions={getFieldsValue}
            />
          ]
        }}
      />
  )
}

export default IPOPrize