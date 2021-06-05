import request from '@/utils/request';

export const orderList = async (params = {}, options = {}) => {
  return request('/auth/wholesale/SupplierOrder/getSupplierOrderList', {
    method: 'POST',
    data: {
      wholesaleType: 5,
      ...params
    },
    ...options
  });
}

export const orderShip = async (params = {}, options = {}) => {
  return request('/auth/order/collectiveOrder/orderShip', {
    method: 'POST',
    data: params,
    ...options
  });
}

