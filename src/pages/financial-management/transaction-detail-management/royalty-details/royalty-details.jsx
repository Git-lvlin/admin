import React, { useEffect, useState } from 'react'
import { useParams, history, useLocation } from 'umi'
import ProDescriptions from '@ant-design/pro-descriptions'
import { PageContainer } from '@ant-design/pro-layout'
import { Button } from 'antd'

import { amountTransform } from '@/utils/utils'
import { commissionDetail, platformCommissionDetail, goodsAmountDetail } from "@/services/financial-management/transaction-detail-management"
import './styles.less'
import styles from './styles.less'

const TransactionDetails = () => {
  const {id} = useParams()
  const {query} = useLocation()
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState({})
  const [payInfos, setPayInfos] = useState([])

  const apiMethod = query?.type === 'bonus' ? commissionDetail:
  (query?.type === 'commission') ? platformCommissionDetail:
  (query?.type === 'loan') ? goodsAmountDetail : ''
  
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
      setInfo({})
      setPayInfos({})
    }
  }, [id])
  const back = ()=> {
    history.goBack()
  }
  const fashionableType =(data, amount, fee) =>{
    switch(data){
      case 'goodsAmount':
        return (
          <>
            <span className={styles.amount}>货款: ¥{amountTransform(amount, '/')}</span>
            <span>货款交易费: ¥{amountTransform(fee, '/')}</span>
          </>
        )
      case 'commission':
        return (
          <>
            <span className={styles.amount}>提成: ¥{amountTransform(amount, '/')}</span>
            <span>提成交易费: ¥{amountTransform(fee, '/')}</span>
          </>
        )
      case 'platformCommission':
        return (
          <>
            <span className={styles.amount}>佣金: ¥{amountTransform(amount, '/')}</span>
            <span>佣金交易费: ¥{amountTransform(fee, '/')}</span>
          </>
        )
      case 'suggestCommission':
        return (
          <>
            <span className={styles.amount}>推荐提成: ¥{amountTransform(amount, '/')}</span>
            <span>推荐提成交易费: ¥{amountTransform(fee, '/')}</span>
          </>
        )
      case 'agentCompanyCommission':
        return (
          <>
            <span className={styles.amount}>经销商提成: ¥{amountTransform(amount, '/')}</span>
            <span>经销商提成交易费: ¥{amountTransform(fee, '/')}</span>
          </>
        )
      default:
        return ''
    }
  }
  const columns1 = [
    {
      title: '订单号',
      dataIndex: 'orderNo'
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      valueType: 'select',
      valueEnum: {
        'normalOrder': '普通订单',
        'second': '秒约',
        'single': '单约',
        'group': '团约',
        'commandSalesOrder': '指令集约店主订单',
        'activeSalesOrder': '主动集约店主订单',
        'dropShipping1688': '1688代发订单',
        'commandCollect': '指令集约C端订单',
        'activeCollect': '主动集约C端订单'
      }
    },
    {
      title: '受益方会员类型',
      dataIndex: 'accountTypeName'
    },
    {
      title: '',
      dataIndex: ''
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
      title: '支付金额',
      dataIndex: 'amount',
      render: (_)=> `¥${amountTransform(_, '/')}`
    },
    {
      title: '虚拟分账计算',
      dataIndex: 'divideInfo',
      render: (_, data)=> {
        return data?.divideInfos.map(item=> (
          <div key={item?.type}>
            {fashionableType(item?.type, item?.amount, item?.fee)}
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
  const columns3 = [
    {
      title: '汇能虚拟户（佣金户）',
      dataIndex: 'platformAccountSn'
    },
    {
      title: '聚创虚拟户（交易费户）',
      dataIndex: 'platformFeeAccountSn'
    },
  ]
  const CustomList = props=> {
    const { data } = props
    return (
      <ProDescriptions
        loading={loading}
        column={2}
        columns={columns2}
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
        payInfos?.map(item=> (
          <CustomList data={item} key={item.stageName}/>
        ))
      }
      <ProDescriptions
        loading={loading}
        column={2}
        columns={columns3}
        style={{
          background:'#fff',
          padding: 20
        }}
        bordered
        dataSource={info}
      />
      <div style={{background: '#fff', padding: 20}}>
        <Button type='primary' onClick={()=>{back()}}>返回</Button>
      </div>
    </PageContainer>
  )
}

export default TransactionDetails
