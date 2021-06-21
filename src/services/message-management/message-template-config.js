import request from '@/utils/request';

// 模板配置列表
export const messageTemplateList = async (params, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/java-admin/message/msg/config/list', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  });

  return {
    data: res.data.records,
    success: true,
    total: res.data.total
  }
}

export const updeTemplate = async (params, options = {}) => {
  return await request('/auth/java-admin/message/msg/config/update', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 平台端推送角色
export const platformRoleList = async (params, options = {}) => {
  const res = await request('/auth/java-admin/message/background/user/admin/role/list', {
    method: 'POST',
    data: params,
    ...options
  })
  return res.data
}

// 自定义消息列表
export const customMessageList = async ( params, options = {}) => {
  const { current, pageSize, ...rest } = params
  const res = await request('/auth/java-admin/message/msg/custom/list', {
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
    success: res.success,
    total: res.data.total
  }
}
// 新建自定义消息
export const customMessageAdd = async (params, options = {}) => {
  const res = await request('/auth/java-admin/message/msg/custom/add', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    success: res.success
  }
}
// 自定义消息详细
export const customMessageDetail = async (params, options = {}) => {
  const res = await request('/auth/java-admin/message/msg/custom/get', {
    method: 'POST',
    data: {
      ...params
    },
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 自定义消息审核
export const customMessageAudit = async (params, options = {}) => {
  const res = await request('/auth/java-admin/message/msg/custom/audit', {
    method: 'POST',
    data: {
      ...params
    },
    ...options
  })
  return {
    success: res.success
  }
}

// 自定义消息推送（即时推送）
export const customMessageAuditIm = async (params, options = {}) => {
  const res = await request('/auth/java-admin/message/msg/custom/push', {
    method: 'POST',
    data: {
      ...params
    },
    ...options
  })
  return {
    success: res.success
  }
}

// 自定义消息定时推送
export const customMessageAuditTim = async (params, options = {}) => {
  const res = await request('/auth/java-admin/message/msg/custom/push/timing', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    success: res.success
  }
}

// 站内信列表
export const standLetterList = async (params, options = {}) => {
  const { current, pageSize, ...rest } = params
  const res = await request('/auth/java-admin/message/msg/list', {
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
    success: res.success,
    total: res.data.total
  }
}
