import request from '@/utils/request';

export const getCommonList = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/supplier/user/commonList', {
    method: 'GET',
    params: {
      page: current,
      size: pageSize,
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

export const helperList = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/supplier/user/helperList', {
    method: 'GET',
    params: {
      page: current,
      size: pageSize,
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

export const supplierAdd = async (params = {}, options = {}) => {
  return request('/auth/supplier/user/adds', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const helperAdds = async (params = {}, options = {}) => {
  return request('/auth/supplier/user/helperAdds', {
    method: 'POST',
    data: params,
    ...options
  });
}