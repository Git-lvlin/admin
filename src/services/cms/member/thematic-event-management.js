import request from "@/utils/request";



export const getActiveConfigList = async (params = {}, options = {}) => {
    const { current, pageSize, ...rest } = params;
    const res = await request('/auth/activity/subject/getActiveConfigList', {
      method: 'POST',
      data: {
        size:pageSize,
        page:current,
        ...rest
      },
      ...options
    });
  
    return {
      data: res.data.records,
      success: true,
      total: res.data.total
    }
  } 

export const saveSubjectActiveConfig = async (params = {}, options = {}) => {
    const { ...rest } = params;
    const res = await request('/auth/activity/subject/saveSubjectActiveConfig', {
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

export const getActiveConfigById = async (params = {}, options = {}) => {
const { ...rest } = params;
const res = await request('/auth/activity/subject/getActiveConfigById', {
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