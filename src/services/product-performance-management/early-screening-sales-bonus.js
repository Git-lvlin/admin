import request from '@/utils/request'

// 早筛销售业绩
export const ipoList = async (params, options = {}) => {
  const { pageSize, current, ...rest } = params
  const res = await request('/auth/healthy/screening/ipoList', {
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

// 早筛销售人IPO奖管理
export const ipoManagerList = async (params, options = {}) => {
  const { pageSize, current, ...rest } = params
  const res = await request('/auth/healthy/screening/ipoManagerList', {
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

// 操作日志
export const logList = async (params, options = {}) => {
  const { pageSize, current, ...rest } = params
  const res = await request('/auth/healthy/screening/logList', {
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

// 申请
export const ipoApply = async (params, options = {}) => {
  return await request('/auth/healthy/screening/ipoApply', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 审核
export const ipoAudit = async (params, options = {}) => {
  return await request('/auth/healthy/screening/ipoAudit', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 通知
export const ipoNotice = async (params, options = {}) => {
  return await request('/auth/healthy/screening/ipoNotice', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 早筛销售奖励详情
export const rewardDetail = async (params, options = {}) => {
  const res = await request('/auth/healthy/screening/rewardDetail', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 申请|审核预览
export const countShowPre = async (params, options = {}) => {
  return await request('/auth/healthy/screening/countShowPre', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 销售人早筛体检单数
export const ipoDetail = async (params, options = {}) => {
  const res = await request('/auth/healthy/screening/ipoDetail', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data
  }
}

// 销售人早筛体检单数分页
export const ipoDetailPage = async (params, options = {}) => {
  const { pageSize, current, ...rest } = params
  const res = await request('/auth/healthy/screening/ipoDetailPage', {
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

// 销售人早筛体检单数实时查询
export const ipoDetailPageReal = async (params, options = {}) => {
  const { pageSize, current, ...rest } = params
  const res = await request('/auth/healthy/screening/ipoDetailPageReal', {
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