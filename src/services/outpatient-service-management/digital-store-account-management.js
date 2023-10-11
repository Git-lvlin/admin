import request from "@/utils/request";
import moment from 'moment'

//数字化门店账号列表
export const providerGetList = async (params = {}, options = {}) => {
  const { current, pageSize, serviceArea, ...rest } = params;
  const res = await request('/auth/agency/provider/getList', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      provinceId: serviceArea?.[0] && serviceArea?.[0].value,
      cityId: serviceArea?.[1] && serviceArea?.[1].value,
      areaId: serviceArea?.[2] && serviceArea?.[2].value,
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

//数字化门店账号编辑
export const providerEdit = async (params = {}, options = {}) => {
    const res = await request('/auth/agency/provider/edit', {
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
  
  //数字化门店账号详情
  export const providerDetail = async (params = {}, options = {}) => {
    const res = await request('/auth/agency/provider/detail', {
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

  //数字化门店账号检查
  export const providerCheckAccount = async (params = {}, options = {}) => {
    const res = await request('/auth/agency/provider/checkAccount', {
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
  
  //数字化门店账号重置密码
  export const providerResetPwd = async (params = {}, options = {}) => {
    const res = await request('/auth/agency/provider/resetPwd', {
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


//数字化门店账号添加服务商
export const accountAddProvider = async (params = {}, options = {}) => {
  const res = await request('/auth/healthy/provider/accountAddProvider', {
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