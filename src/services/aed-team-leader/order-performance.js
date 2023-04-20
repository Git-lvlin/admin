import request from "@/utils/request";


export const AEDOrderPmStats = async (params = {}, options = {}) => {
    const res = await request('/auth/java-admin/report/config/AEDOrderPmStats', {
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

export const AEDOrderPm = async (params = {}, options = {}) => {
    const { current, pageSize, dateRange, ...rest } = params;
    const res = await request('/auth/java-admin/report/config/AEDOrderPm', {
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



export const AEDOrderStats = async (params = {}, options = {}) => {
    const res = await request('/auth/stats/subsidiary/AEDOrderStats', {
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


export const AEDOrder = async (params = {}, options = {}) => {
    const { current, pageSize, dateRange, ...rest } = params;
    const res = await request('/auth/stats/subsidiary/AEDOrder', {
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

  export const AEDTrainingsServiceStats = async (params = {}, options = {}) => {
    const res = await request('/auth/stats/subsidiary/AEDTrainingsServiceStats', {
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


export const AEDTrainingsService = async (params = {}, options = {}) => {
    const { current, pageSize, dateRange, ...rest } = params;
    const res = await request('/auth/stats/subsidiary/AEDTrainingsService', {
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