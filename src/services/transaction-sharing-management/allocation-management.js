import request from '@/utils/request';

// 分账配置列表
export const getListByParams = async (params = {}, options = {}) => {
  return await request('/auth/finance/billConfig/getListByParams', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 分账配置详情
export const getConfigById = async (params = {}, options = {}) => {
  return await request('/auth/finance/billConfig/getConfigById', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 分账配置保存
export const saveConfig = async (params = {}, options = {}) => {
  return await request('/auth/finance/billConfig/saveConfig', {
    method: 'POST',
    data: params,
    ...options
  })
}
