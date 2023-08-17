import request from '@/utils/request'

// 早筛额外奖领取统计
export const awardCount = async (params, options = {}) => {
  return await request('/auth/healthy/screening/awardCount', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 早筛额外奖领取统计分页
export const aednoSubOrder = async (params, options = {}) => {
  const { pageSize, current, IPOAmount, ...rest } = params
  const res = await request('/auth/healthy/screening/awardCountPage', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      ipoStartAmount: IPOAmount?.min,
      ipoEndAmount: IPOAmount?.max,
      ...rest
    },
    ...options
  })
  return {
    data: res.data,
    success: res.success,
    total: res.data.total
  }
}

// 早筛额外奖领取统计分页详情
export const awardCountPageDetail = async (params, options = {}) => {
  const { pageSize, current, ipoAmount, ...rest } = params
  const res = await request('/auth/healthy/screening/awardCountPageDetail', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      ipoStartAmount: ipoAmount?.min,
      ipoEndAmount: ipoAmount?.max,
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