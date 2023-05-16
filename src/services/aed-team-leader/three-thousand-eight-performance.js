import request from "@/utils/request";

export const AEDRecordSubSum = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/financial/aedRecord/subSum', {
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

export const AEDRecordSubPage = async (params = {}, options = {}) => {
    const { current, pageSize, dateRange, ...rest } = params;
    const res = await request('/auth/java-admin/financial/aedRecord/subPage', {
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



export const AEDRecordSubAmountSum = async (params = {}, options = {}) => {
    const res = await request('/auth/java-admin/financial/aedRecord/subAmountSum', {
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


export const AEDRecordSubAmountPage = async (params = {}, options = {}) => {
    const { current, pageSize, dateRange, ...rest } = params;
    const res = await request('/auth/java-admin/financial/aedRecord/subAmountPage', {
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

  export const AEDRecordSubCommissionSum = async (params = {}, options = {}) => {
    const res = await request('/auth/java-admin/financial/aedRecord/subCommissionSum', {
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


export const AEDRecordSubCommissionPage = async (params = {}, options = {}) => {
    const { current, pageSize, dateRange, ...rest } = params;
    const res = await request('/auth/java-admin/financial/aedRecord/subCommissionPage', {
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