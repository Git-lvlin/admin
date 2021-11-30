import request from '@/utils/request'

// 数据概况-右边汇总
export const briefCount = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/report/config/briefCount', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 数据概况-左边折线
export const briefCountDetail = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/report/config/briefCountDetail', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 核心指标
export const coreData = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/report/config/coreData', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 总数据
export const sumData = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/report/config/sumData', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}