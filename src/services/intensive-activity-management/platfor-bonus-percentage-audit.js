import request from '@/utils/request';

export const categoryAuditList = async (params = {}, options = {}) => {
  const {current,pageSize, ...rest } = params;
  const res = await request('/auth/wholesale/percentAudit/categoryAuditList', {
    method: 'POST',
    data: {
      ...rest
    },
    ...options
  });

  return {
    data: res.data.records,
    success: true,
    code:res.code
  }
}


export const categoryPercentAudit = async (params = {}, options = {}) => {
  const { ...rest } = params;
  const res = await request('/auth/wholesale/percentAudit/categoryPercentAudit', {
    method: 'POST',
    data: {
      ...rest
    },
    ...options
  });

  return {
    data: res.data.records,
    success: true,
    code:res.code
  }
}