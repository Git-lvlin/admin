import request from '@/utils/request';
import moment from 'moment';


export const getCommissionList = async (params, options = {}) => {
    const { current, pageSize,status, ...rest } = params;
    const res = await request('/auth/goods/product/getCommissionList', {
      method: 'POST',
      data: {
        page: current,
        size: pageSize,
        status: parseInt(status),
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
    data: res.data,
    success: true,
    total: res.data.total,
    code: res.code
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
const { current, pageSize,updateTime, ...rest } = params;
const res = await request('/auth/goods/product/getCommissionLog', {
    method: 'POST',
    data: {
    page: current,
    size: pageSize,
    createTimeStart: updateTime&&moment(updateTime[0]).unix(),
    createTimeEnd:updateTime&&moment(updateTime[1]).unix(),
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

export const deleteCommissionById = (params = {}, options = {}) => {
  return request('/auth/goods/product/deleteCommissionById', {
    method: 'POST',
    data: params,
    ...options
  });
}


export const productList = async (params, options = {}) => {
  const { current, pageSize, gcId = [], ...rest } = params;
  const res = await request('/auth/goods/product/skuList', {
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