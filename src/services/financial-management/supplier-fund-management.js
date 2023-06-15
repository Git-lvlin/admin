import request from '@/utils/request'
import moment from 'moment'

// 账户分页
export const platforms = async (params, options= {}) => {
  const { current=1, pageSize=10, settleTime, registTime, ...rest } = params
  const res = await request('/auth/java-admin/financial/account/page', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      settleTimeBegin: settleTime&& moment(settleTime?.[0]).format('YYYY-MM-DD'),
      settleTimeEnd: settleTime&& moment(settleTime?.[1]).format('YYYY-MM-DD'),
      registTimeBegin: registTime&& moment(registTime?.[0]).format('YYYY-MM-DD'),
      registTimeEnd: registTime&& moment(registTime?.[1]).format('YYYY-MM-DD'),
      ...rest
    },
    ...options
  })

  return {
    data: res?.data.records,
    success: res?.success,
    total: res?.data.total
  }
}

// 获取银行信息
export const findAllBanks = async (params= {}, options= {}) => {
  const res = await request('/auth/java-admin/cms/banks/findAllBanks', {
    method: 'POST',
    params: {
      ...params
    },
    ...options
  })

  return {
    data: res?.data,
    success: res?.success
  }
}

// 帐户信息详情
export const detail = async (params= {}, options= {}) => {
  const res = await request('/auth/java-admin/financial/account/detail', {
    method: 'POST',
    data: {
     ...params
    },
    ...options
  })

  return {
    data: res?.data,
    success: res?.success
  }
}

// 账户禁用/启用
export const enabledDisabledSubmit = async (params= {}, options= {}) => {
  const res = await request('/auth/java-admin/financial/account/enabledDisabledSubmit', {
    method: 'POST',
    data: {
     ...params
    },
    ...options
  })

  return {
    success: res?.success
  }
}

// 账户余额查询汇总
export const subtotal = async (params, options = {}) => {
  const { current=1, pageSize=10, settleTime, bindTime, ...rest } = params
  const res = await request('/auth/java-admin/financial/account/subtotal', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      settleTimeBegin: settleTime&& settleTime[0],
      settleTimeEnd: settleTime&& settleTime[1],
      ...rest
    },
    ...options
  })

  return {
    data: res?.data,
    success: res?.success
  }
}

