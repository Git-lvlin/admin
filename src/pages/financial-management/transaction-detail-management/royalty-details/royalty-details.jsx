import React, { useEffect, useState } from 'react'
import { useParams, history, useLocation } from 'umi'
import ProDescriptions from '@ant-design/pro-descriptions'
import { PageContainer } from '@/components/PageContainer';

import { amountTransform } from '@/utils/utils'
import { 
  commissionDetail, 
  platformCommissionDetail, 
  goodsAmountDetail, 
  operationCommissionDetail
} from "@/services/financial-management/transaction-detail-management"
import { orderTypes } from '@/services/financial-management/common'
import './styles.less'
import styles from './styles.less'
import { fashionableType } from '../../common-function'

const TransactionDetails = () => {
  const {id} = useParams()
  const {query} = useLocation()
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState({})
  const [payInfos, setPayInfos] = useState([])
  const [orderType, setOrderType] = useState(null)

  useEffect(() => {
    orderTypes({}).then(res=>{
      setOrderType(res.data)
    })
    return () => {
      setOrderType(null)
    }
  }, [])

  const apiMethod = query?.type === 'bonus' ? commissionDetail:
  (query?.type === 'commission') ? platformCommissionDetail:
  (query?.type === 'loan') ? goodsAmountDetail : 
  (query?.type === 'operator') ? operationCommissionDetail : ''
  useEffect(()=>{
    setLoading(true)
    apiMethod({orderNo: id}).then(res=> {
      if(res.success) {
        setInfo({...res?.data, ...res?.data?.info})
        setPayInfos(res?.data?.payInfos)
      }
    }).finally(()=> {
      setLoading(false)
    })
    return ()=>{
      setInfo(null)
      setPayInfos([])
    }
  }, [id])

  const columns1 = [
    {
      title: '订单号',
      dataIndex: 'orderNo'
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      valueType: 'select',
      valueEnum: orderType
    },
    {
      title: '受益方会员类型',
      dataIndex: 'accountTypeName'
    },
    {
      title: (_) => _.dataIndex ? '店铺提成比例' : '',
      dataIndex: info?.storeCommissionRatio ? 'storeCommissionRatio' : '',
      render: (_) => _ ? <span>{amountTransform(_, '*')}%</span> : '',
    },
    {
      title: '受益方会员信息',
      dataIndex: 'accountMobile'
    },
    {
      title: '虚拟子账户',
      dataIndex: 'accountSn'
    },
    {
      title: '买家会员类型',
      dataIndex: 'buyerType'
    },
    {
      title: '',
      dataIndex: ''
    },
    {
      title: '买家会员信息',
      dataIndex: 'buyerMobile'
    },
    {
      title: '虚拟子账户',
      dataIndex: 'buyerSn'
    }
  ]

  const columns2 = [
    {
      title: '商品名称',
      dataIndex: 'goodsName'
    },
    {
      title: '购买规格',
      dataIndex: 'skuName'
    },
    {
      title: (_)=> _.dataIndex === 'supplyPrice' ? '商品供货价' : '商品集约价',
      dataIndex: info?.orderType === 'commandCollect' ? 'saleOrderPrice' : 'supplyPrice',
      render: (_) => `￥${amountTransform(_, '/')}`
    },
    {
      title: '实际销售价',
      dataIndex: 'salePrice',
      render: (_) => `¥${amountTransform(_, '/')}`
    },
    {
      title:(_)=> _.dataIndex === 'preCount' ? '预定数量' : '购买数量',
      dataIndex: info.orderType === 'commandSalesOrder' ? 'preCount' : 'paidCount'
    },
    {
      title: (_) => _.dataIndex === 'couponAmount' ? '优惠金额' : '实际采购数量',
      dataIndex: info.orderType === 'commandSalesOrder' ? 'paidCount' : 'couponAmount',
      render: (_)=> {
        if(info.orderType !== 'commandSalesOrder') {
          return `¥${amountTransform(Number(_), '/')}`
        } else {
          return _
        }
      }
    },
    {
      title: '运费',
      dataIndex: 'freight',
      render: (_) => `¥${amountTransform(_, '/')}`
    },
    {
      title: '应付金额',
      dataIndex: 'amount',
      render: (_) => `¥${amountTransform(_, '/')}`
    }
  ]

  const columns3 = [
    {
      title: '支付阶段',
      dataIndex: 'stageName'
    },
    {
      title: '支付时间',
      dataIndex: 'payTime'
    },
    {
      title: '支付渠道',
      dataIndex: 'payTpyeName'
    },
    {
      title: '',
      dataIndex: ''
    },
    {
      title: '实付金额',
      dataIndex: 'amount',
      render: (_, r)=> `¥${amountTransform((Number(_) - Number(r.couponAmount)), '/')}`
    },
    {
      title: '虚拟分账计算',
      dataIndex: 'divideInfo',
      render: (_, data)=> {
        return data?.divideInfos.map(item=> (
          <div key={item?.type}>
            {fashionableType(item?.type, item?.amount, item?.fee, item?.couponAmount, item?.realAmount)}
          </div>
        ))
      } 
    },
    {
      title: '支付单号',
      dataIndex: 'payNo'
    },
    {
      title: '资金流水号',
      dataIndex: 'transcationId'
    }
  ]
  const columns4 = [
    {
      title: '汇能虚拟户（佣金户）',
      dataIndex: 'platformAccountSn'
    },
    {
      title: '聚创虚拟户（交易费户）',
      dataIndex: 'platformFeeAccountSn'
    },
  ]
  const CustomList = ({ data, columns }) => {
    return (
      <ProDescriptions
        loading={loading}
        column={2}
        columns={columns}
        style={{
          background:'#fff',
          padding: 20
        }}
        bordered
        dataSource={data}
      />
    )
  }

  return (
    <PageContainer title={false}>
      <ProDescriptions
        loading={loading}
        column={2}
        columns={columns1}
        style={{
          background:'#fff',
          padding: 20
        }}
        bordered
        dataSource={info}
      />
      {
        info.skus &&
        info.skus.map(item => (
          <CustomList data={item} key={item.skuId} columns={columns2}/>
        ))
      }
      {
        payInfos?.map(item=> (
          <CustomList data={item} key={item.stageName} columns={columns3}/>
        ))
      }
      <ProDescriptions
        loading={loading}
        column={2}
        columns={columns4}
        style={{
          background:'#fff',
          padding: 20
        }}
        bordered
        dataSource={info}
      />
    </PageContainer>
  )
}

export default TransactionDetails
