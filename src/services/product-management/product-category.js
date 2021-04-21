import request from '@/utils/request';

export const category = (params = {}, options = {}) => {
  return request('/auth/goods/product/category', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const categoryAdd = (params = {}, options = {}) => {
  return request('/auth/goods/product/categoryAdd', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const categorySorts = (params = {}, options = {}) => {
  return request('/auth/goods/product/categorySorts', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const categoryDel = (params = {}, options = {}) => {
  return request('/auth/goods/product/categoryDel', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const categoryEdit = (params = {}, options = {}) => {
  return request('/auth/goods/product/categoryEdit', {
    method: 'POST',
    data: params,
    ...options
  });
}