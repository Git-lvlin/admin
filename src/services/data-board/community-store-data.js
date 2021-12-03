import request from '@/utils/request'

// 社区店销售排名
export const communityStoreSalesRank = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/report/config/communityStoreSalesRank', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data.records,
    success: res.success
  }
}

// 社区店核心数据表
export const communityStoreData = async (params = {}, options = {}) => {
  const { current=1, pageSize=10, storeName, time, area, ...rest } = params
  const arr = area?.map(item => item.value)
  const res = await request('/auth/java-admin/report/config/communityStoreData', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      name: storeName,
      startTime: time?.[0],
      endTime: time?.[1],
      province: arr?.[0],
      city: arr?.[1],
      area: arr?.[2],
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

// 社区店数据总览
export const communityStoreDataOverview = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/report/config/communityStoreDataOverview', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}
