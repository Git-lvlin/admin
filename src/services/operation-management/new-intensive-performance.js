import request from '@/utils/request';
import moment from "moment";


// 新集约批发单运营中心业绩
export const newWholesaleOperationPm = async (params = {}, options = {}) => {
  const { time, current, pageSize, ...rest } = params;
  const res = await request('/auth/stats/performance/newWholesaleOperationPm', {
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
    success: true,
    total: res.data.total
  }
}

// 新集约批发单运营中心业绩统计
export const newWholesaleOperationPmStats = async (params = {}, options = {}) => {
  const { time, ...rest } = params
  return request('/auth/java-admin/report/config/newWholesaleOperationPmStats', {
    method: 'POST',
    data: {
      startTime: time && moment(time?.[0]).format('YYYY-MM-DD'),
      endTime: time && moment(time?.[1]).format('YYYY-MM-DD'),
      ...rest
    },
    ...options
  });
}

// 新集约业绩列表
export const newWholesaleOperationWebPm = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/java-admin/report/config/newWholesaleOperationWebPm', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  });

  return {
    data: res.data.records,
    success: true,
    total: res.data.total
  }
}

// 新集约提成明细详情
export const newWholesaleOperationComDetail = async (params = {}, options = {}) => {
  const { time, ...rest } = params
  const res = await request('/auth/stats/report/java/newWholesaleOperationComDetail', {
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
    success: true,
    total: res.data.total
  }
}