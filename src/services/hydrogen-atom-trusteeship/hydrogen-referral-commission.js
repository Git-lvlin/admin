import request from '@/utils/request'

// 推荐提成列表
export const queryMemberPromotionPage = async (params = {}, options = {}) => {
  const { current = 1, pageSize = 10,...rest } = params
  const res = await request('/auth/java-admin/memberPromotion/queryMemberPromotionPage', {
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


// 推荐提成明细列表
export const queryMemberPromotionItemPage = async (params = {}, options = {}) => {
    const { current = 1, pageSize = 10,...rest } = params
    const res = await request('/auth/java-admin/memberPromotion/queryMemberPromotionItemPage', {
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