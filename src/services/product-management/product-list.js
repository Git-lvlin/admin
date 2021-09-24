import request from '@/utils/request';

export const productList = async (params, options = {}) => {
  const { current, pageSize, gcId = [], ...rest } = params;
  const res = await request('/auth/goods/product/lists', {
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
  return request('/auth/goods/product/add', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const editGoods = (params = {}, options = {}) => {
  return request('/auth/goods/product/edit', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const getDetail = (params = {}, options = {}) => {
  return request('/auth/goods/product/detail', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const onShelf = (params = {}, options = {}) => {
  return request('/auth/goods/product/onShelf', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const offShelf = (params = {}, options = {}) => {
  return request('/auth/goods/product/offShelf', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const listExport = (params = {}, options = {}) => {
  return request('/auth/goods/product/export', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const subAccountCheck = (params = {}, options = {}) => {
  return request('/auth/goods/product/subAccountCheck', {
    method: 'POST',
    data: params,
    ...options
  });
}


export const getTemplateList = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/express/express/postageList', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  });

  return {
    data: res?.data?.records,
    success: true,
    total: res?.data?.total
  }
}