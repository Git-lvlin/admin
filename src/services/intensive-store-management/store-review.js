import request from '@/utils/request';
import { amountTransform } from '@/utils/utils'


export const getStoreList = async (params = {}, options = {}) => {
  const { current, pageSize, area = [], provideTime = [], deposit, serviceFee, ...rest } = params;
  const res = await request('/auth/store/memberShopApply/page', {
    method: 'GET',
    params: {
      page: current,
      size: pageSize,
      provinceId: area[0]?.value,
      cityId: area[1]?.value,
      regionId: area[2]?.value,
      provideTimeStart: provideTime[0],
      provideTimeEnd: provideTime[1],
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

export const approve = async (params = {}, options = {}) => {
  return request('/auth/store/memberShopApply/approve', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const refuse = async (params = {}, options = {}) => {
  return request('/auth/store/memberShopApply/refuse', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const storeDetail = async (params = {}, options = {}) => {
  return request('/auth/store/memberShopApply/detail', {
    method: 'GET',
    params,
    ...options
  });
}


export const pageByStoreNo = async (params = {}, options = {}) => {
  const { current, pageSize, area = [], provideTime = [], deposit, serviceFee, ...rest } = params;
  const res = await request('/auth/store/storePayOrder/pageByStoreNo', {
    method: 'GET',
    params: {
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  });

  return {
    data: res.data,
    success: true,
    total: res.data.total
  }
}


export const memberShopCancelPost = async (params = {}, options = {}) => {
  return request('/auth/store/memberShopCancel/post', {
    method: 'POST',
    data: params,
    ...options
  });
}