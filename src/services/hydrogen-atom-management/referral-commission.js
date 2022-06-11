import request from '@/utils/request'

// 分成关系列表
export const queryStatisticsCommissionList = async (params = {}, options = {}) => {
  const { current=1, pageSize=10, ...rest } = params
  const res = await request('/auth/java-admin/iot/deviceCommission/queryStatisticsCommissionList', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
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

// 分享关系子列表
export const queryStatisticsCommissionListSub = async (params = {}, options = {}) => {
  const { current=1, pageSize=10, ...rest } = params
  const res = await request('/auth/java-admin/iot/deviceCommission/queryStatisticsCommissionListSub', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
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