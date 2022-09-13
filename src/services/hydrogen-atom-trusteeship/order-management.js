import request from '@/utils/request'

// 代运营订单（运营商）
export const adminOrderList = async (params, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/healthy/operateOrder/adminOrderList', {
    method: 'POST',
    data: {
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

// 托管购买订单（投资人）
export const agentOrderPage = async (params, options = {}) => {
  const { current = 1, pageSize = 10, payTime, ...rest } = params
  const res = await request('/auth/java-admin/iot/agentOrder/page', {
    method: 'POST',
    data: {
      payTimeStart: payTime?.[0],
      payTimeEnd: payTime?.[1],
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

// 查询物流信息
export const expressInfo = async (params={}, options={}) => {
  return await request('/auth/express/express/expressInfo', {
    method: 'POST',
    data: {
      ...params
    },
    ...options
  })
}