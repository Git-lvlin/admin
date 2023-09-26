import request from '@/utils/request';
import moment from 'moment';

// 产品业绩管理-大健康供应链系统订单业绩
export const providerGoodsPm = async (params, options = {}) => {
  const { dateRange, pageSize, current, area = [], ...rest } = params
  const res = await request('/auth/healthy/provider/providerGoodsPm', {
    method: 'POST',
    data: {
      startTime: dateRange && moment(dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: dateRange && moment(dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      provinceId: area[0]?.value,
      cityId: area[1]?.value,
      areaId: area[2]?.value,
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  })
  return {
    data: res.data.records,
    success: res.success,
    total: res.data.total,
    code: res.code
  }
}