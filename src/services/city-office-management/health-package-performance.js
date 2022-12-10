import request from "@/utils/request"
import moment from "moment"

// 市办事处健康套餐业绩
export const cardCityAgencyPm = async (params = {}, options = {}) => {
  const { pageSize = 10, current = 1, time, ...rest } = params
  const res = await request('/auth/java-admin/report/config/cardCityAgencyPm', {
      method: 'POST',
      data: {
        page: current,
        size: pageSize,
        startTime: time && moment(time?.[0]).format('YYYY-MM-DD'),
        endTime: time && moment(time?.[1]).format('YYYY-MM-DD'),
        ...rest
      },
      ...options
  });

  return {
      data: res.data.records,
      success: res.success,
      total: res.data.total
  }
}

// 市办事处健康套餐统计
export const cardCityAgencyPmStats = async (params = {}, options = {}) => {
  const { time, ...rest } = params
  const res = await request('/auth/java-admin/report/config/cardCityAgencyPmStats', {
      method: 'POST',
      data: {
        startTime: time && moment(time?.[0]).format('YYYY-MM-DD'),
        endTime: time && moment(time?.[1]).format('YYYY-MM-DD'),
        ...rest
      },
      ...options
  });

  return {
      data: res.data?.[0],
      success: res.success
  }
}

// 健康套餐业绩
export const cardCityAgencyOrder = async (params = {}, options = {}) => {
  const { pageSize = 10, current = 1, time, ...rest } = params
  const res = await request('/auth/java-admin/report/config/cardCityAgencyOrder', {
      method: 'POST',
      data: {
        page: current,
        size: pageSize,
        startTime: time && moment(time?.[0]).format('YYYY-MM-DD'),
        endTime: time && moment(time?.[1]).format('YYYY-MM-DD'),
        ...rest
      },
      ...options
  });

  return {
      data: res.data.records,
      success: res.success,
      total: res.data.total
  }
}