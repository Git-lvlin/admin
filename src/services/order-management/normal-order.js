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

export const orderList3 = async (params = {}, options = {}) => {
  return request('/auth/java-admin/order/findAdminOrderList3', {
    method: 'POST',
    data: {
      ...params,
    },
    ...options
  });
}

export const orderList4 = async (params = {}, options = {}) => {
  return request('/auth/java-admin/order/findAdminOrderList4', {
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

// 修改待发货的收货地址
export const updateDeliveryInfo = async (params = {}, options = {}) => {
  return request('/auth/java-admin/order/updateDeliveryInfo', {
    method: 'POST',
    data: {
      ...params,
    },
    ...options
  });
}

// 待发货订单退款
export const closeOrderAndRefund = async (params = {}, options = {}) => {
  return request('/auth/java-admin/orderReturn/closeOrderAndRefund', {
    method: 'POST',
    data: {
      ...params,
    },
    ...options
  });
}


//订单类型
export const findAdminOrderType = async (params = {}, options = {}) => {
  return request('/auth/java-admin/order/findAdminOrderType', {
    method: 'POST',
    data: {
      ...params,
    },
    ...options
  });
}


export const findDeliveryInfo = async (params = {}, options = {}) => {
  return request('/auth/java-admin/order/findDeliveryInfo', {
    method: 'POST',
    data: {
      ...params,
    },
    ...options
  });
}