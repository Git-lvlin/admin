import request from '@/utils/request';

export const category = (params = {}, options = {}) => {
  return request('/auth/goods/product/category', {
    method: 'POST',
    data: params,
    ...options
  });
}