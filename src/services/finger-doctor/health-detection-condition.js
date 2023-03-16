import request from '@/utils/request'

// spuId或商品名搜索商品
export const goodsSpu = async (params = {}, options = {}) => {
  return await request('/auth/healthy/fingerDoctor/goodsSpu', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 获取方案信息
export const solutions = async (params = {}, options = {}) => {
  return await request('/auth/healthy/fingerDoctor/solutions', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 编辑方案
export const editSolutions = async (params = {}, options = {}) => {
  return await request('/auth/healthy/fingerDoctor/editSolutions', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 症状列表
export const symptom = async (params = {}, options = {}) => {
  const { current = 1, pageSize = 10, ...rest} = params
  const res = await request('/auth/healthy/fingerDoctor/symptom', {
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
    success: res.success,
    total: res.data.total
  }
}