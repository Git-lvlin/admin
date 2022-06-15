import request from '@/utils/request';

// 原事件
export const metadataEvent = async (params = {}, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params;
  const res = await request('/auth/java-admin/report/config/metadataEvent', {
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

// 元事件属性
export const metadataEventProerties = async (params = {}, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params;
  const res = await request('/auth/java-admin/report/config/metadataEventProerties', {
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