import request from '@/utils/request'

// 补贴汇总
export const allowance = async (params, options= {}) => {
  const { current=1, pageSize=10, ...rest } = params
  const res = await request('/auth/java-admin/financial/coupon/allowance/page', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  })

  return {
    data: res?.data.records,
    success: res?.success,
    total: res?.data.total
  }
}

// 补贴明细
export const detail = async (params, options= {}) => {
  const { current=1, pageSize=10, ...rest } = params
  const res = await request('/auth/java-admin/financial/coupon/allowance/detail/page', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  })

  return {
    data: res?.data.records,
    success: res?.success,
    total: res?.data.total
  }
}