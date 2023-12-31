
import request from '@/utils/request';


export const goodsClassList = async (params = {}, options = {}) => {
    const { current, pageSize,...rest } = params;
  
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

export const getSpuList = async (params = {}, options = {}) => {
    const { current, pageSize,goodsState,wscId, ...rest } = params;
  
    const data = {
      page: current,
      size: pageSize,
      goodsState: parseInt(goodsState),
      wscId:wscId&&wscId[0],
      wscId2:wscId&&wscId[1],
      ...rest
    }
  
    const res = await request('/auth/wholesale/SpuConfig/getSpuList', {
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

  export const modifySpuCategory = (params = {}, options = {}) => {
    return request('/auth/wholesale/SpuConfig/modifySpuCategory', {
      method: 'POST',
      data: params,
      ...options
    });
  }

  export const goodsSortTop = (params = {}, options = {}) => {
    return request('/auth/wholesale/SpuConfig/toTop', {
      method: 'POST',
      data: params,
      ...options
    });
  }

  export const goodsSortTopCancel = (params = {}, options = {}) => {
    return request('/auth/wholesale/SpuConfig/cancelTop', {
      method: 'POST',
      data: params,
      ...options
    });
  }

  export const goodsMoveSort = (params = {}, options = {}) => {
  return request('/auth/wholesale/SpuConfig/moveSort', {
    method: 'POST',
    data: params,
    ...options
  });
}

  export const goodsModifySort = (params = {}, options = {}) => {
    return request('/auth/wholesale/SpuConfig/modifySort', {
      method: 'POST',
      data: params,
      ...options
    });
  }

  export const modifySpuState = (params = {}, options = {}) => {
    return request('/auth/wholesale/SpuConfig/modifySpuState', {
      method: 'POST',
      data: params,
      ...options
    });
  }

  export const putOnSpu = (params = {}, options = {}) => {
    return request('/auth/wholesale/SpuConfig/putOnSpu', {
      method: 'POST',
      data: params,
      ...options
    });
  }

  export const modifyOrderLimit = (params = {}, options = {}) => {
    return request('/auth/wholesale/SpuConfig/modifyOrderLimit', {
      method: 'POST',
      data: params,
      ...options
    });
  }