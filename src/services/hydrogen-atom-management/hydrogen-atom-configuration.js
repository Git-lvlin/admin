import request from '@/utils/request'

// 购买_氢原子交易款的各个角色分成
export const getQyzBuyConfig = async (params = {}, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/java-admin/goods/product/getQyzBuyConfig', {
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
    code: res.code
  }
}