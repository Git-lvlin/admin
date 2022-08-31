import request from "@/utils/request";


export const agencyCityCount = async (params = {}, options = {}) => {
    const res = await request('/auth/java-admin/report/config/agencyCityCount', {
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

export const agencyCityList = async (params = {}, options = {}) => {
    const { current, pageSize, ...rest } = params;
    const res = await request('/auth/java-admin/report/config/agencyCityList', {
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





