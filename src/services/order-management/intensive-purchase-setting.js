import request from '@/utils/request'

export const setConfigByCode = async (params = {}, options = {}) => {
  return await request('/auth/wholesale/SpuConfig/setConfigByCode', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const getConfigByCode = async (params = {}, options = {}) => {
  return await request('/auth/wholesale/SpuConfig/getConfigByCode', {
    method: 'POST',
    data: params,
    ...options
  });
}