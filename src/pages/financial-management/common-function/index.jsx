import { Space } from 'antd'

import { amountTransform } from '@/utils/utils'

export const fashionableType = (data, amount, fee, couponAmount, realAmount) =>{
  switch(data){
    case 'goodsAmount':
      return (
        <Space size={10}>
          <span>货款: ¥{amountTransform(amount, '/')}</span>
          {
            (couponAmount !== '0' && couponAmount)&&
            <span>优惠金额: ¥{amountTransform(couponAmount, '/')}</span>
          }
          <span>交易通道费: ¥{amountTransform(fee, '/')}</span>
          {
            (realAmount !== '0' && realAmount)&&
            <span>到账金额: ¥{amountTransform(realAmount, '/')}</span>
          }
          
        </Space>
      )
    case 'commission':
      return (
        <Space size={10}>
          <span>店主收益: ¥{amountTransform(amount, '/')}</span>
          {
            (couponAmount !== '0' && couponAmount)&&
            <span>优惠金额: ¥{amountTransform(couponAmount, '/')}</span>
          }
          <span>交易通道费: ¥{amountTransform(fee, '/')}</span>
          { 
            (realAmount !== '0' && realAmount)&&
            <span>到账金额: ¥{amountTransform(realAmount, '/')}</span>
          }
        </Space>
      )
    case 'platformCommission':
      return (
        <Space size={10}>
          <span>平台收益: ¥{amountTransform(amount, '/')}</span>
          {
            (couponAmount !== '0' && couponAmount)&&
            <span>优惠金额: ¥{amountTransform(couponAmount, '/')}</span>
          }
          <span>交易通道费: ¥{amountTransform(fee, '/')}</span>
          { 
            (realAmount !== '0' && realAmount)&&
            <span>到账金额: ¥{amountTransform(realAmount, '/')}</span>
          }
        </Space>
      )
    case 'suggestCommission':
      return (
        <Space size={10}>
          <span>上级推荐人收益: ¥{amountTransform(amount, '/')}</span>
          {
            couponAmount !== '0'&&
            <span>优惠金额: ¥{amountTransform(couponAmount, '/')}</span>
          }
          <span>交易通道费: ¥{amountTransform(fee, '/')}</span>
          { 
            (realAmount !== '0' && realAmount)&&
            <span>到账金额: ¥{amountTransform(realAmount, '/')}</span>
          }
        </Space>
      )
    case 'agentCompanyCommission':
      return (
        <Space size={10}>
          <span>运营商收益: ¥{amountTransform(amount, '/')}</span>
          {
            (couponAmount !== '0' && couponAmount)&&
            <span>优惠金额: ¥{amountTransform(couponAmount, '/')}</span>
          }
          <span>交易通道费: ¥{amountTransform(fee, '/')}</span>
          { 
            (realAmount !== '0' && realAmount)&&
            <span>到账金额: ¥{amountTransform(realAmount, '/')}</span>
          }
        </Space>
      )
    case 'freight':
      return (
        <Space size={10}>
          <span>运费: ¥{amountTransform(amount, '/')}</span>
          {
            (couponAmount !== '0' && couponAmount)&&
            <span>优惠金额: ¥{amountTransform(couponAmount, '/')}</span>
          }
          <span>交易通道费: ¥{amountTransform(fee, '/')}</span>
          { 
            (realAmount !== '0' && realAmount)&&
            <span>到账金额: ¥{amountTransform(realAmount, '/')}</span>
          }
        </Space>
      )
    default:
      return ''
  }
}

export const backCalculation= (data, amount, fee)=> {
  switch(data){
    case 'goodsAmount':
      return (
        <Space size={10}>
          <span>货款回退: ¥{amountTransform(amount, '/')}</span>
          <span>交易通道费: ¥{amountTransform(fee, '/')}</span>
        </Space>
      )
    case 'commission':
      return (
        <Space size={10}>
          <span>店主收益回退: ¥{amountTransform(amount, '/')}</span>
          <span>交易通道费: ¥{amountTransform(fee, '/')}</span>
        </Space>
      )
    case 'platformCommission':
      return (
        <Space size={10}>
          <span>平台收益回退: ¥{amountTransform(amount, '/')}</span>
          <span>交易通道费: ¥{amountTransform(fee, '/')}</span>
        </Space>
      )
    case 'suggestCommission':
      return (
        <Space size={10}>
          <span>上级推荐人收益回退: ¥{amountTransform(amount, '/')}</span>
          <span>交易通道费: ¥{amountTransform(fee, '/')}</span>
        </Space>
      )
    case 'agentCompanyCommission':
      return (
        <Space size={10}>
          <span>运营商收益回退: ¥{amountTransform(amount, '/')}</span>
          <span>交易通道费: ¥{amountTransform(fee, '/')}</span>
        </Space>
      )
    default:
      return ''
  }
}