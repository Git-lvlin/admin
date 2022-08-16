import request from '@/utils/request'
import moment from 'moment'

// 待投放列表
export const waitPutList = async (params, options = {}) => {
  const { current = 1, pageSize = 10, hostingPayTime, ...rest } = params
  const res = await request('/auth/healthy/deviceManage/waitPutList', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      hostingPayStartTime: hostingPayTime && moment(hostingPayTime?.[0]).unix(),
      hostingPayEndTime: hostingPayTime && moment(hostingPayTime?.[1]).unix(),
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
  const { current = 1, pageSize = 10, activationTime, stopOperateTime, ...rest } = params
  const res = await request('/auth/healthy/deviceManage/stopOperateList', {
    method: 'POST',
    data: {
      stopOperateStartTime: stopOperateTime && moment(stopOperateTime?.[0]).unix(),
      stopOperateEndTime: stopOperateTime && moment(stopOperateTime?.[1]).unix(),
      activationStartTime: activationTime && moment(activationTime?.[0]).unix(),
      activationEndTime: activationTime && moment(activationTime?.[1]).unix(),
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
  const { current = 1, pageSize = 10, hostingPayTime, stopHostingTime, ...rest } = params
  const res = await request('/auth/healthy/deviceManage/stopHostingList', {
    method: 'POST',
    data: {
      stopHostingStartTime: stopHostingTime && moment(stopHostingTime?.[0]).unix(),
      stopHostingEndTime: stopHostingTime && moment(stopHostingTime?.[1]).unix(),
      hostingPayStartTime: hostingPayTime && moment(hostingPayTime?.[0]).unix(),
      hostingPayEndTime: hostingPayTime && moment(hostingPayTime?.[1]).unix(),
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

// 停止运营托管
export const stopOperateHosting = async (params, options = {}) => {
  return await request('/auth/healthy/deviceManage/stopOperateHosting', {
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
  const res = await request('/auth/healthy/deviceManage/getOptLog', {
    method: 'POST',
    data: {
      ...params
    },
    ...options
  })
  return {
    data: res.data.records,
    total: res.data.total,
    success: res.success
  }
}

// 可绑定的社区店资质
export const bindable = async (data, options = {}) => {
  return await request('/auth/store/MemberShopOperator/bindable', {
    method: 'GET',
    params: data,
    ...options
  })
}

// 营收概况
export const getCardAndStartUpDetail = async (params, options = {}) => {
  const res = await request('/auth/healthy/deviceManage/getCardAndStartUpDetail', {
    method: 'POST',
    data: {
      ...params
    },
    ...options
  })
  return {
    data: res.data,
    total: res.data.total,
    success: res.success
  }
}

// 快递列表
export const getExpressList = async (params, options = {}) => {
  const res = await request('/auth/healthy/operateOrder/getExpressList', {
    method: 'POST',
    data: {
      ...params
    },
    ...options
  })
  return {
    data: res.data,
    total: res.data.total,
    success: res.success
  }
}