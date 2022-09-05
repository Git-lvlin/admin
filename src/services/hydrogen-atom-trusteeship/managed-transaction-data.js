import request from '@/utils/request'

// 运营商社区店 分页
export const MemberShopOperatorPage = async (params, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/store/MemberShopOperator/page', {
    method: 'GET',
    params: {
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

// 管理设备
export const devicePage = async (data, options = {}) => {
  const res = await request('/auth/store/MemberShopOperator/devicePage', {
    method: 'GET',
    params: data,
    ...options
  })
  return {
    data: res.data.records,
    total: res.data.total,
    success: res.success
  }
}

// 运营服务费金额
export const payPage = async (data, options = {}) => {
  const res = await request('/auth/store/MemberShopOperator/payPage', {
    method: 'GET',
    params: data,
    ...options
  })
  return {
    data: res.data.records,
    total: res.data.total,
    success: res.success
  }
}

// 租金缴纳记录
export const hostingLease = async (data, options = {}) => {
  const res = await request('/auth/store/hostingLease/payPage', {
    method: 'GET',
    params: data,
    ...options
  })
  return {
    data: res.data.records,
    total: res.data.total,
    success: res.success,
    monthSum: res.data.monthSum
  }
}

// 托管购买列表
export const deviceTransList = async (params, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/healthy/deviceManage/deviceTransList', {
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

// 托管购买设备数&托管购买金额
export const getHostingTotalNum = async (params, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/healthy/deviceManage/getHostingTotalNum', {
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

// 待投放设备数
export const getHostingPendingPut = async (params, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/healthy/deviceManage/getHostingPendingPut', {
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

// 待运营设备数
export const getHostingPendingNum = async (params, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/healthy/deviceManage/getHostingPendingNum', {
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

// 运营中设备数
export const getHostingIngNum = async (params, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/healthy/deviceManage/getHostingIngNum', {
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

// 终止托管设备数
export const getHostingStopNum = async (params, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/healthy/deviceManage/getHostingStopNum', {
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