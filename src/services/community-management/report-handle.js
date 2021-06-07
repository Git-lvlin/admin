import request from '@/utils/request';

export const reportHandle= async (params, options = {}) => {
  const {sourceId,status}=params
  const res = await request('/auth/java-admin/report/handle', {
    method: 'POST',
    data: {
        sourceId,
        status
    },
    ...options
  });
  return {
    code: res.code,
    data: res.data.records,
    success: res.success,
  }
}