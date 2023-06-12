import request from '@/utils/request';

export const cancelDetail = async (params = {}, options = {}) => {
  return await request('/auth/java-admin/memberInfo/cancel/detail', {
    method: 'POST',
    data: params,
    ...options
  })
}

export const cancelConfirm = async (params = {}, options = {}) => {
  return await request('/auth/java-admin/memberInfo/cancel/confirm', {
    method: 'POST',
    data: params,
    ...options
  })
}