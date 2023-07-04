import request from "@/utils/request";


export const getSignInfo = async (params = {}, options = {}) => {
    const res = await request('/auth/healthy/screening/getSignInfo', {
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