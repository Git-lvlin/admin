import request from '@/utils/request';

export const productList = async (params, options = {}) => {
  const { current, pageSize, gcId = [], ...rest } = params;
  const res = await request('/auth/goods/Product_Purchase/lists', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      gcId1: gcId[0],
      gcId2: gcId[1],
      ...rest
    },
    ...options
  });

  return {
    data: res.data.records,
    success: true,
    total: res.data.total
  }
}

export const getConfig = (params = {}, options = {}) => {
  return request('/auth/goods/product/getConfig', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const addGoods = (params = {}, options = {}) => {
  return request('/auth/goods/Product_Purchase/add', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const editGoods = (params = {}, options = {}) => {
  return request('/auth/goods/Product_Purchase/edit', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const getDetail = (params = {}, options = {}) => {
  return request('/auth/goods/Product_Purchase/detail', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const onShelf = (params = {}, options = {}) => {
  return request('/auth/goods/Product_Purchase/onShelf', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const offShelf = (params = {}, options = {}) => {
  return request('/auth/goods/Product_Purchase/offShelf', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const listExport = (params = {}, options = {}) => {
  return request('/auth/goods/Product_Purchase/export', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const subAccountCheck = (params = {}, options = {}) => {
  return request('/auth/goods/Product_Purchase/subAccountCheck', {
    method: 'POST',
    data: params,
    ...options
  });
}
