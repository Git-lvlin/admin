import request from '@/utils/request';


export const getCommissionList = async (params, options = {}) => {
    const { current, pageSize, ...rest } = params;
    const res = await request('/auth/goods/product/getCommissionList', {
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


export const getCommissionConfigBySpuId = async (params, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/goods/product/getCommissionConfigBySpuId', {
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


export const saveCommissionConfig = (params = {}, options = {}) => {
    return request('/auth/goods/product/saveCommissionConfig', {
      method: 'POST',
      data: params,
      ...options
    });
  }

export const getCommissionLog = async (params, options = {}) => {
const { current, pageSize, ...rest } = params;
const res = await request('/auth/goods/product/getCommissionLog', {
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