import request from "@/utils/request";
import moment from 'moment'

//业绩统计
export const sum = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/financial/healthyGift/cityOffice/sum', {
    method: 'POST',
    data: params,
    ...options
  });

  return {
    data: res.data,
    success: true,
    code: res.code
  }
}

// 业绩分页列表
export const listPage = async (params = {}, options = {}) => {
  const { pageSize = 10, current = 1, time, ...rest } = params
  const res = await request('/auth/java-admin/financial/healthyGift/cityOffice/listPage', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      startTime: time && moment(time?.[0]).format('YYYY-MM-DD'),
      endTime: time && moment(time?.[1]).format('YYYY-MM-DD'),
      ...rest
    },
    ...options
  });

  return {
    data: res.data.records,
    success: true,
    total: res.data.totale
  }
}