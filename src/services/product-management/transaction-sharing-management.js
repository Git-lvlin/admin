import request from '@/utils/request';
import moment from 'moment';

export const getListByParams = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/finance/billConfig/getListByParams', {
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
    total: res.data.total
  }
}

export const getLogListByParams = async (params = {}, options = {}) => {
    const { current, pageSize, dataRange= [], ...rest } = params;
    const res = await request('/auth/finance/billConfig/getLogListByParams', {
      method: 'POST',
      data: {
        page: current,
        size: pageSize,
        ...rest,
        startTime: dataRange[0]&& moment(dataRange[0]).valueOf(),
        endTime: dataRange[1]&& moment(dataRange[1]).valueOf(),
      },
      ...options
    });
  
    return {
      data: res.data.records,
      total: res.data.total
    }
  }

  export const updateConfigStatusById = async (params = {}, options = {}) => {
    const res = await request('/auth/finance/billConfig/updateConfigStatusById', {
      method: 'POST',
      data:params,
      ...options
    });
  
    return {
      data: res.data,
      code: res.code
    }
  }

  export const getLogById = async (params = {}, options = {}) => {
    const res = await request('/auth/finance/billConfig/getLogById', {
      method: 'POST',
      data:params,
      ...options
    });
  
    return {
      data: res.data,
      code: res.code
    }
  }