import request from '@/utils/request'

// 合同列表
export const getList = async (params, options = {}) => {
  const { pageSize=10, current=1, ...rest } = params
  const res = await request('/auth/supplier/contract/getList', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  })
  return {
    data: res.data?.records,
    success: res.success,
    total: res.data?.total
  }
}

// 获取最新协议编号
export const getPactNo = async (params, options = {}) => {
  return await request('/auth/supplier/contract/getPactNo', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 线下合同供应商列表
export const getSupplierList = async (params, options = {}) => {
  return await request('/auth/supplier/contract/getSupplierList', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 合同入驻
export const settled = async (params, options = {}) => {
  return await request('/auth/supplier/contract/settled', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 合同详情
export const getDetail = async (params, options = {}) => {
  return await request('/auth/supplier/contract/getDetail', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 获取小程序二维码
export const getMiniQr = async (params, options = {}) => {
  return await request('/auth/supplier/contract/getMiniQr', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 设备合同列表
export const deviceContract = async (params, options = {}) => {
  const { pageSize=10, current=1, ...rest } = params
  const res = await request('/auth/java-admin/iot/device/contract', {
    method: 'POST',
    data:  {
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  })
  return {
    data: res.data?.records,
    success: res.success,
    total: res.data?.total
  }
}