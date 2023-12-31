import request from '@/utils/request'

export const getConfig = async (params = {}, options = {}) => {
    const res = await request(`/auth/stats/report/getConfig/${params?.code}`, {
        method: 'POST',
        data:params,
        ...options
    });

    return {
        data: res.data,
        success: true,
        code: res.code
    }
}

export const addConfig = async (params = {}, options = {}) => {
    const res = await request(`/auth/stats/report/addConfig/${params?.code}`, {
        method: 'POST',
        data:params,
        ...options
    });

    return {
        data: res.data,
        success: true,
        code: res.code
    }
}