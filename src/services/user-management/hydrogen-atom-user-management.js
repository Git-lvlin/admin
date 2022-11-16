import request from '@/utils/request';

export const queryPage = async (params = {}, options = {}) => {
  const { current, pageSize,...rest } = params;
  const res = await request('/auth/java-admin/deviceFreeUse/queryPage', {
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

export const deviceFreeUseSave = (params = {}, options = {}) => {
  const { time,...rest } = params;
    return request('/auth/java-admin/deviceFreeUse/save', {
      method: 'POST',
      data: {
        freeStartTime:time&&time[0],
        freeEndTime:time&&time[1],
        ...rest
      },
      ...options
    });
}

export const queryByMobile = (params = {}, options = {}) => {
  return request('/auth/java-admin/deviceFreeUse/queryByMobile', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const queryLogPage =async (params = {}, options = {}) => {
  const { current, pageSize,...rest } = params;
  const res = await request('/auth/java-admin/deviceFreeUse/queryLogPage', {
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

export const queryById = (params = {}, options = {}) => {
  return request('/auth/java-admin/deviceFreeUse/queryById', {
    method: 'POST',
    data: params,
    ...options
  });
}