import request from '@/utils/request';

export const getExpressList = (params, options = {}) => {
  return request('/auth/order/collectiveOrder/express', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const categoryAll = (params = {}, options = {}) => {
  return request('/auth/goods/product/categoryAll', {
    method: 'get',
    params,
    ...options
  });
}