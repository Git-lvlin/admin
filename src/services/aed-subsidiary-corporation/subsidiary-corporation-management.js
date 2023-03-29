import request from "@/utils/request";


//子公司列表
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


//删除子公司
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

//启用子公司
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


//添加子公司
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





