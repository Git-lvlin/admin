import request from '@/utils/request';

export const adminReportList= async (params, options = {}) => {
  const {page,size,status,type}=params
  const res = await request('/auth/java-admin/report/adminReportList', {
    method: 'POST',
    data: {
        page,
        size,
        status,
        type
    },
    ...options
  });
  return {
    code: res.code,
    data: res.data.records,
    success: res.success,
  }
}