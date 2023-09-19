import request from '@/utils/request'
import moment from 'moment'

// 大健康省代服务商业绩
export const provinceAgentProviderAdm = async (params = {}, options = {}) => {
  const { current=1, pageSize=10, time, ...rest } = params
  const res = await request('/auth/healthy/provider/provinceAgentProviderAdm', {
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

// 大健康省代服务商业绩统计
export const provinceAgentProviderAdmSt = async (params = {}, options = {}) => {
  return await request('/auth/healthy/provider/provinceAgentProviderAdmSt', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 大健康省代-区县服务商订单业绩
export const provinceAgentProviderPm = async (params = {}, options = {}) => {
  const { current=1, pageSize=10, dateRange, ...rest } = params
  const res = await request('/auth/healthy/provider/provinceAgentProviderPm', {
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

// 大健康省代-区县服务商订单业绩统计
export const provinceAgentProviderSt = async (params = {}, options = {}) => {
  return await request('/auth/healthy/provider/provinceAgentProviderSt', {
    method: 'POST',
    data: params,
    ...options
  })
}