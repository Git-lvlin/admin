import request from '@/utils/request';

// 分账配置列表
export const getListByParams = async (params = {}, options = {}) => {
  return await request('/auth/finance/billConfig/getListByParams', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 分账配置详情
export const getConfigById = async (params = {}, options = {}) => {
  return await request('/auth/finance/billConfig/getConfigById', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 分账配置保存
export const saveConfig = async (params = {}, options = {}) => {
  return await request('/auth/finance/billConfig/saveConfig', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 商品列表
export const productList = async (params, options = {}) => {
  const { current, pageSize, gcId = [], ...rest } = params;
  const res = await request('/auth/goods/product/lists', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      gcId1: gcId[0],
      gcId2: gcId[1],
      gcId3: gcId[2],
      selectType: 1,
      NEGoodsSaleType: 1,
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