import request from '@/utils/request';
import moment from "moment"

export const positionStats = async (params = {}, options = {}) => {
    const { current, pageSize, dateRange=[], ...rest } = params;
  
    const data = {
      page: current,
      size: pageSize,
      startTime: dateRange[0]&& moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: dateRange[1]&& moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest
    }
  
    const res = await request('/auth/stats/adv/positionStats', {
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

export const typeStats = async (params = {}, options = {}) => {
  const { current, pageSize, dateRange=[], ...rest } = params;

  const data = {
    page: current,
    size: pageSize,
    startTime: dateRange[0]&& moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: dateRange[1]&& moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss'),
    ...rest
  }

  const res = await request('/auth/stats/adv/typeStats', {
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

export const logPage = async (params = {}, options = {}) => {
  const { current, pageSize, dateRange=[], ...rest } = params;

  const data = {
    page: current,
    size: pageSize,
    startTime: dateRange[0]&& moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: dateRange[1]&& moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss'),
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

export const advPositionPage = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;

  const data = {
    page: current,
    size: pageSize,
    ...rest
  }

  const res = await request('/auth/index/advPosition/page', {
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


export const advGetAdType = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;

  const data = {
    page: current,
    size: pageSize,
    ...rest
  }

  const res = await request('/auth/stats/adv/getAdType', {
    method: 'POST',
    data,
    ...options
  });

  return {
    data: res.data.records || [],
    success: true,
    code: res.code
  }
}   
