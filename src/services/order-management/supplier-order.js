import request from '@/utils/request';

export const getSupplierOrderList = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/wholesale/SupplierOrder/getSupplierOrderList', {
    method: 'get',
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

export const getSupplierOrderDetail = (params = {}, options = {}) => {
  return request('/auth/wholesale/SupplierOrder/getSupplierOrderDetail', {
    method: 'get',
    params,
    ...options
  });
}