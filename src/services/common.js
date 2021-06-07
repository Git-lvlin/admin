import request from '@/utils/request';

export const getExpressList = (params, options = {}) => {
  return request('/auth/order/collectiveOrder/express', {
    method: 'POST',
    data: params,
    ...options
  });
}