import request from '@/utils/request';

export const getApplicableArea = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/store/storeSetting/getApplicableArea', {
    method: 'GET',
    params: {
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  });

  return {
    data: res.data,
    success: true,
    total: res.data.total
  }
}

export const setApplicableArea = (params = {}, options = {}) => {
  return request('/auth/store/storeSetting/setApplicableArea', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const changeApplicableArea = (params = {}, options = {}) => {
  return request('/auth/store/storeSetting/changeApplicableArea', {
    method: 'POST',
    data: params,
    ...options
  });
}