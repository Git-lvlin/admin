import request from '@/utils/request';

// 商品资质列表
export const goodsQlfList = async (params = {}, options = {}) => {
  const res = await request('/auth/supplier/qlf/goodsQlfList', {
    method: 'POST',
    data: params,
    ...options
  });

  return {
    data: res.data.records,
    total: res.data.total
  }
}

// 商品资质分类
export const goodsQlfCategory = async (params = {}, options = {}) => {
  return await request('/auth/supplier/qlf/goodsQlfCategory', {
    method: 'POST',
    data: params,
    ...options
  });
}

// 资质详情
export const goodsQlfDetail = async (params = {}, options = {}) => {
  return await request('/auth/supplier/qlf/goodsQlfDetail', {
    method: 'POST',
    data: params,
    ...options
  });
}

// 编辑/添加商品资质
export const modifyGoodsGlf = async (params = {}, options = {}) => {
  return await request('/auth/supplier/qlf/modifyGoodsQlf', {
    method: 'POST',
    data: params,
    ...options
  });
}