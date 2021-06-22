import request from '@/utils/request'
// 提现审核管理
export const withdrawPage = async (params, options = {}) => {
  const { current, pageSize, ...rest } = params
  const res = await request('/auth/java-admin/financial/withdraw/page', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      ...rest 
    },
    ...options
  })

  return {
    data: res?.data.records,
    success: res?.success,
    total: res.data.total
  }
}

// 订单支付明细管理
export const orderPage = async (params, options = {}) => {
  const { current, pageSize, ...rest } = params
  const res = await request('/auth/java-admin/financial/trans/orderPage', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      ...rest 
    },
    ...options
  })

  return {
    data: res?.data.records,
    success: res?.success,
    total: res.data.total
  }
}

// 提成明细管理
export const commissionPage = async (params, options = {}) => {
  const { current, pageSize, ...rest } = params
  const res = await request('/auth/java-admin/financial/trans/commissionPage', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      ...rest 
    },
    ...options
  })

  return {
    data: res?.data.records,
    success: res?.success,
    total: res.data.total
  }
}

// 佣金明细管理
export const platformCommissionPage = async (params, options = {}) => {
  const { current, pageSize, ...rest } = params
  const res = await request('/auth/java-admin/financial/trans/platformCommissionPage', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      ...rest 
    },
    ...options
  })

  return {
    data: res?.data.records,
    success: res?.success,
    total: res.data.total
  }
}

// 货款明细管理
export const goodsAmountPage = async (params, options = {}) => {
  const { current, pageSize, ...rest } = params
  const res = await request('/auth/java-admin/financial/trans/goodsAmountPage', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      ...rest 
    },
    ...options
  })

  return {
    data: res?.data.records,
    success: res?.success,
    total: res.data.total
  }
}
// 售后订单明细
export const refundPage = async (params, options = {}) => {
  const { current, pageSize, ...rest } = params
  const res = await request('/auth/java-admin/financial/trans/refundPage', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      ...rest 
    },
    ...options
  })

  return {
    data: res?.data.records,
    success: res?.success,
    total: res.data.total
  }
}