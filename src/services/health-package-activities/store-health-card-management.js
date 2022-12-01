import request from '@/utils/request'

// 健康卡列表
export const getUseCardByParams = async (params = {}, options = {}) => {
  const { remainingNum, current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/card/cardUser/getUseCardByParams', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      remainingMin: remainingNum && remainingNum.min,
      remainingMax: remainingNum && remainingNum.max,
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

// 卡使用记录
export const getUseCardByCardNo = async (params = {}, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/card/cardUser/getUseCardByCardNo', {
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