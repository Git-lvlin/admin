import request from '@/utils/request'

// AED订单分账超时未解冻列表
export const unfreezeDividePage = async (params, options = {}) => {
  const { current, pageSize, ...rest } = params
  const res = await request('/auth/java-admin/trainServer/unfreezeDivide/page', {
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

// AED分帐解冻
export const unfreeze = async (params, options = {}) => {
  return await request('/auth/java-admin/trainServer/unfreezeDivide/unfreeze', {
    method: 'POST',
    data: params,
    ...options
  })
}
