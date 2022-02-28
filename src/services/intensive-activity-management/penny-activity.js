import request from '@/utils/request';

export const getActiveConfigList = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/activity/wsCent/getActiveConfigList', {
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

export const getActiveConfigById = async (params = {}, options = {}) => {
    const { ...rest } = params;
    const res = await request('/auth/activity/wsCent/getActiveConfigById', {
    method: 'POST',
    data: {
        ...rest
    },
    ...options
    });

    return {
    data: res.data,
    success: true,
    code: res.code
    }
}

export const changeStatus = async (params = {}, options = {}) => {
  const { ...rest } = params;
  const res = await request('/auth/activity/wsCent/changeStatus', {
  method: 'POST',
  data: {
      ...rest
  },
  ...options
  });

  return {
  data: res.data,
  success: true,
  code: res.code
  }
}


export const chooseWholesaleList = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/wholesale/index/chooseWholesaleList', {
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