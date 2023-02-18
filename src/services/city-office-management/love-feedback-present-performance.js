import request from "@/utils/request";
import moment from "moment";

// 孝爱礼包-市办事处订单业绩
export const loveGiftOrder = async (params = {}, options = {}) => {
  const { pageSize = 10, current = 1, time, ...rest } = params
  const res = await request('/auth/java-admin/report/config/loveGiftOrder', {
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
      success: res.success,
      total: res.data.total
  }
}

// 孝爱礼包-市办事处订单业绩统计
export const loveGiftOrderStats = async (params = {}, options = {}) => {
  const { time, ...rest } = params
  const res = await request('/auth/java-admin/report/config/loveGiftOrderStats', {
      method: 'POST',
      data: {
        startTime: time && moment(time?.[0]).format('YYYY-MM-DD'),
        endTime: time && moment(time?.[1]).format('YYYY-MM-DD'),
        ...rest
      },
      ...options
  });

  return {
      data: res.data?.[0],
      success: res.success
  }
}

// 孝爱礼包-市办事处订单业绩详情
export const loveGiftOrderDetail = async (params = {}, options = {}) => {
  const { time, ...rest } = params
  const res = await request('/auth/java-admin/report/config/loveGiftOrderDetail', {
      method: 'POST',
      data: {
        startTime: time && moment(time?.[0]).format('YYYY-MM-DD'),
        endTime: time && moment(time?.[1]).format('YYYY-MM-DD'),
        ...rest
      },
      ...options
  });

  return {
      data: res.data.records,
      success: res.success,
      total: res.data.total
  }
}