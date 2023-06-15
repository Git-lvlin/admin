import request from '@/utils/request'
import moment from 'moment'

// 平台账户列表
export const platforms = async (params, options = {}) => {
  const res = await request('/auth/java-admin/financial/account/platforms', {
    method: 'POST',
    data: params,
    ...options
  })

  return {
    data: res?.data,
    success: res?.success
  }
}

// 账户明细
export const logPage = async (params, options = {}) => {
  const { current, pageSize, createTime, ...rest } = params
  const res = await request('/auth/java-admin/financial/account/logPage', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      begin: createTime&& moment(createTime?.[0]).format('YYYY-MM-DD'),
      end: createTime&& moment(createTime?.[0]).format('YYYY-MM-DD'),
      ...rest
    },
    ...options
  })

  return {
    data: res.data?.records,
    success: res?.success,
    total: res?.data.total
  }
}

// 平台申请提现
export const platformWithdraw = async (params, options = {}) => {
  const res = await request('/auth/java-admin/financial/account/platformWithdraw', {
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

// 平台供应链申请提现
export const supplyChainWithdraw = async (params, options = {}) => {
  const res = await request('/auth/java-admin/financial/account/supplyChainWithdraw', {
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

// 提现申请
export const apply = async (params, options = {}) => {
  return await request('/auth/java-admin/financial/withdraw/apply', {
    method: 'POST',
    data: {
      ...params
    },
    ...options
  })
}

// 提现绑卡
export const bind = async (params, options = {}) => {
  return await request('/auth/java-admin/financial/withdraw/bind', {
    method: 'POST',
    data: {
      ...params
    },
    ...options
  })
}

// 提现解绑
export const unbind = async (params, options = {}) => {
  return await request('/auth/java-admin/financial/withdraw/unbind', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 获取银行信息
export const findAllBanks = async (params= {}, options= {}) => {
  const res = await request('/auth/java-admin/cms/banks/findAllBanks', {
    method: 'POST',
    params: params,
    ...options
  })

  return {
    data: res?.data,
    success: res?.success
  }
}

// 充值申请
export const rechargeApply = async (params, options = {}) => {
  return await request('/auth/java-admin/financial/recharge/apply', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 充值详情
export const rechargeDetail = async (params, options = {}) => {
  return await request('/auth/java-admin/financial/recharge/detail', {
    method: 'POST',
    data: params,
    ...options
  })
}