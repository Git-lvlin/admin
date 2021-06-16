import request from '@/utils/request';

// 售后订单
export const refundPendingApproval = async (params = {}, options = {}) => {
  const { page=1, size=10, ...rest } = params;
  const res = await request('/auth/java-admin/orderReturn/supplier/page', {
    method: 'POST',
    data: {
      page,
      size,
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
// 订单详情
export const refundOrderDetail = async (params = {}, options = {}) => {
  const { id } = params
  const res = await request('/auth/orderReturn/orderReturnDetail', {
    method: 'POST',
    data: {
      id
    },
    ...options
  })
  return {
     data: res.data.records,
     success: true,
     total: res.data.total
  }
}