import request from '@/utils/request'
import { amountTransform } from '@/utils/utils'

// 健康营销套餐订单业绩
export const healthPkgOrderPm = async (params = {}, options = {}) => {
  const { current = 1, pageSize = 10, area, payAmount, orderNums, ...rest } = params
  console.log(payAmount);
  const res = await request('/auth/java-admin/report/config/healthPkgOrderPm', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      provinceId: area&&area[0]?.value,
      cityId: area&&area[1]?.value,
      regionId: area&&area[2]?.value,
      minPayAmount: amountTransform(payAmount?.min, '*'),
      maxPayAmount: amountTransform(payAmount?.max, '*'),
      minOrderNums: orderNums && orderNums?.min,
      maxOrderNums: orderNums && orderNums?.max,
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

// 健康营销套餐订单业绩统计
export const healthPkgOrderPmStats = async (params = {}, options = {}) => {
    const { current = 1, pageSize = 10, area, payAmount, orderNums, ...rest } = params
    const res = await request('/auth/java-admin/report/config/healthPkgOrderPmStats', {
      method: 'POST',
      data: {
        provinceId: area&&area[0]?.value,
        cityId: area&&area[1]?.value,
        regionId: area&&area[2]?.value,
        minPayAmount: payAmount&& amountTransform(payAmount?.min,'*'),
        maxPayAmount: payAmount&& amountTransform(payAmount?.max,'*'),
        minOrderNums: orderNums&&orderNums?.min,
        maxOrderNums: orderNums&&orderNums?.max,
        ...rest
      },
      ...options
    })
    return {
      data: res.data,
      success: res.success,
      code: res.code
    }
}

// 健康营销套餐订单业绩详情
export const healthPkgOrderPmDetail = async (params = {}, options = {}) => {
    const { current = 1, pageSize = 10, ...rest } = params
    const res = await request('/auth/java-admin/report/config/healthPkgOrderPmDetail', {
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
