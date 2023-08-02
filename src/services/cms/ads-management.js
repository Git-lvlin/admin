import request from '@/utils/request';

// 广告位分页列表
export const advPositionPage = async (params, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/index/advPosition/page', {
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

// 广告位编辑
export const advPositionSave = async (params, options = {}) => {
  return await request('/auth/index/advPosition/save', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 广告分类配置
export const advTypeSave = async (params, options = {}) => {
  return await request('/auth/index/advType/save', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 广告分类分页列表 
export const advTypePage = async (params, options = {}) => {
  return await request('/auth/index/advType/page', {
    method: 'POST',
    data: params,
    ...options
  })
}