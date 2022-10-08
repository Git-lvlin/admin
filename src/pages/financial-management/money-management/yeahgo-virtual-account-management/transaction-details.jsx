import React, { useState, useRef, useEffect } from 'react'
import { PageContainer } from '@/components/PageContainer';
import ProTable from '@ant-design/pro-table'
import { useLocation, history } from "umi"
import { Button, Drawer } from 'antd'

import { logPage } from '@/services/financial-management/yeahgo-virtual-account-management'
import { orderTypes } from '@/services/financial-management/common'
import { amountTransform } from '@/utils/utils'
import { Export,ExportHistory } from '@/pages/export-excel'
import { tradeType } from '../../common-enum'
import Detail from '../../common-popup/order-pay-detail-popup'
import NormalOrderDetail from '@/pages/order-management/normal-order/detail'
import ShopkeeperOrderDetail from '@/pages/order-management/intensive-order/supplier-order/detail'
import NewShopkeeperOrderDetail from '../../common-popup/newShopkeeperOrderDetail'

const TransactionDetails = ({
  visible,
  setVisible,
  query
}) => {
  const [detailVisible, setDetailVisible] = useState(false)
  const [selectItem, setSelectItem] = useState({})
  const [normalOrderVisible, setNormalOrderVisible] = useState(false)
  const [shopkeeperOrderVisible, setShopkeeperOrderVisible] = useState(false)
  const [newShopkeeperOrderVisible, setNewShopkeeperOrderVisible] = useState(false)
  const [id, setId] = useState()
  const [visit, setVisit] = useState(false)
  const [orderType, setOrderType] = useState()
  const [types, setTypes] = useState()
  const actionform = useRef()

  const isPurchase = useLocation().pathname.includes('purchase')

  useEffect(() => {
    orderTypes({}).then(res=>{
      
      setOrderType(res.data)
    })
    return () => {
      setOrderType()
    }
  }, [])

  const skipToOrder = (id, type, orderType, billNo)=> {
    if(orderType === 'newCommandSalesOrder') {
      setId(billNo)
      setNewShopkeeperOrderVisible(true)
      setTypes(orderType)
    } else {
      if(type) {
        setId(id)
        setShopkeeperOrderVisible(true)
      } else {
        setId(id)
        setNormalOrderVisible(true)
      }
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
        'depositReturn': '保证金回退',
        'chargeFeeCommission': '服务费收益',
        'chargeFeeCommissionReturn': '服务费收益回退',
        'recharge': '充值',
        'rechargeReturn': '充值回退'
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
    } else if(query.accountId==='0') {
      return {
        'withdraw': '提现',
        'unfreeze': '解冻',
        'agentCompanyCommission': '运营中心收益',
        'chargeFeeCommission': '服务费收益',
        'recharge': '充值',
        'rechargeReturn': '充值回退'
      }
    }
  }

  const getValues = (form) => {
    return {
      accountId: query.accountId,
      accountType: query.accountType,
      amountType: query.amountType,
      begin: form?.getFieldValue().createTime?.[0],
      end: form?.getFieldValue().createTime?.[1],
      ...form?.getFieldValue()
    }
  }

  const columns = [
    {
      title: '序号',
      dataIndex:'id',
      width: '4%',
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
      dataIndex:'tradeTypeDesc',
      width: '7%',
      hideInSearch: true
    },
    {
      title: '订单类型',
      dataIndex:'orderType',
      valueType: 'select',
      valueEnum: orderType,
      hideInSearch: query.accountId==='platform' ? false : true,
      hideInTable: true
    },
    {
      title: '订单类型',
      dataIndex:'orderTypeDesc',
      hideInSearch: true,
      width: '7%',
      hideInTable: query.accountId==='platform' ? false : true
    },
    {
      title: '订单号',
      dataIndex:'billNo',
      width: '10%',
      render: (_, records) => (
        records.orderId ? 
        <a onClick={()=>skipToOrder(records.orderId, records.isWholesale, records.orderType, records.billNo)}>{_}</a>:
        <span>{_}</span>
      )
    },
    {
      title: '支付单号',
      dataIndex:'payNo',
      width: '10%',
      hideInSearch: query.accountId==='platformXinbao' ? true : false,
      hideInTable: query.accountId==='platformXinbao' ? true : false,
      render: (_, records)=> (
        records.payNoJumpParam ? 
        <a onClick={() => { setSelectItem(records.billNo); setDetailVisible(true); }}>{_}</a>:
        <span>{_}</span>
      )
    },
    {
      title: '资金流水号',
      dataIndex:'transactionId',
      width: '10%'
    },
    {
      title: '交易时间',
      dataIndex: 'createTime',
      width: '10%',
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
      width: '5%',
      render: (_) => amountTransform(Number(_), '/'),
      hideInSearch: true
    },
    {
      title: '手续费',
      dataIndex: 'fee',
      width: '5%',
      render: (_) => amountTransform(Number(_), '/'),
      hideInSearch: true
    },
    {
      title: '其他扣款',
      dataIndex: 'deductAmount',
      width: '5%',
      render: (_) => amountTransform(Number(_), '/'),
      hideInSearch: true
    },
    {
      title: '交易金额',
      dataIndex: 'changeAmount',
      width: '5%',
      render: (_) => amountTransform(Number(_), '/'),
      hideInSearch: true
    },
    {
      title: '交易后余额',
      dataIndex: 'balanceAmount',
      width: '5%',
      render: (_) => amountTransform(Number(_), '/'),
      hideInSearch: true
    },
    {
      title: '交易描述',
      dataIndex: 'description',
      width: '5%',
      hideInSearch: true
    }
  ]

  return (
    <Drawer
      visible={visible}
      onClose={()=>{setVisible(false)}}
      width={1400}
    >
      <ProTable
        rowKey='id'
        toolBarRender={false}
        pagination={{
          hideOnSinglePage: true,
          pageSize: 10,
          showQuickJumper: true
        }}
        scroll={{x: "max-content"}}
        columns={columns}
        params={{...query}}
        request={logPage}
        actionRef={actionform}
        search={{
          defaultCollapsed: false,
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
              conditions={()=> getValues(form)}
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
      {
        normalOrderVisible &&
        <NormalOrderDetail
          id={id}
          visible={normalOrderVisible}
          setVisible={setNormalOrderVisible}
          isPurchase={isPurchase}
          orderType={types}
        />
      }
      {
        shopkeeperOrderVisible &&
        <ShopkeeperOrderDetail
          id={id}
          visible={shopkeeperOrderVisible}
          setVisible={setShopkeeperOrderVisible}
        />
      }
      {
        newShopkeeperOrderVisible &&
        <NewShopkeeperOrderDetail
          id={id}
          orderType={types}
          visible={newShopkeeperOrderVisible}
          setVisible={setNewShopkeeperOrderVisible}
        />
      }
    </Drawer>
  )
}

export default TransactionDetails
