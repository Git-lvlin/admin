import request from '@/utils/request';
import moment from 'moment';

// AED课程业绩统计
export const aedCoursesSum = async (params, options = {}) => {
  const { payTime, ...rest } = params
  const res = await request('/auth/java-admin/commission/aedCourses/sum', {
    method: 'POST',
    data: {
      startTime: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest
    },
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// AED课程业绩分页列表
export const aedCoursesPage = async (params, options = {}) => {
  const { pageSize, current, payTime, ...rest } = params
  const res = await request('/auth/java-admin/commission/aedCourses/page', {
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

// 培训服务套餐业绩统计
export const trainServerSum = async (params, options = {}) => {
  const { payTime, ...rest } = params
  const res = await request('/auth/java-admin/commission/trainServer/sum', {
    method: 'POST',
    data: {
      startTime: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest
    },
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 培训服务套餐分页列表
export const trainServerPage = async (params, options = {}) => {
  const { pageSize, current, payTime, ...rest } = params
  const res = await request('/auth/java-admin/commission/trainServer/page', {
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

// 3800订单列表
export const coursesPage = async (params, options = {}) => {
  const { pageSize, current, payTime, ...rest } = params
  const res = await request('/auth/java-admin/financial/aedRecord/coursesPage', {
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