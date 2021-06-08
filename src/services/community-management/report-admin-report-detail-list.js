import request from '@/utils/request';

export const adminReportDetailList= async (params, options = {}) => {
  const {page,size,sourceId,status}=params
  const res = await request('/auth/java-admin/report/adminReportDetailList', {
    method: 'POST',
    data: {
        sourceId,
        page,
        size,
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