import request from '@/utils/request';

// AED有效期设置
export const editConfig = async (params, options = {}) => {
    return await request('/auth/healthy/aedScr/editConfig', {
      method: 'POST',
      data: params,
      ...options
    })
  }

// AED有效期获取
export const getConfig = async (params, options = {}) => {
    return await request('/auth/healthy/aedScr/getConfig', {
      method: 'POST',
      data: params,
      ...options
    })
  }