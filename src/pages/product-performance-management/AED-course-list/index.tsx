import { useState } from 'react'
import ProTable from '@ant-design/pro-table'
import { Space } from 'antd'

import type { ProColumns } from '@ant-design/pro-table'

import PageContainer from '@/components/PageContainer'
import Export from '@/components/export'
import PaymentInfo from './payment-info'
import ModifyRecord from './modify-record'

export default () => {
  const [paymentVisible, setPaymentVisible] = useState<boolean>(false)
  const [modifyRecordVisible, setModifyRecordVisible] = useState<boolean>(false)
  
  const columns: ProColumns[] = [
    {
      title: '下单人手机号码',
      dataIndex: 'memberPhone',
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
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '订单状态',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '收款信息状态',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '收款人',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '银行卡号',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '开户行',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    }, 
    {
      title: '支行名称',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '手机号码',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r) => (
        <Space size='small'>
          <a onClick={()=>{setPaymentVisible(true)}}>修改收款信息</a>
          <a>修改记录</a>
        </Space>
      )
    }
  ]

   return (
    <PageContainer>
      <ProTable
        rowKey='id'
        columns={columns}
        // request={}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        options={false}
        search={{
          labelWidth: 160,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse(),
            <Export 
              key='export'
              type=''
              // conditions={getFieldsValue}
            />
          ]
        }}
      />
      {
        paymentVisible&&
        <PaymentInfo
          visible={paymentVisible}
          setVisible={setPaymentVisible}
        />
      }
      {
        modifyRecordVisible&&
        <ModifyRecord
          visible={modifyRecordVisible}
          setVisible={setModifyRecordVisible}
        />
      }
    </PageContainer>
   )
 }
 