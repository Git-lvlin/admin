import request from '@/utils/request';

export const setGoodsList = async (params = {}, options = {}) => {
  const { current, pageSize, gcId = [], ...rest } = params;
  const res = await request('/auth/goods/product/setGoodsList', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      gcId1: gcId[0],
      gcId2: gcId[1],
      ...rest
    },
    ...options
  });

  return {
    data: res.data.records,
    success: true,
    total: res.data.total
  }
}