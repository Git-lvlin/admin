import TimeSelect from '@/components/time-select'
import React, { useState, useRef } from 'react'
import { PageContainer } from '@/components/PageContainer';
import ProTable from '@/components/pro-table'
import { useLocation, history } from "umi"
import { Drawer } from 'antd'

import { logPage } from '@/services/financial-management/yeahgo-virtual-account-management'
import { amountTransform } from '@/utils/utils'
import { tradeType } from '../../common-enum'
import NormalOrderDetail from '@/pages/order-management/normal-order/detail'
import ShopkeeperOrderDetail from '@/pages/order-management/intensive-order/supplier-order/detail'
import NewShopkeeperOrderDetail from '../../common-popup/newShopkeeperOrderDetail'
import NotGoodsOrderDetail from '../../common-popup/notGoodsOrderDetail'
import Export from "@/components/export"

const PaymentDetails = ({query, visible, setVisible, title}) => {
  const [normalOrderVisible, setNormalOrderVisible] = useState(false)
  const [shopkeeperOrderVisible, setShopkeeperOrderVisible] = useState(false)
  const [newShopkeeperOrderVisible, setNewShopkeeperOrderVisible] = useState(false)
  const [notGoodsVisible, setNotGoodsVisible] = useState(false)
  const [id, setId] = useState()
  const [types, setTypes] = useState()
  const form = useRef()

  const skipToOrder = (id, type, orderType, billNo)=> {
    const isGoodsOrder = orderType === 'settleChargeFee' || orderType === 'hydrogenRent' || orderType === 'hydrogenAgentRent' || orderType === 'recharge' || orderType === 'operatorEquipment' || orderType === 'experienceAuth' || orderType === 'healthyCard'

    if(isGoodsOrder) {
      if(orderType === 'healthyCard'){
        setId(billNo)
      } else {
        setId(id)
      }
      setNotGoodsVisible(true)
      setTypes(orderType)
    } else {
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
  }

  const getFieldsValue = () => {
    const { createTime, ...rest } = form.current?.getFieldsValue()
    return {
      begin: createTime?.[0].format('YYYY-MM-DD HH:mm:ss'),
      end: createTime?.[1].format('YYYY-MM-DD HH:mm:ss'),
      ...query,
      ...rest
    }
  }

  const columns = [ 
    {
      title: '序号',
      dataIndex:'id',
      hideInSearch: true,
      width: '4%',
      valueType: 'indexBorder'
    },
    {
      title: '虚拟子账户',
      dataIndex:'accountSn',
      width: '10%',
      hideInSearch: true,
    },
    {
      title: '交易类型',
      dataIndex:'tradeType',
      valueType: 'select',
      valueEnum: tradeType,
      hideInTable: true
    },
    {
      title: '交易类型',
      dataIndex:'tradeTypeDesc',
      width: '7%',
      hideInSearch: true
    },
    {
      title: '订单号',
      dataIndex:'billNo',
      width: '10%',
      render: (_, records)=> {
        if(records.orderType === 'hydrogenRent') {
          return <span>{_}</span>
        } else {
          if(records.orderId) {
            return(
              <a onClick={()=>skipToOrder(records.orderId, records.isWholesale, records.orderType, records.billNo)}>{_}</a>
            )
          } else {
            return <span>{_}</span>
          }
        }
       
      }
    },
    {
      title: '支付单号',
      dataIndex:'payNo',
    },
    {
      title: '资金流水号',
      dataIndex: 'transactionId',
      hideInSearch: true
    },
    {
      title: '交易时间',
      dataIndex: 'createTime',
      hideInSearch: true
    },
    {
      title: '交易时间',
      dataIndex: 'createTime',
      renderFormItem: () => <TimeSelect showTime={false}/>,
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
    // {
    //   title: '交易渠道',
    //   dataIndex: 'withdrawType',
    //   hideInSearch: true,
    //   hideInTable: title !== '社区店'
    // },
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
    <Drawer
      visible={visible}
      onClose={()=>{setVisible(false)}}
      width={1200}
      title={`${title}资金管理-收支明细（${title}id：${query.accountId}）`}
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
        formRef={form}
        search={{
          defaultCollapsed: false,
          optionRender: (search, props, dom)=> [
            ...dom.reverse(),
            <Export 
              key='export' 
              type="exportSupplierAccountLogList"
              conditions={getFieldsValue}
            />
          ]
        }}
      />
      {
        normalOrderVisible &&
        <NormalOrderDetail
          id={id}
          visible={normalOrderVisible}
          setVisible={setNormalOrderVisible}
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
      {
        notGoodsVisible &&
        <NotGoodsOrderDetail
          id={id}
          orderType={types}
          visible={notGoodsVisible}
          setVisible={setNotGoodsVisible}
        />
      }
    </Drawer>
  )
}

export default PaymentDetails
