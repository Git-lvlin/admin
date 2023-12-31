import request from '@/utils/request'
import moment from 'moment'

// 推荐提成分页列表
export const queryPage = async (params = {}, options = {}) => {
  const { tradeMonth, current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/java-admin/financial/healthyGiftCommission/queryPage', {
    method: 'POST',
    data: {
      tradeMonth: tradeMonth && moment(tradeMonth).format("YYYY-MM"),
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

// 推荐提成明细分页列表
export const queryDetailPage = async (params = {}, options = {}) => {
  return await request('/auth/java-admin/financial/healthyGiftCommission/queryDetailPage', {
    method: 'POST',
    data: params,
    ...options
  })
}
