import request from '@/utils/request';

export const updateWholesaleAuditStatus = (params = {}, options = {}) => {
    return request('/auth/wholesale/index/updateWholesaleAuditStatus', {
      method: 'POST',
      data: params,
      ...options
    });
}
