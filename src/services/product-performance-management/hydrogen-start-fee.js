import request from '@/utils/request';
import moment from 'moment';

export const hydrogenStartUpPm = async (params, options = {}) => {
  const { pageSize, current, payTime, area, ...rest } = params
  const res = await request('/auth/stats/performance/hydrogenStartUpPm', {
    method: 'POST',
    data: {
      startTime: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      provinceId: area && area?.[0]?.value,
      cityId: area && area?.[1]?.value,
      regionId: area && area?.[2]?.value,
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  })
  const item = await request('/auth/java-admin/report/config/hydrogenStartUpPmStats', {
    method: 'POST',
    data: {
      startTime: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      provinceId: area && area?.[0]?.value,
      cityId: area && area?.[1]?.value,
      regionId: area && area?.[2]?.value,
      ...rest
    },
    ...options
  })
  return {
    data: [{res: res.data.records, total: item.data[0]}],
    total: res.data.total,
    success: res.success
  }
}

// 氢原子启动费月统计
export const hyStartUpMonthStats = async (params, options = {}) => {
  const { pageSize, current, years, quarter, ...rest } = params
  let startTime, endTime
  switch (quarter) {
    case 'q1':
      startTime = years + '-1-1',
      endTime = years + '-3-31'
      break;
    case 'q2':
      startTime = years + '-4-1',
      endTime = years + '-6-30'
      break;
    case 'q3':
      startTime = years + '-7-1',
      endTime = years + '-9-30'
      break;
    case 'q4':
      startTime = years + '-10-1',
      endTime = years + '-12-31'
      break;
    default:
      startTime = undefined,
      endTime = undefined
      break;
  }

  if(years && !quarter) {
    startTime = moment(years).startOf('years').format('YYYY-MM-DD')
    endTime = moment(years).endOf('years').format('YYYY-MM-DD')
  }

  const res = await request('/auth/stats/report/php/hyStartUpMonth', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      startTime,
      endTime,
      ...rest
    },
    ...options
  })
  const item = await request('/auth/stats/report/php/hyStartUpMonthStats', {
    method: 'POST',
    data: {
      startTime,
      endTime,
      ...rest
    },
    ...options
  })
  return {
    data: [{res: res.data.records, total: item.data[0]}],
    total: res.data.total,
    success: res.success
  }
}