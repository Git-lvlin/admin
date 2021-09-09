import request from '@/utils/request';

export const getApplicableArea = async (params = {}, options = {}) => {
  const { current, pageSize, area = [], ...rest } = params;
  const res = await request('/auth/store/storeSetting/getApplicableArea', {
    method: 'GET',
    params: {
      page: current,
      size: pageSize,
      provinceId: area[0]?.value,
      cityId: area[1]?.value,
      regionId: area[2]?.value,
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