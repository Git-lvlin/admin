import request from "@/utils/request";

//省代列表
export const configHpa = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/java-admin/report/config/hpa', {
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