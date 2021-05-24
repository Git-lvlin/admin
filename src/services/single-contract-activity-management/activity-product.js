import request from '@/utils/request';

export const ruleGoodsList = async (params = {}, options = {}) => {
  const res = await request('/auth/activity/Rule/ruleGoodsList', {
    method: 'GET',
    params,
    ...options
  });

  return {
    data: res.data,
    success: true,
    total: res.data.goodsList.total
  }
}