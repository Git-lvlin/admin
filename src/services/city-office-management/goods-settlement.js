import request from '@/utils/request'
import moment from 'moment'

//指定商品结算单业绩
export const cityAgencyGoodsSettlement = async (params = {}, options = {}) => {
  const { pageSize = 10, current = 1, time, ...rest } = params
    const res = await request('/auth/java-admin/report/config/cityAgencyGoodsSettlement', {
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

//指定商品结算单业绩统计
export const cityAgencyGoodsSettlementStats = async (params = {}, options = {}) => {
  const { time, ...rest } = params
  const res = await request('/auth/java-admin/report/config/cityAgencyGoodsSettlementStats', {
      method: 'POST',
      data: {
        startTime: time && moment(time?.[0]).format('YYYY-MM-DD'),
        endTime: time && moment(time?.[1]).format('YYYY-MM-DD'),
        ...rest
      },
      ...options
  });

  return {
      data: res.data,
      success: true,
      total: res.data.totale
  }
}

// 指定商品结算业绩详情
export const cityAgencyGoodsSettlementOrder = async (params = {}, options = {}) => {
  const { pageSize = 10, current = 1, time, ...rest } = params
  const res = await request('/auth/java-admin/report/config/cityAgencyGoodsSettlementOrder', {
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
      total: res.data.total
  }
}
