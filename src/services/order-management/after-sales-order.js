import request from '@/utils/request';

// 售后订单
export const refundOrder = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params
  const res = await request('/auth/java-admin/orderReturn/page', {
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
// 订单详情
export const refundOrderDetail = async (params = {}, options = {}) => {
  const { id } = params
  const res = await request('/auth/java-admin/orderReturn/detail', {
    method: 'POST',
    data: {
      id
    },
    ...options
  })
  return {
     data: res.data,
     success: true
  }
}

// 查询物流信息
export const expressInfo = async (params={}, options={}) => {
  const res = await request('/express/express/expressInfo', {
    method: 'POST',
    data: {
      ...params
    },
    ...options
  })
  return {
    data: res?.data,
    success: res?.success
  }
}
// 订单协商记录
export const findReturnRecord = async (params={}, options={}) => {
  const res = await request('/auth/java-admin/orderReturn/findReturnRecord', {
    method: 'POST',
    data: {
      ...params
    },
    ...options
  })
  return {
    data: res?.data,
    success: res?.success
  }
}