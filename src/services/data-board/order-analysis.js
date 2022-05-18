import request from '@/utils/request'
import moment from 'moment'

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

// 订单统计 - 趋势图指标 - 折线图
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

// 订单分析 - 趋势图指标 - 饼状图
export const orderChart = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/report/config/orderChart', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 订单分析 - 指标数据分析
export const indexDataDetail = async (params = {}, options = {}) => {
  const { dateTimeRange, ...rest } = params;
  const res = await request('/auth/java-admin/report/config/indexDataDetail', {
    method: 'POST',
    data:  {
      startTime: dateTimeRange[0]?.format('YYYY-MM-DD HH:mm:ss'),
      endTime: dateTimeRange[1]?.format('YYYY-MM-DD HH:mm:ss'),
      ...rest
    },
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 订单分析 - 已支付订单明细
export const payOrderDetailQuery = async (params = {}, options = {}) => {
  const { current, pageSize, orderPaytime, ...rest } = params
  const res = await request('/auth/java-admin/report/config/payOrderDetailQuery', {
    method: 'POST',
    data:  {
      page: current,
      size: pageSize,
      startTime: orderPaytime?.[0],
      endTime: orderPaytime?.[1],
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
      startTime:dateTimeRange&&moment(dateTimeRange[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime:dateTimeRange&&moment(dateTimeRange[1]).format('YYYY-MM-DD HH:mm:ss'),
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
      startTime:dateTimeRange&&moment(dateTimeRange[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime:dateTimeRange&&moment(dateTimeRange[1]).format('YYYY-MM-DD HH:mm:ss'),
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



// 集约订单明细-子公司名单
export const wholeSaleOrderSubCompany = async (params = {}, options = {}) => {
  const { ...rest } = params;
  const res = await request('/auth/java-admin/report/config/wholeSaleOrderSubCompany', {
    method: 'POST',
    data:  {
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