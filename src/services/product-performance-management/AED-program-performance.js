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
