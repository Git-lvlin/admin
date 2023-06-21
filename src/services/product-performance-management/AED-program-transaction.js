import request from '@/utils/request';
import moment from 'moment';

// AED课程交易统计
export const aedCoursesTradeStats = async (params, options = {}) => {
  return await request('/auth/stats/report/aed/aedCoursesTradeStats', {
    method: 'POST',
    data: params,
    ...options
  })
}

// AED课程交易统计保存
export const aedCoursesTradeStatsSave = async (params, options = {}) => {
  return await request('/auth/stats/report/aed/aedCoursesTradeStatsSave', {
    method: 'POST',
    data: params,
    ...options
  })
}

// AED课程交易列表
export const aedCoursesTradeList = async (params, options = {}) => {
  const { pageSize = 10, current = 1, depositPayTime, aedPayTime, dcPayTime, specialTime, ...rest } = params
  const res = await request('/auth/stats/report/aed/aedCoursesTradeList', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      startDcPayTime: dcPayTime && moment(dcPayTime[0]).format('YYYY-MM-DD'),
      endDcPayTime: dcPayTime && moment(dcPayTime[1]).format('YYYY-MM-DD'),
      startAedPayTime: aedPayTime && moment(aedPayTime[0]).format('YYYY-MM-DD'),
      endAedPayTime: aedPayTime && moment(aedPayTime[1]).format('YYYY-MM-DD'),
      startDepositPayTime: depositPayTime && moment(depositPayTime[0]).format('YYYY-MM-DD'),
      endDepositPayTime: depositPayTime && moment(depositPayTime[1]).format('YYYY-MM-DD'),
      specialStartTime: specialTime && moment(specialTime[0]).format('YYYY-MM-DD'),
      specialEndTime: specialTime && moment(specialTime[1]).format('YYYY-MM-DD'),
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

// 历史线下汇总记录
export const aedStatsRecord = async (params, options = {}) => {
  return await request('/auth/stats/report/aed/aedStatsRecord', {
    method: 'POST',
    data: params,
    ...options
  })
}
