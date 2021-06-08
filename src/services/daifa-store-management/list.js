import request from '@/utils/request';

export const storeList = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/store/AgentShop/page', {
    method: 'POST',
    data: {
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

export const storeDetail = (params = {}, options = {}) => {
  return request('/auth/store/AgentShop/detail', {
    method: 'GET',
    params,
    ...options,
  });
}

export const storeAdd = (params = {}, options = {}) => {
  return request('/auth/store/AgentShop/add', {
    method: 'POST',
    data: params,
    ...options,
  });
}

export const storeEdit = (params = {}, options = {}) => {
  return request('/auth/store/AgentShop/edit', {
    method: 'POST',
    data: params,
    ...options,
  });
}
