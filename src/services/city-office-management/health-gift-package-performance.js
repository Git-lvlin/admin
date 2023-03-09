import request from "@/utils/request";
import moment from 'moment'

//业绩统计
export const sum = async (params = {}, options = {}) => {
  const { time, ...rest } = params
  const res = await request('/auth/java-admin/financial/healthyGift/cityOffice/sum', {
    method: 'POST',
    data: {
      startTime: time && moment(time?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: time && moment(time?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest
    },
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
      startTime: time && moment(time?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: time && moment(time?.[1]).format('YYYY-MM-DD HH:mm:ss'),
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

// 累计业绩总金额统计
export const itemSum = async (params = {}, options = {}) => {
  return await request('/auth/java-admin/financial/healthyGift/cityOffice/itemSum', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 累计业绩明细分页列表
export const listItemPage = async (params = {}, options = {}) => {
  const { pageSize = 10, current = 1, time, ...rest } = params
  const res = await request('/auth/java-admin/financial/healthyGift/cityOffice/listItemPage', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      startTime: time && moment(time?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: time && moment(time?.[1]).format('YYYY-MM-DD HH:mm:ss'),
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