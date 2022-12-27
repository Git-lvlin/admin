import request from '@/utils/request'
import { amountTransform } from '@/utils/utils'

// 健康套餐订单业绩
export const cardCityAgencyOrderPm = async (params = {}, options = {}) => {
  const { area, amount, orderNum, current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/java-admin/report/config/cardCityAgencyOrderPm', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      provinceId: area?.[0].value,
      cityId: area?.[1].value,
      regionId: area?.[2].value,
      minPayAmount: amount && amountTransform(amount.min, '*'),
      maxPayAmount: amount && amountTransform(amount.max, '*'),
      minOrderNums: orderNum && orderNum.min,
      maxOrderNums: orderNum && orderNum.max,
      ...rest
    },
    ...options
  })
  return {
    data: res.data.records,
    success: res.success,
    total: res.data.total
  }
}

// 健康套餐订单业绩统计
export const cardCityAgencyOrderPmStats = async (params = {}, options = {}) => {
  const { time, ...rest } = params
  const res = await request('/auth/java-admin/report/config/cardCityAgencyOrderPmStats', {
      method: 'POST',
      data: params,
      ...options
  });

  return {
      data: res.data?.[0],
      success: res.success
  }
}

// 健康套餐订单业绩详情
export const cardCityAgencyOrderPmDetail = async (params = {}, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/java-admin/report/config/cardCityAgencyOrderPmDetail', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  })
  return {
    data: res.data.records,
    success: res.success,
    total: res.data.total
  }
}
