import request from '@/utils/request';

export const singleGroupList = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/activity/group/singleGroupList', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
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

export const groupMemberList = (params = {}, options = {}) => {
  return request('/auth/activity/group/groupMemberList', {
    method: 'POST',
    data: params,
    ...options
  });
}