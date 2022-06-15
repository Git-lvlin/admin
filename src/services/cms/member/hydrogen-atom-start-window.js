import request from '@/utils/request';

export const findPop = async (params = {}, options = {}) => {
    const { ...rest } = params;
    const res = await request('/auth/java-admin/cms/imeiPop/findPop', {
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

export const saveOrUpdate = async (params = {}, options = {}) => {
    const { dateRange,...rest } = params;
    const res = await request('/auth/java-admin/cms/imeiPop/saveOrUpdate', {
        method: 'POST',
        data: {
           popStartTime:dateRange[0],
           popEndTime:dateRange[1],  
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