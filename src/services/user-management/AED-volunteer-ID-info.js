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

// AED用户更新
export const saveAedUserInfo = async (params = {}, options = {}) => {
  return await request('/auth/healthy/aedUserInfo/saveAedUserInfo', {
    method: 'POST',
    data: params,
    ...options
  })
}

// AED志愿者考试信息
export const examResult = async (params = {}, options = {}) => {
  const { current, pageSize,...rest } = params;
  const res = await request('/auth/healthy/member/examResult', {
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

// 线下培训 编辑
export const editTrainingOffline = async (params = {}, options = {}) => {
  return await request('/auth/healthy/member/editTrainingOffline', {
    method: 'POST',
    data: params,
    ...options
  })
}

