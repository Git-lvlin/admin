import request from '@/utils/request'

// 管理费分成配置
export const getCommissionConfig = async (params, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/healthy/operateOrder/getCommissionConfig', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  })
  return {
    data: res.data,
    total: res.data.total,
    success: res.success
  }
}