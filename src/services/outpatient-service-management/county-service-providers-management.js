import request from '@/utils/request'
import moment from 'moment'

// 服务商列表
export const providerList = async (params = {}, options = {}) => {
  const { current, pageSize, serviceArea, signTime, ...rest } = params
  const res = await request('/auth/healthy/provider/providerList', {
    method: 'POST',
    data: {
      ...rest,
      page: current,
      size: pageSize,
      signStartTime: signTime && moment(signTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      signEndTime: signTime && moment(signTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      provinceId: serviceArea && serviceArea?.[0]?.value,
      cityId: serviceArea && serviceArea?.[1]?.value,
      areaId: serviceArea && serviceArea?.[2]?.value,
    },
    ...options
  })
  return {
    data: res.data.records,
    total: res.data.total,
    success: res.success
  }
}

// 服务商复审列表
export const providerAuditSecond = async (params = {}, options = {}) => {
  const { current, pageSize, serviceArea, signTime, ...rest } = params
  const res = await request('/auth/healthy/provider/providerAuditSecond', {
    method: 'POST',
    data: {
      ...rest,
      page: current,
      size: pageSize,
      signStartTime: signTime && moment(signTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      signEndTime: signTime && moment(signTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      provinceId: serviceArea && serviceArea?.[0]?.value,
      cityId: serviceArea && serviceArea?.[1]?.value,
      areaId: serviceArea && serviceArea?.[2]?.value,
    },
    ...options
  })
  return {
    data: res.data.records,
    total: res.data.total,
    success: res.success
  }
}

// 服务商首次审核列表
export const providerAuditFirst = async (params = {}, options = {}) => {
  const { current, pageSize, serviceArea, signTime, ...rest } = params
  const res = await request('/auth/healthy/provider/providerAuditFirst', {
    method: 'POST',
    data: {
      ...rest,
      page: current,
      size: pageSize,
      signStartTime: signTime && moment(signTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      signEndTime: signTime && moment(signTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      provinceId: serviceArea && serviceArea?.[0]?.value,
      cityId: serviceArea && serviceArea?.[1]?.value,
      areaId: serviceArea && serviceArea?.[2]?.value,
    },
    ...options
  })
  return {
    data: res.data.records,
    total: res.data.total,
    success: res.success
  }
}

// 服务商订单
export const providerOrder = async (params = {}, options = {}) => {
  const { current, pageSize, serviceArea, signTime, ...rest } = params
  const res = await request('/auth/healthy/provider/providerOrder', {
    method: 'POST',
    data: {
      ...rest,
      page: current,
      size: pageSize,
      signStartTime: signTime && moment(signTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      signEndTime: signTime && moment(signTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      provinceId: serviceArea && serviceArea?.[0]?.value,
      cityId: serviceArea && serviceArea?.[1]?.value,
      areaId: serviceArea && serviceArea?.[2]?.value,
    },
    ...options
  })
  return {
    data: res.data.records,
    total: res.data.total,
    success: res.success
  }
}

// 上传凭证详情
export const voucherDetail = async (params = {}, options = {}) => {
  return await request('/auth/healthy/provider/voucherDetail', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 服务商订单审核详情
export const getProviderOrderDetail = async (params = {}, options = {}) => {
  return await request('/auth/healthy/provider/getProviderOrderDetail', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 首次审核
export const auditFirst = async (params = {}, options = {}) => {
  return await request('/auth/healthy/provider/auditFirst', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 复审
export const auditSecond = async (params = {}, options = {}) => {
  return await request('/auth/healthy/provider/auditSecond', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 上传凭证
export const uploadVoucher = async (params = {}, options = {}) => {
  return await request('/auth/healthy/provider/uploadVoucher', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 审核终止
export const cancelProvider = async (params = {}, options = {}) => {
  return await request('/auth/healthy/provider/cancelProvider', {
    method: 'POST',
    data: params,
    ...options
  })
}
