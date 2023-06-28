import request from '@/utils/request';

// 早筛订单服务统计
export const statisticsOrder = async (params = {}, options = {}) => {
  return await request('/auth/healthy/aedScr/statisticsOrder', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 早筛订单服务统计列表
export const statisticsUser = async (params, options = {}) => {
  const { pageSize, current, ...rest } = params
  const res = await request('/auth/healthy/aedScr/statisticsUser', {
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
    total: res.data.total,
    success: res.success
  }
}

// 早筛订单服务统计查看
export const statisticsUserOrder = async (params, options = {}) => {
  const { pageSize, current, ...rest } = params
  const res = await request('/auth/healthy/aedScr/statisticsUserOrder', {
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
    total: res.data.total,
    success: res.success
  }
}