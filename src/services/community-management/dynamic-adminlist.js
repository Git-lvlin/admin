import request from '@/utils/request';

export const adminList= async (params, options = {}) => {
  const {id,page,size}=params
  const res = await request('/auth/java-admin/dynamic/adminList', {
    method: 'POST',
    data: {
      circleId:id,
      page,
      size
    },
    ...options
  });
  return {
    code: res.code,
    data: res.data.records,
    success: res.success,
  }
}