import request from "@/utils/request";

export const userCount = async (params = {}, options = {}) => {
    const res = await request('/auth/agency/user/count', {
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

export const userLists = async (params = {}, options = {}) => {
    const { current, pageSize, ...rest } = params;
    const res = await request('/auth/agency/user/lists', {
      method: 'POST',
      data: {
        page: current,
        size: pageSize,
        ...rest
      },
      ...options
    });
  
    return {
      data: res.data.records,
      success: true,
      total: res.data.total,
      code: res.code
    }
  }

export const accountDetail = async (params = {}, options = {}) => {
    const res = await request('/auth/agency/account/detail', {
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

export const accountEdit = async (params = {}, options = {}) => {
    const res = await request('/auth/agency/account/edit', {
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

export const accountResetPwd = async (params = {}, options = {}) => {
    const res = await request('/auth/agency/account/resetPwd', {
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

export const accountCheckAccount = async (params = {}, options = {}) => {
    const res = await request('/auth/agency/account/checkAccount', {
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

export const checkAccount = async (params = {}, options = {}) => {
    const res = await request('/auth/agency/account/checkAccount', {
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