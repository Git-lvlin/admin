import request from '@/utils/request';
import moment from 'moment';

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
           popStartTime:dateRange&&moment(dateRange[0]).valueOf(),
           popEndTime:dateRange&&moment(dateRange[1]).valueOf(),  
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