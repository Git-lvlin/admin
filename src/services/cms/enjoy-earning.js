import request from '@/utils/request';

export const sortOperateType = (params, options = {}) => {
  return request('/auth/goods/product/sortOperateType2', {
    method: 'POST',
    data: params,
    ...options
  });
}