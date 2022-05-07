import request from '@/utils/request'

// 设备列表
export const findDevicePage = async (params = {}, options = {}) => {
  const { current = 1, pageSize = 10, createTime, ...rest } = params
  const res = await request('/auth/java-admin/iot/memberDevice/findDevicePage', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      tradeStartTime: createTime?.[0],
      tradeEndTime: createTime?.[1],
      ...rest
    },
    ...options
  })
  return {
    data: res.data.records,
    success: res.success,
    total: res.data.total
  }
}

// 设备操作
export const opt = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/iot/device/opt', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 氢原子机器管理分成
export const divideCommissions = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/financial/hydrogenDivide/divideCommissions', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 修改机器单次使用时长
export const updateUseTime = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/iot/member/updateUseTime', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 开启缴费入口
export const afterPaymentSetting = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/iot/device/after-payment-setting', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}