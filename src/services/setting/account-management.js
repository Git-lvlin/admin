import request from '@/utils/request';

export const adminList = async (params, options = {}) => {
  const res = await request('/auth/admin/adminList', {
    method: 'GET',
    params,
    ...options
  });

  return {
    data: res.data.records,
    success: true,
    total: res.data.total
  }
}

export const adminGroup = async (params, options = {}) => {
  return request('/auth/Group/adminGroup', {
    method: 'GET',
    data: params,
    ...options
  });
}

export const adminAdd = async (params, options = {}) => {
  return request('/auth/admin/adminAdd', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const adminEdit = async (params, options = {}) => {
  return request('/auth/admin/adminEdit', {
    method: 'POST',
    data: params,
    ...options
  });
}

