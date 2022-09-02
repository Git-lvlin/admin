import request from '@/utils/request'

// 商品卡列表
export const cardList = async (params = {}, options = {}) => {
  const { current = 1, pageSize = 10,...rest } = params
  const res = await request('/auth/card/CardConfig/cardList', {
    method: 'POST',
    data: {
      page: current,
      pageSize,
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

// 商品卡添加
export const cardSub = async (params = {}, options = {}) => {
  const res = await request('/auth/card/CardConfig/cardSub', {
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

// 商品卡编辑
export const cardEdit = async (params = {}, options = {}) => {
    const res = await request('/auth/card/CardConfig/cardEdit', {
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


// 商品卡排序修改
export const cardSortSub = async (params = {}, options = {}) => {
    const res = await request('/auth/card/CardConfig/cardSortSub', {
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


// 商品卡状态修改
export const cardStatusSub = async (params = {}, options = {}) => {
    const res = await request('/auth/card/CardConfig/cardStatusSub', {
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


// 平台赠卡列表
export const platformCardList = async (params = {}, options = {}) => {
    const { current = 1, pageSize = 10,...rest } = params
    const res = await request('/auth/card/CardConfig/platformCardList', {
      method: 'POST',
      data: {
        page: current,
        pageSize,
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

// 平台赠卡编辑
export const platformCardEdit = async (params = {}, options = {}) => {
    const res = await request('/auth/card/CardConfig/platformCardEdit', {
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

// 平台赠卡状态修改
export const platformCardStatusSub = async (params = {}, options = {}) => {
    const res = await request('/auth/card/CardConfig/platformCardStatusSub', {
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