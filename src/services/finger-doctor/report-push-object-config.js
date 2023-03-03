import request from '@/utils/request'

// 获取配置
export const getConfig = async (params = {}, options = {}) => {
  return await request('/auth/healthy/fingerDoctor/getConfig', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 编辑配置
export const editConfig = async (params = {}, options = {}) => {
  return await request('/auth/healthy/fingerDoctor/editConfig', {
    method: 'POST',
    data: params,
    ...options
  })
}