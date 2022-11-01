import request from "@/utils/request";


export const cityAgentManageStats = async (params = {}, options = {}) => {
    const res = await request('/auth/java-admin/report/config/cityAgentManageStats', {
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

export const cityAgentManage = async (params = {}, options = {}) => {
    const { current, pageSize,createTime, ...rest } = params;
    const res = await request('/auth/java-admin/report/config/cityAgentManage', {
      method: 'POST',
      data: {
        page: current,
        size: pageSize,
        startTime:createTime&&createTime[0],
        endTime:createTime&&createTime[1],
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


  export const cityAgentComm = async (params = {}, options = {}) => {
    const { current, pageSize,dateRange, ...rest } = params;
    const res = await request('/auth/java-admin/report/config/cityAgentComm', {
      method: 'POST',
      data: {
        page: current,
        size: pageSize,
        startTime:dateRange&&dateRange[0],
        endTime:dateRange&&dateRange[1],
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

  export const cityAgentCommStats = async (params = {}, options = {}) => {
    const res = await request('/auth/java-admin/report/config/cityAgentCommStats', {
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

  export const cityAgentHydrogenComm = async (params = {}, options = {}) => {
    const { current, pageSize,dateRange, ...rest } = params;
    const res = await request('/auth/java-admin/report/config/cityAgentHydrogenComm', {
      method: 'POST',
      data: {
        page: current,
        size: pageSize,
        startTime:dateRange&&dateRange[0],
        endTime:dateRange&&dateRange[1],
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

  export const cityAgentHydrogenCommStats = async (params = {}, options = {}) => {
    const res = await request('/auth/java-admin/report/config/cityAgentHydrogenCommStats', {
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


  export const cityAgentWholesaleComm = async (params = {}, options = {}) => {
    const { current, pageSize,dateRange, ...rest } = params;
    const res = await request('/auth/java-admin/report/config/cityAgentWholesaleComm', {
      method: 'POST',
      data: {
        page: current,
        size: pageSize,
        startTime:dateRange&&dateRange[0],
        endTime:dateRange&&dateRange[1],
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

  export const cityAgentWholesaleCommStats = async (params = {}, options = {}) => {
    const res = await request('/auth/java-admin/report/config/cityAgentWholesaleCommStats', {
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


  export const accountCityDetail = async (params = {}, options = {}) => {
    const res = await request('/auth/agency/accountCityAgent/detail', {
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
  
  export const accountCityEdit = async (params = {}, options = {}) => {
    const res = await request('/auth/agency/accountCityAgent/edit', {
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
  
  
  export const checkAccount = async (params = {}, options = {}) => {
    const res = await request('/auth/agency/accountCityAgent/checkAccount', {
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
  
  export const accountCityResetPwd = async (params = {}, options = {}) => {
    const res = await request('/auth/agency/accountCityAgent/resetPwd', {
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
