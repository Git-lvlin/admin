import request from '@/utils/request';
import moment from 'moment';

// 产品业绩管理-早筛订单业绩
export const scrOrderGoodsPm = async (params, options = {}) => {
  const { dateRange, ...rest } = params
  const res = await request('/auth/stats/report/java/scrOrderGoodsPm', {
    method: 'POST',
    data: {
      startTime: dateRange && moment(dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: dateRange && moment(dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest
    },
    ...options
  })
  return {
    data: res.data.records,
    success: res.success
  }
}