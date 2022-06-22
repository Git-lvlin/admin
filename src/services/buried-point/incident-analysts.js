import request from '@/utils/request'

// 埋点事件列表
export const metadataEventAnalysis = async (params = {}, options = {}) => {
  return await request('/auth/java-admin/report/config/metadataEventAnalysis', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 埋点事件属性列表
export const flindEventProperties = async (params = {}, options = {}) => {
  return await request('/auth/java-admin/report/config/flindEventProperties', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 事件分析列表
export const indexDetail = async (params = {}, options = {}) => {
  const { pageSize=10, current=1, ...rest } = params
  const res = await request('/auth/java-admin/report/config/indexDetail', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  })
  return {
    data: res.data[0] ? res.data : [],
    success: res.success,
    total: res.data?.total
  }
}