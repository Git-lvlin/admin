import request from '@/utils/request';

export const adminGroup = async (params, options = {}) => {
  const res = await request('/auth/Group/adminGroup', {
    method: 'GET',
    data: params,
    ...options
  });

  return {
    data: res.data.records,
    success: true,
    total: res.data.total
  }
}

export const adminRule = async (params, options = {}) => {
  return request('/auth/rule/adminRule', {
    method: 'GET',
    data: params,
    ...options
  });
}

export const groupAdd = async (params, options = {}) => {
  return request('/auth/Group/groupAdd', {
    method: 'POST',
    data: params,
    ...options
  });
}