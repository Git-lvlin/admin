import request from '@/utils/request'
import moment from 'moment'

// 市办事处排名-社区店采购订单总数量
export const cityAgencySortOrderTotalNum = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/report/config/cityAgencySortOrderTotalNum', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data.records,
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
    data: res.data.records,
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
    data: res.data.records,
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

// 业绩占比
export const cityAgencyStatSaleGoods = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/report/config/cityAgencyStatSaleGoods', {
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
  const { pageSize = 10, current = 1, area, time, ...rest } = params
  const res = await request('/auth/java-admin/report/config/cityAgencyStatDataMain', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      province_id: area && area[0]?.value,
      city_id: area && area[1]?.value,
      area_id: area && area[2]?.value,
      startTime: time && moment(time[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: time && moment(time[1]).format('YYYY-MM-DD HH:mm:ss'),
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

// 市办事处排名-其他交易数据
export const cityAgencyStatDataOther = async (params = {}, options = {}) => {
  const { pageSize = 10, current = 1, area, time, ...rest } = params
  const res = await request('/auth/java-admin/report/config/cityAgencyStatDataOther', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      province_id: area && area[0]?.value,
      city_id: area && area[1]?.value,
      area_id: area && area[2]?.value,
      startTime: time && moment(time[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: time && moment(time[1]).format('YYYY-MM-DD HH:mm:ss'),
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

// 市办事处排名-氢原子交易数据
export const cityAgencyStatDataQing = async (params = {}, options = {}) => {
  const { pageSize = 10, current = 1, area, time, ...rest } = params
  const res = await request('/auth/java-admin/report/config/cityAgencyStatDataQing', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      province_id: area && area[0]?.value,
      city_id: area && area[1]?.value,
      area_id: area && area[2]?.value,
      startTime: time && moment(time[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: time && moment(time[1]).format('YYYY-MM-DD HH:mm:ss'),
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