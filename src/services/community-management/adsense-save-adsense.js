import request from '@/utils/request';

export const saveAdsense= async (params, options = {}) => {
  const res = await request('/auth/java-admin/adsense/saveAdsense', {
    method: 'POST',
    data: {
      params
    },
    ...options
  });
  return {
    code: res.code,
    data: res.data,
    success: res.success,
  }
}