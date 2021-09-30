import request from '@/utils/request';

export const getBlindboxIncomeList = async (params = {}, options = {}) => {
    const { current, pageSize,dateRange, ...rest } = params;
    const res = await request('/auth/blindbox/Blindbox/getBlindboxIncomeList', {
      method: 'POST',
      data: {
        page: current,
        pageSize: pageSize,
        startTime1:dateRange&&dateRange[0],
        startTime2:dateRange&&dateRange[1],
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


  export const getBlindboxIncomeDetail = async (params = {}, options = {}) => {
    const { dateRange,...rest } = params;
    const res = await request('/auth/blindbox/Blindbox/getBlindboxIncomeDetail', {
    method: 'POST',
    data: {
        ...rest,
        startTime1:dateRange&&dateRange[0],
        startTime2:dateRange&&dateRange[1],
    },
    ...options
    });

    return {
    data: res.data,
    success: true,
    code: res.code
    }
}



export const getBlindboxIncomeReclaim = async (params = {}, options = {}) => {
  const { ...rest } = params;
  const res = await request('/auth/blindbox/Blindbox/getBlindboxIncomeReclaim', {
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
