import React, { useState, useEffect, useRef } from 'react'
import { PageContainer } from '@/components/PageContainer'
import ProTable from '@/components/pro-table'

import { amountTransform } from '@/utils/utils'
import { refundPage } from '@/services/financial-management/transaction-detail-management'
import Detail from './detail-popup'
import { orderTypes } from '@/services/financial-management/common'
import Export from '@/components/export'

// after sales order detail
const AfterSalesOrderDetails = () =>{
  const [detailVisible, setDetailVisible] = useState(false)
  const [selectItem, setSelectItem] = useState(null)
  const [orderType, setOrderType] = useState(null)
  const formRef = useRef()

  useEffect(() => {
    orderTypes({}).then(res=> {
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
      title: '退方ID',
      dataIndex: 'accountId'
    },
    {
      title: '退方手机',
      dataIndex: 'accountMobile'
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
      dataIndex: 'tradeType',
      valueType: 'select',
      valueEnum: {
        'goodsAmountReturn': '货款回退',
        'platformCommissionReturn': '平台收益回退',
        'commissionReturn': '店铺收益回退',
        'suggestCommissionReturn': '店铺推荐收益回退',
        'feeReturn': '交易通道费回退',
        'agentCompanyCommissionReturn': '运营中心收益回退'
      },
      hideInTable: true
    },
    {
      title: '交易类型',
      dataIndex: 'tradeTypeName',
      hideInSearch: true
    },
    {
      title: '买家会员ID',
      dataIndex: 'buyerId',
      
    },
    {
      title: '买家手机',
      dataIndex: 'buyerMobile'
    },
    {
      title: '售后订单号',
      dataIndex: 'refundNo',
      
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      valueType: 'select',
      valueEnum: orderType
    },
    {
      title: '关联订单号',
      dataIndex: 'orderNo',
      
    },
    {
      title: '支付单号',
      dataIndex: 'payNo',
      render: (_, records) => (
        records?.id?
        <a onClick={() => { setSelectItem(records.id); setDetailVisible(true) }}>{_}</a>:
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
      render: (_)=> `￥${Math.abs(amountTransform(_, '/'))}`,
      hideInSearch: true
    },
    {
      title: '创建时间', 
      dataIndex: 'createTime',
      hideInSearch: true
    }
  ]
  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='id'
        scroll={{x: 2200}}
        columns={columns}
        toolBarRender={false}
        formRef={formRef}
        pagination={{
          pageSize:10,
          hideOnSinglePage: true,
          showQuickJumper: true
        }}
        search={{
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export
               type='financial-trans-refundPage'
              key='1'
              conditions={{...formRef.current?.getFieldsValue()}}
            />
          ]
        }}
        params={{}}
        request={refundPage}
      />
      {
        detailVisible &&
        <Detail
          id={selectItem}
          visible={detailVisible}
          setVisible={setDetailVisible}
        />
      }
    </PageContainer>
  )
}

export default AfterSalesOrderDetails
