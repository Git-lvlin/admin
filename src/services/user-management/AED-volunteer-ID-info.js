import request from '@/utils/request';

// AED用户查询
export const getAedUserInfoListByParams = async (params = {}, options = {}) => {
  const { current, pageSize,...rest } = params;
  const res = await request('/auth/healthy/aedUserInfo/getAedUserInfoListByParams', {
    method: 'POST',
    data: {
      page: current,
      size:pageSize,
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