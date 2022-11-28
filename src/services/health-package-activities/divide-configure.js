import request from '@/utils/request'

// 分账配置
export const getConfig = async (params = {}, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/healthy/card_reg/getConfig', {
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
    success: res.success,
    total: res.data.total
  }
}