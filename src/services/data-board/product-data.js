import request from '@/utils/request'

// 商品分类数据
export const timeGoodType = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/report/config/timeGoodType', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}
