import request from "@/utils/request"
import moment from 'moment'

// 启动费业绩统计
export const sum = async (params = {}, options = {}) => {
  const { payTime, ...rest } = params
  const res = await request('/auth/java-admin/financial/doctorBoot/cityOffice/sum', {
    method: 'POST',
    data: {
      startTime: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
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

// 启动费业绩分页列表
export const cityOffice = async (params = {}, options = {}) => {
  const { current = 1, pageSize = 10, payTime, ...rest } = params;
  const res = await request('/auth/java-admin/financial/doctorBoot/cityOffice/page', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      startTime: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest
    },
    ...options
  });

  return {
    data: res.data.records,
    success: true,
    total: res.data.total,
    code: res.code
  }
}

// 累计金额统计
export const itemSum = async (params = {}, options = {}) => {
  return await request('/auth/java-admin/financial/doctorBoot/cityOffice/itemSum', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 累计业绩明细分页列表
export const listItemPage = async (params = {}, options = {}) => {
  const { pageSize = 10, current = 1, time, ...rest } = params
  const res = await request('/auth/java-admin/financial/doctorBoot/cityOffice/itemPage', {
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
    total: res.data.total
  }
}