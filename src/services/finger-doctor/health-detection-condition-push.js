import request from '@/utils/request'
import moment from 'moment'

// 推送报告列表
export const pushReportList = async (params = {}, options = {}) => {
  const { current = 1, pageSize = 10, createTime, ...rest } = params
  const res = await request('/auth/healthy/FingerDoctor/pushReportList', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      startTime: createTime && moment(createTime?.[0]).format("YYYY-MM-DD"),
      endTime: createTime && moment(createTime?.[1]).format("YYYY-MM-DD"),
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

// 推送报告商品
export const pushReportGoods = async (params = {}, options = {}) => {
  const res = await request('/auth/healthy/FingerDoctor/pushReportGoods', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 获取推送配置
export const getSolutionsPushConfig = async (params = {}, options = {}) => {
  return await request('/auth/healthy/fingerDoctor/getSolutionsPushConfig', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 配置推送方案
export const solutionsPushConfig = async (params = {}, options = {}) => {
  return await request('/auth/healthy/fingerDoctor/solutionsPushConfig', {
    method: 'POST',
    data: params,
    ...options
  })
}