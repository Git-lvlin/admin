import request from '@/utils/request'

// 社区店销售排名
export const communityStoreSalesRank = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/report/config/communityStoreSalesRank', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}
