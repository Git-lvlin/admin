import request from '@/utils/request';

export const getStoreList = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/store/memberShopApply/page', {
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

export const approve = async (params = {}, options = {}) => {
  return request('/auth/store/memberShopApply/approve', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const refuse = async (params = {}, options = {}) => {
  return request('/auth/store/memberShopApply/refuse', {
    method: 'POST',
    data: params,
    ...options
  });
}