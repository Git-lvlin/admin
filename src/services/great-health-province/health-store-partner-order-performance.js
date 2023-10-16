import request from '@/utils/request'
import moment from 'moment'

// 大健康省代门店业绩
export const provinceAgentStoreAdm = async (params = {}, options = {}) => {
  const { current=1, pageSize=10, time, ...rest } = params
  const res = await request('/auth/healthy/provider/provinceAgentStoreAdm', {
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

// 大健康省代门店业绩统计
export const provinceAgentStoreAdmSt = async (params = {}, options = {}) => {
  return await request('/auth/healthy/provider/provinceAgentStoreAdmSt', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 大健康省代-门店合作商交易业绩
export const provinceAgentStorePm = async (params = {}, options = {}) => {
  const { current=1, pageSize=10, dateRange, ...rest } = params
  const res = await request('/auth/healthy/provider/provinceAgentStorePm', {
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

// 大健康省代-门店合作商交易业绩统计
export const provinceAgentStoreSt = async (params = {}, options = {}) => {
  return await request('/auth/healthy/provider/provinceAgentStoreSt', {
    method: 'POST',
    data: params,
    ...options
  })
}