import request from '@/utils/request';

// 模板配置列表
export const messageTemplateList = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/java-admin/message/msg/config/list', {
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
  return await request('/java-admin/message/msg/config/update', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 平台端推送角色
export const platformRoleList = async (params, options = {}) => {
  const res = await request('/java-admin/message/background/user/admin/role/list', {
    method: 'POST',
    data: params,
    ...options
  })
  return res.data
}

// 自定义消息列表
export const customMessageList = async (params, options = {}) => {
  const res = await request('/java-admin/message/msg/custom/list', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data.records,
    success: true,
    total: res.data.total
  }
}