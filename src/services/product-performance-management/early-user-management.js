import request from '@/utils/request';
import request2 from '@/utils/request_mobile';
import moment from 'moment';

// 用户管理
export const subCompanyUser = async (params, options = {}) => {
  const { pageSize, current,  reportTime, signTime, payTime, noticeTime, sendDetectionTime, ...rest } = params
  const res = await request('/auth/healthy/screening/subCompanyUser', {
    method: 'POST',
    data: {
      orderStartTime: payTime && moment(payTime[0]).format('YYYY-MM-DD HH:mm:ss'),
      orderEndTime: payTime && moment(payTime[1]).format('YYYY-MM-DD HH:mm:ss'),
      signStartTime: signTime && moment(signTime[0]).format('YYYY-MM-DD HH:mm:ss'),
      signEndTime: signTime && moment(signTime[1]).format('YYYY-MM-DD HH:mm:ss'),
      reportStartTime: reportTime && moment(reportTime[0]).format('YYYY-MM-DD HH:mm:ss'),
      reportEndTime: reportTime && moment(reportTime[1]).format('YYYY-MM-DD HH:mm:ss'),
      noticeStartTime: noticeTime && moment(noticeTime[0]).format('YYYY-MM-DD HH:mm:ss'),
      noticeEndTime: noticeTime && moment(noticeTime[1]).format('YYYY-MM-DD HH:mm:ss'),
      sendDetectionStartTime: sendDetectionTime && moment(sendDetectionTime[0]).format('YYYY-MM-DD HH:mm:ss'),
      sendDetectionEndTime: sendDetectionTime && moment(sendDetectionTime[1]).format('YYYY-MM-DD HH:mm:ss'),
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

export const getAppSignInfo = async (params, options = {}) => {
  return await request2('/healthy/auth/aed/getSignInfo', {
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

// 待通知用户列表
export const waitNoticeUser = async (params, options = {}) => {
  const res = await request('/auth/healthy/screening/waitNoticeUser', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data.records,
    success: res.success,
    total: res.data.total
  }
}

// 通知采样用户
export const smsNoticeUser = async (params, options = {}) => {
  return await request('/auth/healthy/screening/smsNoticeUser', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 样品发货
export const ship = async (params, options = {}) => {
  return await request('/auth/healthy/screening/ship', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 退款申请
export const refund = async (params, options = {}) => {
  return await request('/auth/healthy/screening/refund', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 待采样用户
export const waitDetectionUser = async (params, options = {}) => {
  const { pageSize, current, noticeTime, ...rest } = params
  const res = await request('/auth/healthy/screening/waitDetectionUser', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      noticeStartTime: noticeTime && moment(noticeTime[0]).format('YYYY-MM-DD HH:mm:ss'),
      noticeEndTime: noticeTime && moment(noticeTime[1]).format('YYYY-MM-DD HH:mm:ss'),
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

// 添加报告
export const reportHandle = async (params, options = {}) => {
  return await request('/auth/healthy/screening/reportHandle', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 批量上传报告
export const batchReport = async (params, options = {}) => {
  return await request('/auth/healthy/screening/batchReport', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 早筛订单修改报名表
export const updateUserInfo = async (params, options = {}) => {
  return await request('/auth/healthy/aedScr/updateUserInfo', {
    method: 'POST',
    data: params,
    ...options
  })
}
