import request from '@/utils/request'

// 氢原子启用次数分页列表
export const queryPage = async (params = {}, options = {}) => {
  const { current = 1, pageSize = 10,dataRange, ...rest } = params
  const res = await request('/auth/java-admin/memberBootTimes/queryPage', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      startTime:dataRange&&dataRange[0],
      endTime:dataRange&&dataRange[1],
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

// 修改氢原子启用次数
export const modify = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/memberBootTimes/modify', {
    method: 'POST',
    data: params,
    ...options
  })
  
  return {
    data: res.data,
    success: res.success,
    code: res.code
  }
}

// 添加氢原子启用次数
export const save = async (params = {}, options = {}) => {
    const res = await request('/auth/java-admin/memberBootTimes/save', {
      method: 'POST',
      data: params,
      ...options
    })
    
    return {
      data: res.data,
      success: res.success,
      code: res.code
    }
  }


// 查询氢原子启用次数信息
export const queryMemberBootTimes = async (params = {}, options = {}) => {
    const res = await request('/auth/java-admin/memberBootTimes/queryMemberBootTimes', {
      method: 'POST',
      data: params,
      ...options
    })
    
    return {
      data: res.data,
      success: res.success,
      code: res.code
    }
  }