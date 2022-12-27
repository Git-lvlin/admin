import request from '@/utils/request'
import moment from 'moment'

// 健康套餐推荐提成
export const cardRecomCommission = async (params = {}, options = {}) => {
  const { time, current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/java-admin/report/config/cardRecomCommission', {
    method: 'POST',
    data: {
      startTime: time && moment(time).startOf('month').format('YYYY-MM-DD'),
      endTime: time && moment(time).endOf('month').format('YYYY-MM-DD'),
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