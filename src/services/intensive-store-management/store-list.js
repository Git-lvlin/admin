import request from '@/utils/request';

export const getStoreList = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/store/memberShop/page', {
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

export const changeStatus = (params = {}, options = {}) => {
  return request('/auth/store/memberShop/changeStatus', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const excelImport = (params = {}, options = {}) => {
  return request('/auth/store/memberShopApply/import', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const storeAdd = (params = {}, options = {}) => {
  return request('/auth/store/memberShopApply/add', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const refunded = (params = {}, options = {}) => {
  return request('/auth/store/storeDeposit/refunded', {
    method: 'POST',
    data: params,
    ...options
  });
}