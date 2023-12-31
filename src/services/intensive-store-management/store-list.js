import request from '@/utils/request';
import { amountTransform } from '@/utils/utils'

export const getStoreList = async (params = {}, options = {}) => {
  const { current, pageSize, area = [], provideTime = [], auditTime = [], cancleTime = [], deposit, serviceFee, ...rest } = params;
  const res = await request('/auth/store/memberShop/page', {
    method: 'GET',
    params: {
      page: current,
      size: pageSize,
      provinceId: area[0]?.value,
      cityId: area[1]?.value,
      regionId: area[2]?.value,
      provideTimeStart: provideTime[0],
      provideTimeEnd: provideTime[1],
      auditTimeStart: auditTime[0],
      auditTimeEnd: auditTime[1],
      cancleTimeStart: cancleTime[0],
      cancleTimeEnd: cancleTime[1],
      depositStart: deposit?.min ? amountTransform(deposit.min) : '',
      depositEnd: deposit?.max ? amountTransform(deposit.max) : '',
      serviceFeeStart: serviceFee?.min ? amountTransform(serviceFee.min) : '',
      serviceFeeEnd: serviceFee?.max ? amountTransform(serviceFee.max) : '',
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

export const applyConditionPage = async (params = {}, options = {}) => {
  const { current, pageSize,deposit,serviceFee, area = [], ...rest } = params;
  const res = await request('/auth/store/memberShop/applyConditionPage', {
    method: 'GET',
    params: {
      page: current,
      size: pageSize,
      provinceId: area[0]?.value,
      cityId: area[1]?.value,
      regionId: area[2]?.value,
      depositStart: deposit?.min ? amountTransform(deposit.min) : '',
      depositEnd: deposit?.max ? amountTransform(deposit.max) : '',
      serviceFeeStart: serviceFee?.min ? amountTransform(serviceFee.min) : '',
      serviceFeeEnd: serviceFee?.max ? amountTransform(serviceFee.max) : '',
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




export const changeStatus = (params = {}, options = {}) => {
  return request('/auth/store/memberShop/changeStatus', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const excelImport = (params = {}, options = {}) => {
  return request('/auth/store/memberShopApply/import', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const storeAdd = (params = {}, options = {}) => {
  return request('/auth/store/memberShopApply/add', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const refunded = (params = {}, options = {}) => {
  return request('/auth/store/storeDeposit/refunded', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const backTrack = (params = {}, options = {}) => {
  return request('/auth/store/storeDeposit/backTrack', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const gradeChange = (params = {}, options = {}) => {
  return request('/auth/store/member_shop/grade', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const giftOrder = (params = {}, options = {}) => {
  return request('/auth/store/memberShopApply/giftOrder', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const getAllAction = (params = {}, options = {}) => {
  return request('/auth/store/Subscribe/getAllAction', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const openSubscribe = (params = {}, options = {}) => {
  return request('/auth/store/Subscribe/openSubscribe', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const closeSubscribe = (params = {}, options = {}) => {
  return request('/auth/store/Subscribe/closeSubscribe', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const getSubscribeList = (params = {}, options = {}) => {
  return request('/auth/store/Subscribe/getSubscribeList', {
    method: 'POST',
    data: params,
    ...options
  });
}


export const memberShopPage = async (params = {}, options = {}) => {
  const { current, pageSize, area = [], provideTime = [], auditTime = [], cancleTime = [], deposit, serviceFee, ...rest } = params;
  const res = await request('/auth/store/memberShop/page', {
    method: 'GET',
    params: {
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