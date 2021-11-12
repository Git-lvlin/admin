import request from '@/utils/request'

// 运营中心采购订单总量
export const operationsCenterRank = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/report/config/operationsCenterRank', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 运营中心核心数据
export const operationsCenterData = async (params = {}, options = {}) => {
  // const { current=1, pageSize=10, time, area, ...rest } = params
  const res = await request('/auth/java-admin/report/config/operationsCenterData', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}
