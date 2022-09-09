import request from "@/utils/request";

export const findPage = async (params = {}, options = {}) => {
    const { current, pageSize,dateRange, ...rest } = params;
    const res = await request('/auth/java-admin/financial/businessDept/findPage', {
        method: 'POST',
        data:{
          page: current,
          size: pageSize,
          begin:dateRange&&dateRange[0],
          end:dateRange&&dateRange[1],
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

export const findItemPage = async (params = {}, options = {}) => {
    const { current, pageSize, ...rest } = params;
    const res = await request('/auth/java-admin/financial/businessDept/findItemPage', {
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

export const businessDeptSum = async (params = {}, options = {}) => {
    const res = await request('/auth/java-admin/financial/businessDept/sum', {
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

export const findItemOrderPage = async (params = {}, options = {}) => {
  const { current, pageSize,dateRange, ...rest } = params;
  const res = await request('/auth/java-admin/financial/businessDept/findItemOrderPage', {
    method: 'POST',
    data: {
      begin:dateRange&&dateRange[0],
      end:dateRange&&dateRange[1],
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


export const itemOrderSum = async (params = {}, options = {}) => {
  const { current, pageSize,...rest } = params;
  const res = await request('/auth/java-admin/financial/businessDept/itemOrderSum', {
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