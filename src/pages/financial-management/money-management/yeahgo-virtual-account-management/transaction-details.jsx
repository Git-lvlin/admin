import React, { useState, useRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { useLocation, history } from "umi"
import { Button } from 'antd'

import { logPage } from '@/services/financial-management/yeahgo-virtual-account-management'
import { amountTransform } from '@/utils/utils'
import { Export,ExportHistory } from '@/pages/export-excel'
import { tradeType } from '../../common-enum'
import Detail from '../../common-popup/order-pay-detail-popup'

const TransactionDetails = () => {
  const [detailVisible, setDetailVisible] = useState(false)
  const [selectItem, setSelectItem] = useState({})
  const {query} = useLocation()
  const [visit, setVisit] = useState(false)
  const actionform = useRef()

  const skipToOrder = (id, type)=> {
    switch(type) {
      case 'normalOrder':
      case 'second':
      case 'dropShipping1688':
        history.push(`/order-management/normal-order-detail/${id}`)
      break
      case 'commandSalesOrder':
      case 'activeSalesOrder':
      case 'commandCollect':
      case 'activeCollect':
        history.push(`/order-management/intensive-order/supplier-order-detail/${id}`)
      break
      default:
        return  history.push(`/order-management/normal-order-detail/${id}`)
    }
  }

  const skipToOrderPay = (id) => {
    history.push(`/financial-management/transaction-detail-management/order-pay-detail-management/detail/${id}`)
  }

  const transactionType = () =>{
    if(query.accountId==='platform') {
      return {
        'commission': '店主收益',
        'commissionReturn': '店主收益回退',
        'suggestCommission': '推荐店主收益',
        'suggestCommissionReturn': '推荐店主收益回退',
        'platformCommission': '平台收益',
        'platformCommissionReturn': '平台收益回退',
        'agentCompanyCommission': '运营中心收益',
        'agentCompanyCommissionReturn': '运营中心收益回退',
        'freeze': '冻结',
        'unfreeze': '解冻',
        'withdraw': '提现',
        'yeahCardRecharge': '约卡充值',
        'deposit': '保证金',
        'depositReturn': '保证金回退'
      }
    }else if(query.accountId==='platformFee'){
      return {
        'fee': '代收交易费',
        'feeReturn': '交易费退回'
      }
    }else if(query.accountId==='platformXinbao'){
      return {
        'recharge': '充值',
        'giveOut': '划扣'
      }
    }else if(query.accountId==='supplyChain'){
      return {
        'goodsAmount': '货款',
        'goodsAmountReturn': '货款回退'
      }
    }
  }

  const orderType = () => {
    if(query.accountId==='platform') {
      return {
        'second': '秒约订单',
        'commandSalesOrder': '集约批发订单',
        'dropShipping1688': '1688代发订单',
        'commandCollect': '集约销售订单',
        'blindBox': '盲盒订单',
        'signIn': '签到订单'
      }
    }
  }
  const columns = [
    {
      title: '序号',
      dataIndex:'id',
      hideInSearch: true,
      valueType: 'indexBorder'
    },
    {
      title: '交易类型',
      dataIndex:'tradeType',
      valueType: 'select',
      valueEnum: transactionType(),
      hideInTable: true
    },
    {
      title: '交易类型',
      dataIndex:'tradeType',
      valueType: 'select',
      valueEnum: tradeType,
      hideInSearch: true
    },
    {
      title: '订单类型',
      dataIndex:'orderType',
      valueType: 'select',
      valueEnum: orderType(),
      hideInSearch: query.accountId==='platform' ? false : true,
      hideInTable: query.accountId==='platform' ? false : true
    },
    {
      title: '订单号',
      dataIndex:'billNo',
      render: (_, records) => (
        records.orderId ? 
        <a onClick={()=>skipToOrder(records.orderId, records.orderType)}>{_}</a>:
        <span>{_}</span>
      )
    },
    {
      title: '支付单号',
      dataIndex:'payNo',
      hideInSearch: query.accountId==='platformXinbao' ? true : false,
      hideInTable: query.accountId==='platformXinbao' ? true : false,
      render: (_, records)=> (
        records.orderId ? 
        <a onClick={() => { setSelectItem(records.billNo); setDetailVisible(true); }}>{_}</a>:
        <span>{_}</span>
      )
    },
    {
      title: '资金流水号',
      dataIndex:'transactionId'
    },
    {
      title: '交易时间',
      dataIndex: 'createTime',
      hideInSearch: true
    },
    {
      title: '交易时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '分账金额',
      dataIndex: 'divideAmount',
      render: (_) => amountTransform(Number(_), '/'),
      hideInSearch: true
    },
    {
      title: '手续费',
      dataIndex: 'fee',
      render: (_) => amountTransform(Number(_), '/'),
      hideInSearch: true
    },
    {
      title: '其他扣款',
      dataIndex: 'deductAmount',
      render: (_) => amountTransform(Number(_), '/'),
      hideInSearch: true
    },
    {
      title: '交易金额',
      dataIndex: 'changeAmount',
      render: (_) => amountTransform(Number(_), '/'),
      hideInSearch: true
    },
    {
      title: '交易后余额',
      dataIndex: 'balanceAmount',
      render: (_) => amountTransform(Number(_), '/'),
      hideInSearch: true
    },
    {
      title: '交易描述',
      dataIndex: 'description',
      hideInSearch: true
    }
  ]
  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='id'
        toolBarRender={false}
        pagination={{
          hideOnSinglePage: true,
          pageSize: 10,
          showQuickJumper: true
        }}
        columns={columns}
        params={{...query}}
        request={logPage}
        actionRef={actionform}
        search={{
          optionRender: ({searchText, resetText}, {form}) => [
            <Button
              key="search"
              type="primary"
              onClick={() => {
                form?.submit()
              }}
            >
              {searchText}
            </Button>,
            <Button
              key="rest"
              onClick={() => {
                form?.resetFields()
                form?.submit()
              }}
            >
              {resetText}
            </Button>,
            <Export
              change={(e)=> {setVisit(e)}}
              key="export" 
              type="financial-account-log-page-export"
              conditions={
                {
                  accountId: query.accountId,
                  accountType: query.accountType,
                  amountType: query.amountType,
                  begin: form?.getFieldValue().createTime?.[0],
                  end: form?.getFieldValue().createTime?.[1],
                  ...form?.getFieldValue()
                }
              }
            />,
            <ExportHistory
              key="exportHistory"
              show={visit}
              setShow={setVisit}
              type="financial-account-log-page-export"
            />
          ],
        }}
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

export default TransactionDetails
