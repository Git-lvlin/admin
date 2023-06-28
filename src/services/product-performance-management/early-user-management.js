import request from '@/utils/request';
import moment from 'moment';

// 用户管理
export const subCompanyUser = async (params, options = {}) => {
  const { pageSize, current,  reportTime, signTime, payTime, ...rest } = params
  const res = await request('/auth/healthy/screening/subCompanyUser', {
    method: 'POST',
    data: {
      orderStartTime: payTime && moment(payTime[0]).format('YYYY-MM-DD HH:mm:ss'),
      orderEndTime: payTime && moment(payTime[1]).format('YYYY-MM-DD HH:mm:ss'),
      signStartTime: signTime && moment(signTime[0]).format('YYYY-MM-DD HH:mm:ss'),
      signEndTime: signTime && moment(signTime[1]).format('YYYY-MM-DD HH:mm:ss'),
      reportStartTime: reportTime && moment(reportTime[0]).format('YYYY-MM-DD HH:mm:ss'),
      reportEndTime: reportTime && moment(reportTime[1]).format('YYYY-MM-DD HH:mm:ss'),
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  })
  return {
    data: res.data.records,
    total: res.data.total,
    success: res.success
  }
}

// 报名信息
export const getSignInfo = async (params, options = {}) => {
  return await request('/auth/healthy/screening/getSignInfo', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 取消报名
export const cancelSign = async (params, options = {}) => {
  return await request('/auth/healthy/screening/cancelSign', {
    method: 'POST',
    data: params,
    ...options
  })
}