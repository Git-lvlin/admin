import request from "@/utils/request";


export const userCityCount = async (params = {}, options = {}) => {
    const res = await request('/auth/commonService/agency/userCity/count', {
        method: 'POST',
        data:params,
        ...options
    });

    return {
        data: res.data,
        success: true,
        code: res.code
    }
}

export const userCityLists = async (params = {}, options = {}) => {
    const { current, pageSize, ...rest } = params;
    const res = await request('/auth/commonService/agency/userCity/lists', {
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
      total: res.data.total,
      code: res.code
    }
  }


export const userCityIndex = async (params = {}, options = {}) => {
    const res = await request('/auth/commonService/agency/userCity/index', {
        method: 'POST',
        data:params,
        ...options
    });

    return {
        data: res.data,
        success: true,
        code: res.code
    }
}

export const userCityBatchIndex = async (params = {}, options = {}) => {
    const res = await request('/auth/commonService/agency/userCity/batchIndex', {
        method: 'POST',
        data:params,
        ...options
    });

    return {
        data: res.data,
        success: true,
        code: res.code
    }
}





