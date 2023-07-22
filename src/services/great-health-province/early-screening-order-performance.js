import request from '@/utils/request'
import moment from 'moment'

// 省代早筛业绩
export const hpaScreen = async (params = {}, options = {}) => {
  const { current=1, pageSize=10, time, ...rest } = params
  const res = await request('/auth/healthy/screening/hpaScreen', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      startTime: time&&moment(time[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: time&&moment(time[1]).format('YYYY-MM-DD HH:mm:ss'),
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

// 早筛订单业绩统计
export const hpaScreenStats = async (params = {}, options = {}) => {
  return await request('/auth/healthy/screening/hpaScreenStats', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 早筛订单业绩详情
export const hpaScreenDetail = async (params = {}, options = {}) => {
  const { current=1, pageSize=10, dateRange, ...rest } = params
  const res = await request('/auth/healthy/screening/hpaScreenDetail', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      startTime: dateRange&&moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: dateRange&&moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss'),
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

// 早筛订单业绩详情统计
export const hpaScreenDetailStats = async (params = {}, options = {}) => {
  return await request('/auth/healthy/screening/hpaScreenDetailStats', {
    method: 'POST',
    data: params,
    ...options
  })
}