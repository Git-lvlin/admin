import request from '@/utils/request'

// 待投放列表
export const waitPutList = async (params, options = {}) => {
  const { current = 1, pageSize = 10, hostingPayTime, ...rest } = params
  const res = await request('/auth/healthy/deviceManage/waitPutList', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      hostingPayStartTime: hostingPayTime?.[0],
      hostingPayEndTime: hostingPayTime?.[1],
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

// 待运营列表
export const waitOperateList = async (params, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/healthy/deviceManage/waitOperateList', {
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

// 停止运营列表
export const stopOperateList = async (params, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/healthy/deviceManage/stopOperateList', {
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

// 运营中列表
export const ingOperateList = async (params, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/healthy/deviceManage/ingOperateList', {
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

// 停止托管设备列表
export const stopHostingList = async (params, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/healthy/deviceManage/stopHostingList', {
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

// 手工投放
export const handHosting = async (params, options = {}) => {
  return await request('/auth/healthy/deviceManage/handHosting', {
    method: 'POST',
    data: {
      ...params
    },
    ...options
  })
}

// 重新投放
export const resetHosting = async (params, options = {}) => {
  return await request('/auth/healthy/deviceManage/resetHosting', {
    method: 'POST',
    data: {
      ...params
    },
    ...options
  })
}

// 确认投放
export const confirmHosting = async (params, options = {}) => {
  return await request('/auth/healthy/deviceManage/confirmHosting', {
    method: 'POST',
    data: {
      ...params
    },
    ...options
  })
}

// 停止运营
export const stopOperate = async (params, options = {}) => {
  return await request('/auth/healthy/deviceManage/stopOperate', {
    method: 'POST',
    data: {
      ...params
    },
    ...options
  })
}

// 设备启用/停用
export const deviceSwitch = async (params, options = {}) => {
  return await request('/auth/healthy/deviceManage/deviceSwitch', {
    method: 'POST',
    data: {
      ...params
    },
    ...options
  })
}

// 停止运营重新投放
export const stopResetHosting = async (params, options = {}) => {
  return await request('/auth/healthy/deviceManage/stopResetHosting', {
    method: 'POST',
    data: {
      ...params
    },
    ...options
  })
}

// 停止托管
export const stopHosting = async (params, options = {}) => {
  return await request('/auth/healthy/deviceManage/stopHosting', {
    method: 'POST',
    data: {
      ...params
    },
    ...options
  })
}

// 修改设备号
export const modifyImei = async (params, options = {}) => {
  return await request('/auth/healthy/deviceManage/modifyImei', {
    method: 'POST',
    data: {
      ...params
    },
    ...options
  })
}

// 修改设备时长
export const modifyImeiTime = async (params, options = {}) => {
  return await request('/auth/healthy/deviceManage/modifyImeiTime', {
    method: 'POST',
    data: {
      ...params
    },
    ...options
  })
}

// 获取操作日志
export const getOptLog = async (params, options = {}) => {
  return await request('/auth/healthy/deviceManage/getOptLog', {
    method: 'POST',
    data: {
      ...params
    },
    ...options
  })
}