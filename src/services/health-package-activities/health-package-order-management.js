import request from '@/utils/request'

// 推广活动管理
export const joinStore = async (params = {}, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/healthy/card_reg/joinStore', {
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

// 参与活动设备详情
export const detail = async (params = {}, options = {}) => {
  const res = await request('/auth/healthy/card_reg/detail', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}
