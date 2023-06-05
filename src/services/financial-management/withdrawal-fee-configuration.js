import request from '@/utils/request'
import { amountTransform } from '@/utils/utils'

// 提现配置详情
export const withdrawConfigDetail = async (params, options = {}) => {
  const res = await request('/auth/java-admin/financial/config/withdrawConfigDetail', {
    method: 'POST',
    data: params,
    ...options
  })

  return {
    data: res?.data,
    success: res?.success
  }
}

// 提现配置修改
export const withdrawConfigUpdate = async (params, options = {}) => {
  const {
    withdrawBusinessFaxScale,
    withdrawBusinessFeeFixed,
    withdrawBusinessFeeScale,
    withdrawBusinessMax,
    withdrawBusinessMin,
    withdrawPersonFaxScale,
    withdrawPersonFeeFixed,
    withdrawPersonFeeScale,
    withdrawPersonMax,
    withdrawPersonMin
  } = params
  const res = await request('/auth/java-admin/financial/config/withdrawConfigUpdate', {
    method: 'POST',
    data: {
      ...params,
      withdrawBusinessFaxScale: amountTransform(withdrawBusinessFaxScale, '/'),
      withdrawBusinessFeeFixed: amountTransform(withdrawBusinessFeeFixed, '*'),
      withdrawBusinessFeeScale: amountTransform(withdrawBusinessFeeScale, '/'),
      withdrawBusinessMax: amountTransform(withdrawBusinessMax, '*'),
      withdrawBusinessMin: amountTransform(withdrawBusinessMin, '*'),
      withdrawPersonFaxScale: amountTransform(withdrawPersonFaxScale, '/'),
      withdrawPersonFeeFixed: amountTransform(withdrawPersonFeeFixed, '*'),
      withdrawPersonFeeScale: amountTransform(withdrawPersonFeeScale, '/'),
      withdrawPersonMax: amountTransform(withdrawPersonMax, '*'),
      withdrawPersonMin: amountTransform(withdrawPersonMin, '*')
    },
    ...options
  })

  return {
    data: res?.data,
    success: res?.success
  }
}

// 优付提现费设置详情
export const youfuWithdrawConfigDetail = async (params, options = {}) => {
  return await request('/auth/java-admin/financial/config/youfuWithdrawConfigDetail', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 优付提现费设置修改
export const youfuWithdrawConfigUpdate = async (params, options = {}) => {
  const {
    withdrawBusinessFaxScale,
    withdrawBusinessFeeFixed,
    withdrawBusinessFeeScale,
    withdrawBusinessMax,
    withdrawBusinessMin,
    withdrawPersonFaxScale,
    withdrawPersonFeeFixed,
    withdrawPersonFeeScale,
    withdrawPersonMax,
    withdrawPersonMin
  } = params
  return await request('/auth/java-admin/financial/config/youfuWithdrawConfigUpdate', {
    method: 'POST',
    data: {
      ...params,
      withdrawBusinessFaxScale: amountTransform(withdrawBusinessFaxScale, '/'),
      withdrawBusinessFeeFixed: amountTransform(withdrawBusinessFeeFixed, '*'),
      withdrawBusinessFeeScale: amountTransform(withdrawBusinessFeeScale, '/'),
      withdrawBusinessMax: amountTransform(withdrawBusinessMax, '*'),
      withdrawBusinessMin: amountTransform(withdrawBusinessMin, '*'),
      withdrawPersonFaxScale: amountTransform(withdrawPersonFaxScale, '/'),
      withdrawPersonFeeFixed: amountTransform(withdrawPersonFeeFixed, '*'),
      withdrawPersonFeeScale: amountTransform(withdrawPersonFeeScale, '/'),
      withdrawPersonMax: amountTransform(withdrawPersonMax, '*'),
      withdrawPersonMin: amountTransform(withdrawPersonMin, '*')
    },
    ...options
  })
}

// 提现代发系统详情
export const withdrawTypeDetail = async (params, options = {}) => {
  return await request('/auth/java-admin/financial/config/withdrawTypeDetail', {
    method: 'POST',
    data: params,
    ...options
  })
}