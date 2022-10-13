import request from '@/utils/request';
import moment from 'moment';

export const wholesalePm = async (params, options = {}) => {
  const { pageSize, current, payTime, area, ...rest } = params
  const res = await request('/auth/stats/performance/wholesalePm', {
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
  const item = await request('/auth/java-admin/report/config/wholesalePmStats', {
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

// export const wholesalePmStats = async (params, options = {}) => {
//   const { payTime, area, ...rest } = params
//   return await request('/auth/java-admin/report/config/wholesalePmStats', {
//     method: 'POST',
//     data: {
//       startTime: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
//       endTime: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
//       provinceId: area && area?.[0]?.value,
//       cityId: area && area?.[1]?.value,
//       regionId: area && area?.[2]?.value,
//       ...rest
//     },
//     ...options
//   })
// }