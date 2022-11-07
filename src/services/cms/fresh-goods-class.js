import request from '@/utils/request';

export const goodsClassList = async (params = {}, options = {}) => {
    const { current, pageSize, ...rest } = params;
  
    const data = {
      page: current,
      size: pageSize,
      ...rest
    }
  
    const res = await request('/auth/wholesale/SpuCategory/categoryAll', {
      method: 'POST',
      data,
      ...options
    });
  
    return {
      data: res.data.records || [],
      success: true,
      total: res.data.total,
    }
  }

export const openSwitch = (params = {}, options = {}) => {
    return request('/auth/wholesale/SpuCategory/categoryOpenSwitch', {
        method: 'POST',
        data: params,
        ...options
    });
}


export const goodsClassAdd = (params = {}, options = {}) => {
    return request('/auth/wholesale/SpuCategory/categoryAdd', {
      method: 'POST',
      data: params,
      ...options
    });
  }

export const categoryEdit = (params = {}, options = {}) => {
    return request('/auth/wholesale/SpuCategory/categoryEdit', {
      method: 'POST',
      data: params,
      ...options
    });
  }


export const saveCategory2 = (params = {}, options = {}) => {
    return request('/auth/wholesale/SpuCategory/saveCategory2', {
      method: 'POST',
      data: params,
      ...options
    });
  }