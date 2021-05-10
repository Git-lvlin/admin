import request from '@/utils/request';

export const userList = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/java-admin/memberInfo/searchByMoreCondition', {
    method: 'POST',
    data: {
      pageNum: current,
      pageSize,
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

export const getMemberDetail = async (params = {}, options = {}) => {
  return request('/auth/java-admin/memberInfo/getMemberDetail', {
    method: 'POST',
    data: params,
    ...options
  });
}