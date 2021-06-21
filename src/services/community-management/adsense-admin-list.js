import request from '@/utils/request';

export const adsenseAdminList= async (params, options = {}) => {
  const {id,current,pageSize,...rest}=params
  const res = await request('/auth/java-admin/adsense/adminList', {
    method: 'POST',
    data: {
      id,
      page:current,
      size:pageSize,
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