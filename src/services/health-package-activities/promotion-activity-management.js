import request from '@/utils/request'

// 推广活动管理
export const joinStore = async (params = {}, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/healthy/card_reg/joinStore', {
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

// 参与活动设备详情
export const detail = async (params = {}, options = {}) => {
  const res = await request('/auth/healthy/card_reg/detail', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}

// 删除报名图片
export const delImg = async (params = {}, options = {}) => {
  return await request('/auth/healthy/card_reg/delImg', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 查询会员数据
export const searchByMoreCondition = async (params = {}, options = {}) => {
  return await request('/auth/java-admin/memberInfo/searchByMoreCondition', {
    method: 'POST',
    data: params,
    ...options
  })
}


// 指定送卡
export const saveCardSendLog = async (params = {}, options = {}) => {
  return await request('/auth/card/cardUser/saveCardSendLog', {
    method: 'POST',
    data: params,
    ...options
  })
}


// 指定送卡记录
export const getCardSendLogList = async (params = {}, options = {}) => {
  const { current = 1, pageSize = 5, ...rest } = params
  const res = await request('/auth/card/cardUser/getCardSendLogList', {
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