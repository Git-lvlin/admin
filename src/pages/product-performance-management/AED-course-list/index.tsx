import { useState, useRef } from 'react'
import ProTable from '@ant-design/pro-table'
import { Space } from 'antd'
import moment from 'moment'

import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from "antd"
import type { ActionType } from '@ant-design/pro-table'

import PageContainer from '@/components/PageContainer'
import Export from '@/components/export'
import PaymentInfo from './payment-info'
import ModifyRecord from './modify-record'
import { bankCardInfoPage } from '@/services/product-performance-management/AED-course-list'

export default () => {
  const [paymentVisible, setPaymentVisible] = useState<boolean>(false)
  const [modifyRecordVisible, setModifyRecordVisible] = useState<boolean>(false)
  const [data, setData] = useState()
  const form = useRef<FormInstance>()
  const actRef = useRef<ActionType>()

  const getFieldsValue = () => {
    const {payTime, ...rest} = form.current?.getFieldsValue()
    return {
      startTime: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest
    }
  }
  
  const columns: ProColumns[] = [
    {
      title: '下单人手机号码',
      dataIndex: 'buyerMobile',
      align: 'center'
    },
    {
      title: '订单编号',
      dataIndex: 'orderSn',
      align: 'center',
      hideInSearch: true
    }, 
    {
      title: '支付时间',
      dataIndex: 'payTime', 
      align: 'center',
      hideInSearch: true
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      valueType: 'dateTimeRange',
      hideInTable: true
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      valueType: 'select',
      valueEnum: {
        2: '待发货',
        3: '已发货',
        4: '已完成'
      },
      hideInTable: true
    },
    {
      title: '收款信息状态',
      dataIndex: 'aedInfoStatusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '收款信息状态',
      dataIndex: 'aedInfoStatus',
      valueType: 'select',
      valueEnum: {
        0: '未填写',
        1: '已填写',
        2: '已修改'
      },
      hideInTable: true
    },
    {
      title: '收款人',
      dataIndex: 'realName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '银行卡号',
      dataIndex: 'cardNo',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '开户行',
      dataIndex: 'bankName',
      align: 'center',
      hideInSearch: true
    }, 
    {
      title: '支行名称',
      dataIndex: 'bankBranchName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '手机号码',
      dataIndex: 'mobile',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r) => (
        <Space size='small'>
          {
            r.aedInfoStatusDesc === '未填写' ?
            <span style={{color: '#d9d9d9'}}>修改收款信息</span>:
            <a onClick={()=>{setPaymentVisible(true); setData(r)}}>修改收款信息</a>
          }
           {
            r.aedInfoStatusDesc === '未填写' ?
            <span style={{color: '#d9d9d9'}}>修改记录</span>:
            <a onClick={()=>{setModifyRecordVisible(true); setData(r)}}>修改记录</a>
          }
        </Space>
      )
    }
  ]

   return (
    <PageContainer>
      <ProTable
        columns={columns}
        request={bankCardInfoPage}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        options={false}
        actionRef={actRef}
        search={{
          labelWidth: 160,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse(),
            <Export 
              key='export'
              type='exportAEDCoursesOrderInfoList'
              conditions={getFieldsValue}
            />
          ]
        }}
      />
      {
        paymentVisible&&
        <PaymentInfo
          visible={paymentVisible}
          setVisible={setPaymentVisible}
          data={data}
          callback={()=> actRef.current?.reload()}
        />
      }
      {
        modifyRecordVisible&&
        <ModifyRecord
          visible={modifyRecordVisible}
          setVisible={setModifyRecordVisible}
          data={data}
        />
      }
    </PageContainer>
   )
 }
 