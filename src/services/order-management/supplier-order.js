import request from '@/utils/request';

export const orderList = async (params = {}, options = {}) => {
  return request('/auth/wholesale/SupplierOrder/getSupplierOrderList', {
    method: 'POST',
    data: {
      // wholesaleType: 5,
      ...params
    },
    ...options
  });
}

export const getPurchaseOrderList = async (params = {}, options = {}) => {
  return request('/auth/wholesale/SupplierOrder/getPurchaseOrderList', {
    method: 'POST',
    data: {
      // wholesaleType: 5,
      ...params
    },
    ...options
  });
}

export const getFollowOrderList = async (params = {}, options = {}) => {
  return request('/auth/wholesale/supplierOrder/getFollowOrderList', {
    method: 'POST',
    data: {
      // wholesaleType: 5,
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

export const refundAllRetailOrders = async (params = {}, options = {}) => {
  return request('/auth/wholesale/storeOrder/refundAllRetailOrders', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const refundOrder = async (params = {}, options = {}) => {
  return request('/auth/wholesale/storeOrder/refundOrder', {
    method: 'POST',
    data: params,
    ...options
  });
}


export const modifyAddress = async (params = {}, options = {}) => {
  return request('/auth/wholesale/storeOrder/modifyAddress', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const apply5 = async (params = {}, options = {}) => {
  return request('/auth/order/auditRecord/apply5', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const audit5 = async (params = {}, options = {}) => {
  return request('/auth/order/auditRecord/audit5', {
    method: 'POST',
    data: params,
    ...options
  });
}