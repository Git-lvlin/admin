import request from '@/utils/request'

// 托管数据报表
export const hostingDataReport = async (params, options = {}) => {
  const res = await request('/auth/java-admin/report/config/hostingDataReport', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data
  }
}