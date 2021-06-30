import React, { useEffect, useState } from 'react'
import { useParams, history } from 'umi'
import ProDescriptions from '@ant-design/pro-descriptions'
import { PageContainer } from '@ant-design/pro-layout'
import { Button } from 'antd'

import { amountTransform } from '@/utils/utils'
import { refundDetail } from "@/services/financial-management/transaction-detail-management"
import './styles.less'

const Detail = () => {
  const {id} = useParams()
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState({})
  const [data, setData] = useState({})
  const [payInfos, setPayInfos] = useState([])
  useEffect(()=>{
    setLoading(true)
    refundDetail({id}).then(res=> {
      if(res.success) {
        setInfo({...res?.data?.info, ...res?.data})
        setData({...res?.data})
        setPayInfos(res?.data?.payInfos)
      }
    }).finally(()=> {
      setLoading(false)
    })
    return ()=>{
      setInfo({})
      setData([])
      setPayInfos({})
    }
  }, [])
  const back = ()=> {
    history.goBack()
  }
  const fashionableType =(data, amount, fee) =>{
    if(data==='goodsAmount'){
      return `货款: ¥${amountTransform(amount, '/')} 货款交易费: ¥${amountTransform(fee, '/')}`
    }else if(data==='commission'){
      return `提成: ¥${amountTransform(amount, '/')} 货款交易费: ¥${amountTransform(fee, '/')}`
    }else if(data==='platformCommission') {
      return `佣金: ¥${amountTransform(amount, '/')} 货款交易费: ¥${amountTransform(fee, '/')}`
    }else{
      return ''
    }
  }

  const backCalculation= (data, amount, fee)=> {
    if(data==='goodsAmount'){
      return `货款回退: ¥${amountTransform(amount, '/')} 货款交易费回退: ¥${amountTransform(fee, '/')}`
    }else if(data==='commission'){
      return `提成回退: ¥${amountTransform(amount, '/')} 货款交易费回退: ¥${amountTransform(fee, '/')}`
    }else if(data==='platformCommission') {
      return `佣金回退: ¥${amountTransform(amount, '/')} 货款交易费回退: ¥${amountTransform(fee, '/')}`
    }else{
      return ''
    }
  }
  const columns1 = [
    {
      title: '售后订单ID',
      dataIndex: 'refundNo'
    },
    {
      title: '交易类型',
      dataIndex: 'tradeType',
      valueType: 'select',
      valueEnum: {
        'goodsAmount': '货款入账',
        'goodsAmountReturn': '货款回退',
        'commission': '提成入账',
        'commissionReturn': '提成回退',
        'platformCommission': '佣金收入',
        'platformCommissionReturn': '佣金回退',
        'fee': '代收交易费',
        'feeReturn': '交易费回退',
        'recharge': '充值',
        'giveOut': '划扣',
        'withdraw': '提现',
        'refundRecharge': '售后款入账',
        'debt': '欠款入账',
        'debtReturn': '欠款偿还',
        'unfreeze': '解冻',
        'freeze': '冻结'
      }
    },
    {
      title: '关联订单类型',
      dataIndex: 'payTpyeName',
      valueEnum: {
        'normalOrder': '普通商品订单',
        'second': '秒约订单',
        'single': '单约订单',
        'group': '团约订单',
        'commandSalesOrder': '指令集约店主订单',
        'activeSalesOrder': '主动集约店主订单',
        'dropShipping1688': '1688代发订单',
        'commandCollect': '指令集约C端订单',
        'activeCollect': '主动集约C端订单'
      }
    },
    {
      title: '关联订单ID',
      dataIndex: 'orderNo'
    },
    {
      title: '回退会员类型',
      dataIndex: 'accountType',
      valueType: 'select',
      valueEnum: ''
    },
    {
      title: '',
      dataIndex: ''
    },
    {
      title: '回退会员信息',
      dataIndex: 'sellerMobile'
    },
    {
      title: '回退到账时间',
      dataIndex: 'refundTime'
    },
    {
      title: '虚拟子账户',
      dataIndex: 'sellerSn'
    },
    {
      title: '支付渠道',
      dataIndex: 'data',
      render: ()=> '原路退回'
    },
    {
      title: '买家手机号',
      dataIndex: 'buyerMobile'
    },
    {
      title: '买家会员ID',
      dataIndex: 'buyerSn'
    }
  ]
  const columns2 = [
    {
      title: '支付金额',
      dataIndex: 'refundAmount'
    },
    {
      title: '回退计算',
      dataIndex: 'refundDivideInfos',
      render: (_, data)=> {
        if(data.returnDivideInfos) {
          console.log(data?.returnDivideInfos.length);
          return data?.returnDivideInfos.map(item=> (
            <div key={item?.type}>{backCalculation(item?.type, item?.amount, item?.fee)}</div>
          ))
        }
      } 
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
      title: '支付用户名',
      dataIndex: 'payUsername'
    },
    {
      title: '支付账户',
      dataIndex: 'payAccount'
    },
    {
      title: '支付金额',
      dataIndex: 'amount'
    },
    {
      title: '虚拟分账计算',
      dataIndex: 'divideInfos',
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

  const CustomList = props=> {
    const { data } = props
    return (
      <ProDescriptions
        loading={loading}
        column={2}
        columns={columns3}
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
      <ProDescriptions
        loading={loading}
        dataSource={data}
        column={2}
        columns={columns2}
        style={{
          background:'#fff',
          padding: 20
        }}
        bordered
      />
      {
        payInfos?.map(item=> (
          <CustomList data={item} key={item.stageName}/>
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
      <div style={{background: '#fff', padding: 20}}>
        <Button type='primary' onClick={()=>{back()}}>返回</Button>
      </div>
    </PageContainer>
  )
}

export default Detail