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
        total: res.data.total
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


//获取配置开关
export const getGoodsConfig = async (params = {}, options = {}) => {
    const { ...rest } = params;
    const res = await request('/auth/goods/product/getGoodsConfig', {
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

//保存商品配置开关
export const setGoodsConfig = async (params = {}, options = {}) => {
    const { ...rest } = params;
    const res = await request('/auth/goods/product/setGoodsConfig', {
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

