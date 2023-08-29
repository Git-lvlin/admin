import request from '@/utils/request';

// 聊天商品列表
export const getChatListByParam = async (params, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/goods/product/getChatListByParam', {
    method: 'GET',
    params: {
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  });
  return {
    data: res.data.records,
    total: res.data.total,
    success: res.success
  }
}

// 聊天商品添加
export const chatSave = async (params, options = {}) => {
  return await request('/auth/goods/product/chatSave', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 聊天商品删除
export const deleteChat = async (params, options = {}) => {
  return await request('/auth/goods/product/deleteChat', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 聊天商品排序 
export const chatSort = async (params, options = {}) => {
  return await request('/auth/goods/product/chatSort', {
    method: 'POST',
    data: params,
    ...options
  })
}