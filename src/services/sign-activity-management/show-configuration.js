import request from '@/utils/request';



export const querySigninConfig = async (params, options = {}) => {
  const {...rest} = params;
  const res = await request('/auth/java-admin/redPacket/querySigninConfig', {
    method: 'POST',
    data: {
      ...rest
    },  
    ...options
  });

  return {
    code: res.code,
    data: res.data,
    success: res.success,
  }
}

export const updateSigninConfig = async (params, options = {}) => {
  const {...rest} = params;
  const res = await request('/auth/java-admin/redPacket/updateSigninConfig', {
    method: 'POST',
    data: {
      ...rest
    },  
    ...options
  });

  return {
    code: res.code,
    data: res.data,
    success: res.success,
  }
}