import request from '@/utils/request'

// 订单类型
export const orderTypes = async (params={}, options= {}) => {
  const res = await request('/auth/java-admin/financial/common/orderTypes', {
    method: 'POST',
    data: params,
    ...options
  })

  return {
    data: res.data
  }
}

export const apply20 = async (params = {}, options = {}) => {
  return request('/auth/order/auditRecord/apply20', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const audit20 = async (params = {}, options = {}) => {
  return request('/auth/order/auditRecord/audit20', {
    method: 'POST',
    data: params,
    ...options
  });
}