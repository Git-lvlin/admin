import request from '@/utils/request';

export const getDetail = async (params = {}, options = {}) => {
  return request('/auth/store/memberShop/detail', {
    method: 'GET',
    params,
    ...options
  });
}