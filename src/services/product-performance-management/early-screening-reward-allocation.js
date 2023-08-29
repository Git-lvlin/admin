import request from '@/utils/request'

// 获取配置
export const getIpoConfig = async (params, options = {}) => {
  return await request('/auth/healthy/screening/getIpoConfig', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 设置配置
export const setIpoConfig = async (params, options = {}) => {
  return await request('/auth/healthy/screening/setIpoConfig', {
    method: 'POST',
    data: params,
    ...options
  })
}