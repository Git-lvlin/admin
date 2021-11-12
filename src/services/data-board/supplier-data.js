import request from '@/utils/request'

// 供应商数据
export const supplierData = async (params = {}, options = {}) => {
  const { time, current=1, pageSize=10, ...rest } = params
  const res = await request('/auth/java-admin/report/config/supplierData', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      startTime: time?.[0],
      endTime: time?.[1],
      ...rest
    },
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 供应商-商品数据
export const supplierGoodsData = async (params = {}, options = {}) => {
  const { current=1, pageSize=10, ...rest } = params
  const res = await request('/auth/java-admin/report/config/supplierGoodsData', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 供应商-秒约销售数据
export const supplierSecondSaleData = async (params = {}, options = {}) => {
  const { current=1, pageSize=10, ...rest } = params
  const res = await request('/auth/java-admin/report/config/supplierSecondSaleData', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 供应商-出售中商品
export const supplierSaleGoodsData = async (params = {}, options = {}) => {
  const { current=1, pageSize=10, ...rest } = params
  const res = await request('/auth/java-admin/report/config/supplierSaleGoodsData', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 供应商-集约销售数据
export const supplierWholesaleData = async (params = {}, options = {}) => {
  const { current=1, pageSize=10, ...rest } = params
  const res = await request('/auth/java-admin/report/config/supplierWholesaleData', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}
