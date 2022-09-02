import request from '@/utils/request'

// 托管租赁 套餐列表
export const packageList = async (params, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/store/hostingLease/packageList', {
    method: 'GET',
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