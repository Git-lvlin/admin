import request from '@/utils/request';

export const cmsWeekList = async (params = {}, options = {}) => {
    const { current, pageSize, ...rest } = params;
    
    const data = {
      page: current,
      size: pageSize,
      ...rest
    }
    const res = await request('/auth/activity/CmsWeek/cmsWeekList', {
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


  export const crazyActivityDel = (params = {}, options = {}) => {
    return request('/auth/activity/Cms/cmsStatusSub', {
      method: 'POST',
      data: params,
      ...options
    });
  }