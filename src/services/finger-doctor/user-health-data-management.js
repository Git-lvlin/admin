import request from '@/utils/request'

// 用户资料管理
export const userList = async (params = {}, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/healthy/fingerDoctor/userList', {
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


// 获取用户信息
export const getUser = async (params = {}, options = {}) => {
    const { ...rest } = params
    const res = await request('/auth/healthy/fingerDoctor/getUser', {
      method: 'POST',
      data: {
        ...rest
      },
      ...options
    })
    return {
      data: res.data,
      success: res.success,
      code: res.code
    }
  }


// 用户健康检测记录
export const userReport = async (params = {}, options = {}) => {
    const { current = 1, pageSize = 10, createTime, ...rest } = params
    const res = await request('/auth/healthy/FingerDoctor/userReport', {
      method: 'POST',
      data: {
        page: current,
        size: pageSize,
        startTime: createTime&&createTime[0],
        endTime:createTime&&createTime[1],
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