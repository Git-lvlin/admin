import request from "@/utils/request";
import moment from "moment";

// 新集约批发单市办事处业绩列表
export const newWholesaleCityAgencyPm = async (params = {}, options = {}) => {
  const { pageSize = 10, current = 1, time, ...rest } = params
  const res = await request('/auth/stats/performance/newWholesaleCityAgencyPm', {
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

// 新集约单市办事处业绩列表统计
export const newWholesaleCityAgencyPmStats = async (params = {}, options = {}) => {
  const { time, ...rest } = params
  const res = await request('/auth/java-admin/report/config/newWholesaleCityAgencyPmStats', {
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

// 新集约业绩列表
export const newWholesaleAgencyWebPm = async (params = {}, options = {}) => {
  const { time, ...rest } = params
  const res = await request('/auth/java-admin/report/config/newWholesaleAgencyWebPm', {
      method: 'POST',
      data: {
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