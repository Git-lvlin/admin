import request from "@/utils/request";


export const cityBusinessDeptSum = async (params = {}, options = {}) => {
    const res = await request('/auth/java-admin/financial/cityBusinessDept/sum', {
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

export const listPage = async (params = {}, options = {}) => {
    const { current, pageSize, ...rest } = params;
    const res = await request('/auth/java-admin/financial/cityBusinessDept/listPage', {
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



export const cityItemOrderSum = async (params = {}, options = {}) => {
    const res = await request('/auth/java-admin/financial/cityBusinessDept/cityItemOrderSum', {
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


export const cityItemOrderListPage = async (params = {}, options = {}) => {
    const { current, pageSize, ...rest } = params;
    const res = await request('/auth/java-admin/financial/cityBusinessDept/cityItemOrderListPage', {
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
