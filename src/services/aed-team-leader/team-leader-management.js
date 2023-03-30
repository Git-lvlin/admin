import request from "@/utils/request";


//团长列表
export const subsidiaryList = async (params = {}, options = {}) => {
    const { current, pageSize, ...rest } = params;
    const res = await request('/auth/agency/Subsidiary/subsidiaryList', {
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


//删除团长
export const delSubsidiary = async (params = {}, options = {}) => {
    const { ...rest } = params;
    const res = await request('/auth/agency/Subsidiary/delSubsidiary', {
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

//启用团长
export const openSubsidiary = async (params = {}, options = {}) => {
  const { ...rest } = params;
  const res = await request('/auth/agency/Subsidiary/openSubsidiary', {
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

//账号开关
export const accountSwitch = async (params = {}, options = {}) => {
  const { ...rest } = params;
  const res = await request('/auth/agency/Subsidiary/accountSwitch', {
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


//添加团长
export const addSubsidiary = async (params = {}, options = {}) => {
    const {...rest } = params;
    const res = await request('/auth/agency/Subsidiary/addSubsidiary', {
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

//操作日志
export const logList = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/agency/Subsidiary/logList', {
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


export const accountCityDetail = async (params = {}, options = {}) => {
  const res = await request('/auth/agency/subsidiary/detail', {
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
  const res = await request('/auth/agency/subsidiary/edit', {
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
  const res = await request('/auth/agency/subsidiary/checkAccount', {
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
  const res = await request('/auth/agency/subsidiary/resetPwd', {
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






