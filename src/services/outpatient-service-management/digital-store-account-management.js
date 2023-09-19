import request from "@/utils/request";

//数字化门店账号列表
export const providerGetList = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/agency/provider/getList', {
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

//数字化门店账号添加
export const providerAdd = async (params = {}, options = {}) => {
    const res = await request('/auth/agency/provider/add', {
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

//数字化门店账号添加-服务商列表
export const accountProviderList= async (params = {}, options = {}) => {
    const { current, pageSize, ...rest } = params;
    const res = await request('/auth/healthy/provider/accountProviderList', {
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

//省代编辑
export const hydrogenProvinceAgentEdit = async (params = {}, options = {}) => {
    const res = await request('/auth/agency/hydrogenProvinceAgent/edit', {
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
  
  //省代详情
  export const hydrogenProvinceAgentDetail = async (params = {}, options = {}) => {
    const res = await request('/auth/agency/hydrogenProvinceAgent/detail', {
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

  //省代账号检查
  export const checkAccount = async (params = {}, options = {}) => {
    const res = await request('/auth/agency/hydrogenProvinceAgent/checkAccount', {
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
  
  //省代重置密码
  export const hydrogenProvinceAgentResetPwd = async (params = {}, options = {}) => {
    const res = await request('/auth/agency/hydrogenProvinceAgent/resetPwd', {
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