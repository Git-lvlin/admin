import request from '@/utils/request';

// 敏感词列表
export const getSensitiveListByParams = async (params = {}, options = {}) => {
  const { gc, current, pageSize, ...rest } = params;
  const res = await request('/auth/goods/product/getSensitiveListByParams', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      gcId1: gc && gc[0],
      gcId2: gc && gc[1],
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

// 敏感词编辑
export const editSensitiveData = async (params = {}, options = {}) => {
  return request('/auth/goods/product/editSensitiveData', {
    method: 'POST',
    data: params,
    ...options
  });
}

// 敏感词追加、删除
export const appendSensitiveData = async (params = {}, options = {}) => {
  return request('/auth/goods/product/appendSensitiveData', {
    method: 'POST',
    data: params,
    ...options
  });
}

// 敏感词新增
export const saveAedUserInfo = async (params = {}, options = {}) => {
  return request('/auth/goods/product/saveSensitiveData', {
    method: 'POST',
    data: params,
    ...options
  });
}

// 敏感词详情
export const detailSensitiveData = async (params = {}, options = {}) => {
  return request('/auth/goods/product/detailSensitiveData', {
    method: 'POST',
    data: params,
    ...options
  });
}

// 含违禁词敏感词商品
export const getWordCheckListByParams = async (params = {}, options = {}) => {
  const { gc, current, pageSize, ...rest } = params;
  const res = await request('/auth/goods/product/getWordCheckListByParams', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      gcId1: gc && gc[0],
      gcId2: gc && gc[1],
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

// 更新状态
export const changeSensitiveStatus = async (params = {}, options = {}) => {
  return request('/auth/goods/product/changeSensitiveStatus', {
    method: 'POST',
    data: params,
    ...options
  });
}

// 查找已处理过的分类
export const getEditedCategoryList = async (params = {}, options = {}) => {
  return request('/auth/goods/product/getEditedCategoryList', {
    method: 'POST',
    data: params,
    ...options
  });
}