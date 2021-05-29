import request from '@/utils/request';

export const commonSpuList= async (params = {}, options = {}) => {
    const { page,pageSize} = params;
    console.log('params',params)
    const res = await request('/auth/activity/Goods/commonSpuList', {
      method: 'POST',
      data: {
        page,
        pageSize,
        // ...rest
      },
      ...options
    });
  
    return {
      data: res.data.records,
      success: true,
      total: res.data.total
    }
  }