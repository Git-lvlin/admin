import request from '@/utils/request';

export const positionStats = async (params = {}, options = {}) => {
    const { current, pageSize, ...rest } = params;
  
    const data = {
      page: current,
      size: pageSize,
      ...rest
    }
  
    const res = await request('/auth/stats/adv/positionStats', {
      method: 'POST',
      data,
      ...options
    });
  
    return {
      data: res.data || [],
      success: true,
      total: res.data.total,
    }
  }

export const typeStats = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;

  const data = {
    page: current,
    size: pageSize,
    ...rest
  }

  const res = await request('/auth/stats/adv/typeStats', {
    method: 'POST',
    data,
    ...options
  });

  return {
    data: res.data || [],
    success: true,
    total: res.data.total,
  }
}

export const logPage = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;

  const data = {
    page: current,
    size: pageSize,
    ...rest
  }

  const res = await request('/auth/index/advPosition/logPage', {
    method: 'POST',
    data,
    ...options
  });

  return {
    data: res.data.records || [],
    success: true,
    total: res.data.total,
  }
}