import request from '@/utils/request';

export const getBlindboxUseList = async (params = {}, options = {}) => {
    const { current, pageSize,dateRange,dateRange2, ...rest } = params;
    const res = await request('/auth/blindbox/Blindbox/getBlindboxUseList', {
      method: 'POST',
      data: {
        page: current,
        pageSize:pageSize,
        activityStartTime:dateRange&&dateRange[0],
        activityEndTime:dateRange&&dateRange[1],
        startTime1:dateRange2&&dateRange2[0],
        startTime2:dateRange2&&dateRange2[1],
        ...rest
      },
      ...options
    });
  
    return {
      data: res.data,
      success: true,
      total: res.data.total
    }
  }


  export const getBlindboxUseDetail = async (params = {}, options = {}) => {
    const { current, pageSize,dateRange, ...rest } = params;
    const res = await request('/auth/blindbox/Blindbox/getBlindboxUseDetail', {
      method: 'POST',
      data: {
        page: current,
        pageSize:pageSize,
        startTime1:dateRange&&dateRange[0],
        startTime2:dateRange&&dateRange[1],
        ...rest
      },
      ...options
    });
  
    return {
      data: res.data,
      success: true,
      total: res.data.total
    }
  }
