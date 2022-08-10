import request from '@/utils/request'

// 运营商社区店 分页
export const MemberShopOperatorPage = async (params, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/store/MemberShopOperator/page', {
    method: 'GET',
    params: {
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  })
  return {
    data: res.data.records,
    total: res.data.total,
    success: res.success
  }
}