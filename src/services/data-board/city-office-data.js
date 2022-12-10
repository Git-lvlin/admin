import request from '@/utils/request'

// 市办事处排名-社区店采购订单总数量
export const cityAgencySortOrderTotalNum = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/report/config/cityAgencySortOrderTotalNum', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 市办事处排名-社区店采购订单总金额
export const cityAgencySortOrderTotalAmount = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/report/config/cityAgencySortOrderTotalAmount', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 市办事处排名-社区店采购单总收益排名
export const cityAgencySortOrderTotalIncome = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/report/config/cityAgencySortOrderTotalIncome', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 市办事处排名-数据总览
export const cityAgencyStatData = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/report/config/cityAgencyStatData', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 市办事处排名-业绩占比
export const cityAgencyStatDataPoint = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/report/config/cityAgencyStatDataPoint', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 市办事处排名-主要交易数据
export const cityAgencyStatDataMain = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/report/config/cityAgencyStatDataMain', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 市办事处排名-其他交易数据
