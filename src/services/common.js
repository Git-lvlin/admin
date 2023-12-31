import request from '@/utils/request';

export const getExpressList = async (params, options = {}) => {
  return await request('/auth/healthy/express/expressList', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const categoryAll = (params = {}, options = {}) => {
  return request('/auth/goods/product/categoryAll', {
    method: 'GET',
    params,
    ...options
  });
}

export const supplierList = (params = {}, options = {}) => {
  return request('/auth/supplier/user/commonList', {
    method: 'GET',
    params: {
      page:1,
      size: 9999,
      ...params,
    },
    ...options
  });
}

export const cacheUserAuths = (params, options = {}) => {
  return request('/auth/rule/userRule', {
    method: 'GET',
    params,
    ...options
  });
}

export const getProvinces = (params = {}, options = {}) => {
  return request('/auth/supplier/user/getProvinces', {
    method: 'GET',
    params,
    ...options
  });
}

export const getChildArea = (params = {}, options = {}) => {
  return request('/auth/supplier/user/getChildArea', {
    method: 'GET',
    params,
    ...options
  });
}
export const qlfModifyMul = async (params, options = {}) => {
  return request('/auth/supplier/qlf/modifyMul', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const checkGoodQlf = (params = {}, options = {}) => {
  return request('/auth/supplier/qlf/checkGoodQlf', {
    method: 'POST',
    data: params,
    ...options
  });
}

// 报名信息
export const getSignInfo = async (params, options = {}) => {
  return await request('/auth/healthy/screening/getSignInfo', {
    method: 'POST',
    data: params,
    ...options
  })
}

//生成小程序二维码
export const getMiniQr = async (params, options = {}) => {
  return await request('/auth/activity/activity/getMiniQr', {
    method: 'POST',
    data: params,
    ...options
  })
}