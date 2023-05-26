import React, { useState, useEffect,useRef } from 'react'
import { PageContainer } from '@/components/PageContainer'
import ProTable from '@/components/pro-table'

import { amountTransform } from '@/utils/utils'
import { orderPage,exceptionOrderRefund } from '@/services/financial-management/transaction-detail-management'
import Detail from '../../common-popup/order-pay-detail-popup'
import { orderTypes } from '@/services/financial-management/common'
import { Button, message } from 'antd'
import Auth from '@/components/auth'
import RefundModel from './refund-model'

const OrderPayDetailManagement = () =>{
  const [detailVisible, setDetailVisible] = useState(false)
  const [selectItem, setSelectItem] = useState({})
  const [orderType, setOrderType] = useState(null)
  const [visible, setVisible] = useState(false);
  const [msgDatail,setMsgDatail] = useState({})
  const ref=useRef()
  useEffect(() => {
    orderTypes({}).then(res => {
      setOrderType(res.data)
    })
    return () => {
      setOrderType(null)
    }
  }, [])

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '序号',
      dataIndex: 'serial',
      valueType: 'indexBorder'
    },
    {
      title: '支方会员ID',
      dataIndex: 'buyerSn',
      
    },
    {
      title: '支付渠道',
      dataIndex: 'payType',
      valueType: 'select',
      valueEnum: {
        'MONI_PAY': '模拟支付',
        'alipay': '汇付天下支付宝支付',
        'wx_lite': '汇付天下微信小程序支付'
      }
    },
    {
      title: '交易类型',
      dataIndex: 'salesOrderType',  
      valueEnum: {
        'deposit': '定金',
        'balance': '尾款',
        'full': '全款'
      }
    },
    {
      title: '收方会员ID',
      dataIndex: 'sellerSn'
    },
    {
      title: '收方手机',
      dataIndex: 'sellerMobile',
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      valueEnum: orderType
    },
    {
      title: '活动类型',
      dataIndex: 'activityTypeDesc',
      hideInSearch: true
    },
    {
      title: '订单号',
      dataIndex: 'orderNo',
      render: (_, records) => (
        records?.orderNo?
        <a onClick={() => { setSelectItem(records.orderNo); setDetailVisible(true); }}>{_}</a>:
        <span>{_}</span>
      )
    },
    {
      title: '平台单号',
      dataIndex: 'payNo',
      render: (_, records) => (
        records?.orderNo?
        <a onClick={() => { setSelectItem(records.orderNo); setDetailVisible(true); }}>{_}</a>:
        <span>{_}</span>
      )
    },
    {
      title: '资金流水号',
      dataIndex: 'transactionId',
      
    },
    {
      title: '支付金额',
      dataIndex: 'amount',
      render: (_)=> amountTransform(_, '/'),
      hideInSearch: true
    },
    {
      title: '退款金额',
      dataIndex: 'refundAmount',
      render: (_)=> amountTransform(_, '/'),
      hideInSearch: true
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      render:(text, record, _, action)=>[
        <Auth name="orderReturn/exceptionOrderRefund" key='refund' >
          <Button
          type='primary' 
          onClick={()=>{
            setVisible(true);
            setMsgDatail(record)
          }}
          style={{ display:parseInt(record?.refundAmount)>0?'none':'block' }}
          >
            退款
          </Button>
        </Auth>
      ],
    }, 
  ]
  return (
    <PageContainer title={false}>
      <ProTable
        actionRef={ref}
        rowKey='id'
        columns={columns}
        toolBarRender={false}
        scroll={{ x: 2100 }}
        pagination={{
          pageSize: 10,
          hideOnSinglePage: true,
          showQuickJumper: true
        }}
        params={{}}
        request={orderPage}
      />
      {
        detailVisible &&
        <Detail
          id={selectItem}
          visible={detailVisible}
          setVisible={setDetailVisible}
        />
      }
      {
        visible &&
        <RefundModel
          msgDatail={msgDatail}
          visible={visible}
          setVisible={setVisible}
          callback={()=>{ ref.current?.reload(), setMsgDatail(null) }}
          onClose={()=>{ ref.current?.reload(), setMsgDatail(null) }}
        />
      }
    </PageContainer>
  )
}

export default OrderPayDetailManagement
