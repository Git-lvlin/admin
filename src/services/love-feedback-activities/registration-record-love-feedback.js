import request from '@/utils/request';

// 后台基金会列表
export const admGetList = async (params, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/healthy/donate/admGetList', {
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
    success: res.success,
    total: res.data.total
  }
}

// 添加捐赠记录
export const addDonateRecord = async (params = {}, options = {}) => {
  return await request('/auth/healthy/donate/addDonateRecord', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 获取套餐信息
export const getPackageList = async (params = {}, options = {}) => {
  return await request('/auth/healthy/donate/getPackageList', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 捐赠登记查询
export const getApplyListByParams = async (params, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/healthy/donate/getApplyListByParams', {
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
    success: res.success,
    total: res.data.total
  }
}

// 后台查看限时图片
export const getDonateUrl = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/healthy/donate/getDonateUrl', {
    method: 'POST',
    data: params,
    ...options
  });

  return {
    data: res.data,
    success: res.success
  }
}

// 到账基金会列表
export const arrivalGetList = async (params, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/healthy/donate/arrivalGetList', {
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
    success: res.success,
    total: res.data.total
  }
}