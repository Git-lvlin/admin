import request from '@/utils/request';
import moment from 'moment';

// 产品业绩管理-大健康门店合作商订单业绩
export const providerStorePm = async (params, options = {}) => {
  const { dateRange, pageSize, current, area = [], ...rest } = params
  const res = await request('/auth/healthy/provider/storePm', {
    method: 'POST',
    data: {
      contractStartTime: dateRange?.[0]  && moment(dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      contractEndTime: dateRange?.[1] && moment(dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      provinceId: area?.[0]&&area[0]?.value,
      cityId: area?.[1]&&area[1]?.value,
      areaId: area?.[2]&&area[2]?.value,
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