import { Space } from 'antd'

import { amountTransform } from '@/utils/utils'

export const fashionableType = (data, amount, fee, couponAmount, realAmount, freight, hnCollect, statusDesc) =>{
  return (
    <div style={{marginBottom: '10px'}}>
      <div>
        {data}: ¥{amountTransform(amount, '/')}
        {
          freight > 0 &&
          `（含平均运费¥${amountTransform(freight, '/')}）`
        }
      </div>
      {
        (couponAmount !== '0' && couponAmount)&&
        <div>优惠金额: ¥{amountTransform(couponAmount, '/')}</div>
      }
      <div>交易通道费: ¥{amountTransform(fee, '/')}</div>
      {
        (realAmount !== '0' && realAmount)&&
        <div>到账金额: ¥{amountTransform(realAmount, '/')}</div>
      }
      {/* {
        hnCollect&&
        <div>汇能代收：{hnCollect}</div>
      } */}
      {
        statusDesc&&
        <div>解冻状态：{statusDesc}</div>
      }
      {
        hnCollect&&
        <div>结算方式：{hnCollect}</div>
      }
    </div>
  )
}

export const backCalculation= (data, amount, fee)=> {
  return (
    <Space size={10}>
      <span>{data}回退: ¥{amountTransform(amount, '/')}</span>
      <span>交易通道费: ¥{amountTransform(fee, '/')}</span>
    </Space>
  )
}
