import request from '@/utils/request'

// 健康套餐礼包订单分页列表
export const giftPackageOrder = async (params = {}, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/order/giftPackageOrder/page', {
    method: 'GET',
    params: {
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

// 健康套餐礼包订单详情
export const giftPackageOrderDetail = async (data = {}, options = {}) => {
  return await request('/auth/order/giftPackageOrder/detail', {
    method: 'GET',
    params: data,
    ...options
  })
}

// 健康礼包套餐列表
export const packageSampleList = async (data = {}, options = {}) => {
  return await request('/auth/order/giftPackageOrder/packageSampleList', {
    method: 'GET',
    params: data,
    ...options
  })
}