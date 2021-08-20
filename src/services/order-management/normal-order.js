import request from '@/utils/request';

export const orderList = async (params = {}, options = {}) => {
  return request('/auth/java-admin/order/findAdminOrderList', {
    method: 'POST',
    data: {
      ...params,
    },
    ...options
  });
}

export const orderList2 = async (params = {}, options = {}) => {
  return request('/auth/java-admin/order/findAdminOrderList2', {
    method: 'POST',
    data: {
      ...params,
    },
    ...options
  });
}

export const deliverGoods = async (params = {}, options = {}) => {
  return request('/auth/java-admin/order/deliverGoods', {
    method: 'POST',
    data: {
      ...params,
    },
    ...options
  });
}

