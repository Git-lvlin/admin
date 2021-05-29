import request from '@/utils/request';

export const spaceInfoList = async (params = {}, options = {}) => {
  const { current, pageSize, status, ...rest } = params;

  const data = {
    page: current,
    size: pageSize,
    ...rest
  }
  if (status) {
    data.status = Number(status);
  }
  const res = await request('/auth/activity/Activity/spaceInfoList', {
    method: 'POST',
    data,
    ...options
  });

  return {
    data: res.data.records || [],
    success: true,
    total: res.data.total,
  }
}

export const spaceAdd = (params = {}, options = {}) => {
  return request('/auth/activity/Activity/spaceAdd', {
    method: 'POST',
    data: params,
    ...options
  });
}


export const saveMoneyList = async (params = {}, options = {}) => {
  const { current, pageSize, status, ...rest } = params;

  const data = {
    page: current,
    size: pageSize,
    ...rest
  }
  if (status) {
    data.status = Number(status);
  }
  const res = await request('/auth/activity/Goods/wholesaleGoodsList', {
    method: 'POST',
    data,
    ...options
  });

  return {
    data: res.data.records || [],
    success: true,
    total: res.data.total,
  }
}
export const hotGoosList = async (params = {}, options = {}) => {
  const { current, pageSize, status, ...rest } = params;

  const data = {
    page: current,
    size: pageSize,
    ...rest
  }
  if (status) {
    data.status = Number(status);
  }
  const res = await request('/auth/activity/Goods/goodsTagList', {
    method: 'POST',
    data,
    ...options
  });

  return {
    data: res.data.records || [],
    success: true,
    total: res.data.total,
  }
}
export const crazyDateList = async (params = {}, options = {}) => {
  const { current, pageSize, status, ...rest } = params;

  const data = {
    page: current,
    size: pageSize,
    ...rest
  }
  const res = await request('/auth/activity/Cms/cmsList', {
    method: 'POST',
    data,
    ...options
  });

  return {
    data: res.data.records || [],
    success: true,
    total: res.data.total,
  }
}


export const hotGoosAdd = (params = {}, options = {}) => {
  return request('/auth/activity/Goods/goodsTagSub', {
    method: 'POST',
    data: params,
    ...options
  });
}
export const saveMoneyAdd = (params = {}, options = {}) => {
  return request('/auth/activity/Goods/wholesaleGoodsSub', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const hotGoosOperation = (params = {}, options = {}) => {
  return request('/auth/activity/Goods/goodsTagStatusSub', {
    method: 'POST',
    data: params,
    ...options
  });
}


export const memberOperation = (params = {}, options = {}) => {
  return request('/auth/activity/Activity/spanceInfoStatusEdit', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const goosAllList = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;

  const data = {
    page: current,
    pageSize: pageSize,
    ...rest
  }
  const res = await request('/auth/activity/Goods/wholesaleTransGoodsList', {
    method: 'POST',
    data,
    ...options
  });

  return {
    data: res.data.records || [],
    success: true,
    total: res.data.total,
  }
}

export const saveMoneyOperation = (params = {}, options = {}) => {
  return request('/auth/activity/Goods/wholesaleGoodsStatusSub', {
    method: 'POST',
    data: params,
    ...options
  });
}


export const saveMoneyFormList = async (params = {}, options = {}) => {
  const { current, pageSize, status, ...rest } = params;

  const data = {
    page: current,
    size: pageSize,
    ...rest
  }
  if (status) {
    data.status = Number(status);
  }
  const res = await request('/auth/activity/Goods/wholesaleTransGoodsList', {
    method: 'POST',
    data,
    ...options
  });

  return {
    data: res.data.records || [],
    success: true,
    total: res.data.total,
  }
}
