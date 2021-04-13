import request from '@/utils/request';

export const adminList = async (params, options = {}) => {
  const res = await request('/auth/admin/adminList', {
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

