import request from '@/utils/request';

export const findByways = async (params, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/java-admin/cms/comment/findByways', {
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
    total: res.data.total
  }
}

export const addCheck = (params = {}, options = {}) => {
  return request('/auth/java-admin/cms/comment/addCheck', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const check = (params = {}, options = {}) => {
  return request('/auth/java-admin/cms/comment/check', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const updGoodsComment = (params = {}, options = {}) => {
  return request('/auth/java-admin/cms/comment/updGoodsComment', {
    method: 'POST',
    data: params,
    ...options
  });
}



export const findContent = async (params, options = {}) => {
    return request('/auth/java-admin/cms/comment/findContent', {
        method: 'POST',
        data: params,
        ...options
      });
}



export const findPageVirtual = async (params, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/java-admin/cms/comment/findPageVirtual', {
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
    total: res.data.total
  }
}

export const addVirtual = async (params, options = {}) => {
  return request('/auth/java-admin/cms/comment/addVirtual', {
      method: 'POST',
      data: params,
      ...options
    });
}

export const findVirtual = async (params, options = {}) => {
  return request('/auth/java-admin/cms/comment/findVirtual', {
      method: 'POST',
      data: params,
      ...options
    });
}

export const updateVirtual = async (params, options = {}) => {
  return request('/auth/java-admin/cms/comment/updateVirtual', {
      method: 'POST',
      data: params,
      ...options
    });
}

export const deleteVirtual = async (params, options = {}) => {
  return request('/auth/java-admin/cms/comment/deleteVirtual', {
      method: 'POST',
      data: params,
      ...options
    });
}