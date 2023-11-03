import request from '@/utils/request';
import moment from 'moment';

// 无合作公司AED课程业绩
export const aednoSubOrder = async (params, options = {}) => {
  const { pageSize, current, payTime, ...rest } = params
  const res = await request('/auth/stats/report/aed/aednoSubOrder', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      startTime: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
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