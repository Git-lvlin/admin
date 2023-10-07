import request from '@/utils/request';

// 合作商商品列表
export const provideGetListByParams = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params
  const res = await request('/auth/goods/product/provideGetListByParams', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  })
  return {
    data: res.data.records,
    total: res.data.total,
    success: res.success
  }
}

// 合作商商品分账信息保存
export const provideSetDivideInfo = async (params = {}, options = {}) => {
  return await request('/auth/goods/product/provideSetDivideInfo', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 合作商商品分账角色
export const provideGetRoleInfo = async (params = {}, options = {}) => {
  return await request('/auth/goods/product/provideGetRoleInfo', {
    method: 'POST',
    data: params,
    ...options
  })
}