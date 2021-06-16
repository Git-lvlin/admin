import request from '@/utils/request';

export const adsenseAdminList= async (params, options = {}) => {
  const {id,page,size,...rest}=params
  const res = await request('/auth/java-admin/adsense/adminList', {
    method: 'POST',
    data: {
      id,
      page,
      size,
      ...rest
    },
    ...options
  });
  return {
    code: res.code,
    data: res.data.records,
    success: res.success,
  }
}