import TimeSelect from '@/components/time-select'
import React, { useState, useEffect,useRef } from 'react'
import { PageContainer } from '@/components/PageContainer'
import ProTable from '@/components/pro-table'
import moment from 'moment'

import { amountTransform } from '@/utils/utils'
import { orderPage,exceptionOrderRefund } from '@/services/financial-management/transaction-detail-management'
import Detail from '../../common-popup/order-pay-detail-popup'
import { orderTypes, apply20, audit20 } from '@/services/financial-management/common'
import { Button, message, Popconfirm } from 'antd'
import Auth from '@/components/auth'
import RefundModel from './refund-model'
import Export from '@/components/export'

const OrderPayDetailManagement = () =>{
  const [detailVisible, setDetailVisible] = useState(false)
  const [selectItem, setSelectItem] = useState({})
  const [orderType, setOrderType] = useState(null)
  const [visible, setVisible] = useState(false);
  const [msgDatail,setMsgDatail] = useState({})
  const actRef = useRef()
  const formRef = useRef()
  
  useEffect(() => {
    orderTypes({}).then(res => {
      setOrderType(res.data)
    })
    return () => {
      setOrderType(null)
    }
  }, [])

  const getFieldsValue = () => {
    const { payTime, ...rest } = formRef.current?.getFieldsValue()
    return {
      begin: payTime&& moment(payTime?.[0]).format('YYYY-MM-DD'),
      end: payTime&& moment(payTime?.[1]).format('YYYY-MM-DD'),
      ...rest
    }
  }

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
      title: '支付单号',
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
      renderFormItem: () => <TimeSelect showTime={false}/>,
      hideInTable: true
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      hideInSearch: true,
    },
    {
      title: '退款申请',
      valueType: 'option',
      render:(_, r)=> (
        <>
          {
            (r.auditStatus === 0 || r.auditStatus === 4) && (r.refundAmount == 0) &&
            <Auth name="order/auditRecord/apply20">
              <Popconfirm
                title="确认操作?"
                okText="通过"
                cancelText="关闭"
                onConfirm={() => {
                  apply20({
                    objectId: r.orderNo,
                    payAmount: r.amount
                  }, { showSuccess: true })
                    .then(res => {
                      if (res.code === 0) {
                        actRef.current?.reload()
                      }
                    })
                }}
              >
                <a>退款申请</a>
              </Popconfirm>
            </Auth>
          }
          {
            (r.auditStatus === 3 && r.refundAmount == 0) &&
            <Auth name="order/auditRecord/audit20">
            <Popconfirm
              title="确认操作?"
              okText="通过"
              cancelText="拒绝"
              onConfirm={() => {
                audit20({
                  objectId: r.orderNo,
                  action: 'approve'
                }, { showSuccess: true })
                  .then(res => {
                    if (res.code === 0) {
                      actRef.current?.reload()
                    }
                  })
              }}
              onCancel={() => {
                audit20({
                  objectId: r.orderNo,
                  action: 'refuse'
                }, { showSuccess: true })
                  .then(res => {
                    if (res.code === 0) {
                      actRef.current?.reload()
                    }
                  })
              }}
            >
              <a>退款审核</a>
            </Popconfirm>
          </Auth>
          }
        </>
      ),
    }, 
  ]
  return (
    <PageContainer title={false}>
      <ProTable
        actionRef={actRef}
        rowKey='id'
        columns={columns}
        formRef={formRef}
        toolBarRender={false}
        scroll={{ x: 2100 }}
        pagination={{
          pageSize: 10,
          hideOnSinglePage: true,
          showQuickJumper: true
        }}
        search={{
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export
              type='financial-trans-orderPage'
              key='1'
              conditions={getFieldsValue}
            />
          ]
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
