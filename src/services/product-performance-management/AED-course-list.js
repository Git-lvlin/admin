import request from '@/utils/request';
import moment from 'moment';

// AED课程交易收款名单列表
export const bankCardInfoPage = async (params, options = {}) => {
  const { pageSize, current, payTime, ...rest } = params
  const res = await request('/auth/java-admin/aedCourses/bankCardInfo/page', {
    method: 'POST',
    data: {
      startTime: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
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

// 修改收款信息
export const bankCardInfoModify = async (params, options = {}) => {
  return await request('/auth/java-admin/aedCourses/bankCardInfo/modify', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 修改记录
export const bankCardInfoLogPage = async (params, options = {}) => {
  const { pageSize, current, ...rest } = params
  const res = await request('/auth/java-admin/aedCourses/bankCardInfo/logPage', {
    method: 'POST',
    data: {
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

