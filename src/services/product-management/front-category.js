import request from '@/utils/request';


// 商品前端分类新增
export const categoryAppAdd = async (params = {}, options = {}) => {
  return await request('/auth/goods/product/categoryAppAdd', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 商品前端分类列表
export const categoryApp = async (data = {}, options = {}) => {
  return await request('/auth/goods/product/categoryApp', {
    method: 'GET',
    params: data,
    ...options
  })
}

// 商品前端分类编辑
export const categoryAppEdit = async (params = {}, options = {}) => {
  return await request('/auth/goods/product/categoryAppEdit', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 商品前端分类排序
export const categoryAppSorts = async (params = {}, options = {}) => {
  return await request('/auth/goods/product/categoryAppSorts', {
    method: 'POST',
    data: params,
    ...options
  })
}