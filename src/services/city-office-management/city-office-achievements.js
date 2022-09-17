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
    const { current, pageSize,createTime, ...rest } = params;
    const res = await request('/auth/java-admin/financial/cityBusinessDept/listPage', {
      method: 'POST',
      data: {
        page: current,
        size: pageSize,
        begin:createTime&&createTime[0],
        end:createTime&&createTime[1],
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
    const { current, pageSize,dateRange, ...rest } = params;
    const res = await request('/auth/java-admin/financial/cityBusinessDept/cityItemOrderListPage', {
      method: 'POST',
      data: {
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
      total: res.data.total,
      code: res.code
    }
  }


export const cityTotalTradeItemListPage = async (params = {}, options = {}) => {
  const { current, pageSize,dateRange, ...rest } = params;
  const res = await request('/auth/java-admin/financial/cityBusinessDept/cityTotalTradeItemListPage', {
    method: 'POST',
    data: {
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
    total: res.data.total,
    code: res.code
  }
}


export const cityTotalTradeItemSum = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/financial/cityBusinessDept/cityTotalTradeItemSum', {
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