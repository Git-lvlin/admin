import request from '@/utils/request';

export const cancelList = async (params = {}, options = {}) => {
  const { current, pageSize,type, ...rest } = params;
  const res = await request('/auth/java-admin/memberInfo//cancel/cancelList', {
    method: 'POST',
    data: {
      page: current,
      size:pageSize,
      type:parseInt(type),
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