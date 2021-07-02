import request from '@/utils/request';

export const ruleGoodsList = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;

  const res = await request('/auth/activity/Rule/ruleGoodsList', {
    method: 'GET',
    params: {
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  });

  return {
    data: res.data,
    success: true,
    total: res.data.goodsList.total
  }
}