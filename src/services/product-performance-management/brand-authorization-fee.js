import request from '@/utils/request';
import moment from 'moment';

export const storeLifePm = async (params, options = {}) => {
  const { pageSize, current, payTime, area, ...rest } = params
  const res = await request('/auth/stats/performance/storeLifePm', {
    method: 'POST',
    data: {
      startTime: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      provinceId: area && area?.[0]?.value,
      cityId: area && area?.[1]?.value,
      regionId: area && area?.[2]?.value,
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  })
  return {
    data: res.data.records,
    total: res.data.total,
    success: res.success
  }
}

export const storeLifePmStats = async (params, options = {}) => {
  const { payTime, area, ...rest } = params
  const res = await request('/auth/java-admin/report/config/storeLifePmStats', {
    method: 'POST',
    data: {
      startTime: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      provinceId: area && area?.[0]?.value,
      cityId: area && area?.[1]?.value,
      regionId: area && area?.[2]?.value,
      ...rest
    },
    ...options
  })
  return {
    data: res.data[0],
    total: res.data.total,
    success: res.success
  }
}
