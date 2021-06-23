import request from '@/utils/request'

// 提现配置详情
export const withdrawConfigDetail = async (params, options = {}) => {
  const res = await request('/auth/java-admin/financial/config/withdrawConfigDetail', {
    method: 'POST',
    data: params,
    ...options
  })

  return {
    data: res.data,
    success: res.success
  }
}

// 提现配置详情
export const withdrawConfigUpdate = async (params, options = {}) => {
  const res = await request('/auth/java-admin/financial/config/withdrawConfigUpdate', {
    method: 'POST',
    data: params,
    ...options
  })

  return {
    data: res.data,
    success: res.success
  }
}
