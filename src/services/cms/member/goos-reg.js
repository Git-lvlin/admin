import request from "@/utils/request";

export const seckillingClassList = async (params = {}, options = {}) => {
    const { current,pageSize,...rest } = params;
    const res = await request('/auth/activity/Seckilling/seckillingClassList', {
        method: 'POST',
        data: {
        page: current,
        pageSize,
        ...rest
        },
        ...options
    });

    return {
        data: res.data?.records,
        success: true,
        total: res.total
    }
}

export const seckillingClassSub = async (params = {}, options = {}) => {
    const { ...rest } = params;
    const res = await request('/auth/activity/Seckilling/seckillingClassSub', {
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


export const seckillingClassDetail = async (params = {}, options = {}) => {
    const { ...rest } = params;
    const res = await request('/auth/activity/Seckilling/seckillingClassDetail', {
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


export const seckillingClassEdit = async (params = {}, options = {}) => {
    const { ...rest } = params;
    const res = await request('/auth/activity/Seckilling/seckillingClassEdit', {
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


export const seckillingClassEnd = async (params = {}, options = {}) => {
    const { ...rest } = params;
    const res = await request('/auth/activity/Seckilling/seckillingClassEnd', {
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

