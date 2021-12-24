import request from '@/utils/request'

// 订单分析
export const orderAnalysis = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/report/config/orderTrendAnalysis', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 订单统计
export const orderStatistical = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/report/config/orderStatistical', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 地区订单分析
export const areaOrderAnalysis = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/report/config/areaOrderAnalysis', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 集约订单明细
export const wholeSaleOrderDetail = async (params = {}, options = {}) => {
  const { current, pageSize,dateTimeRange, ...rest } = params;
  const res = await request('/auth/java-admin/report/config/wholeSaleOrderDetail', {
    method: 'POST',
    data:  {
      page: current,
      size: pageSize,
      startTime:dateTimeRange&&dateTimeRange[0],
      endTime:dateTimeRange&&dateTimeRange[1],
      ...rest
    },
    ...options
  })
  return {
    data: res.data.records,
    total:res.data.total,
    success: res.success
  }
}


// 集约订单明细-汇总
export const wholeSaleOrderDetailSummary = async (params = {}, options = {}) => {
  const { current, pageSize,dateTimeRange, ...rest } = params;
  const res = await request('/auth/java-admin/report/config/wholeSaleOrderDetailSummary', {
    method: 'POST',
    data:  {
      page: current,
      size: pageSize,
      startTime:dateTimeRange&&dateTimeRange[0],
      endTime:dateTimeRange&&dateTimeRange[1],
      ...rest
    },
    ...options
  })
  return {
    data: res.data,
    code: res.code,
    success: res.success
  }
}
