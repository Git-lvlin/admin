import request from '@/utils/request';

export const couponDetail= async (params = {}, options = {}) => {
  const { id } = params;
  const res = await request('/auth/activity/Coupon/couponDetail', {
    method: 'POST',
    data: {
     id
    },
    ...options
  });

  return {
    code:res.code,
    data: res.data,
    success: res.success,
  }
}


export const couponGoodsEdit= async (params = {}, options = {}) => {
  const { ...rest } = params;
  const res = await request('/auth/activity/Coupon/couponGoodsEdit', {
    method: 'POST',
    data: {
     ...rest
    },
    ...options
  });

  return {
    code:res.code,
    data: res.data,
    success: res.success,
  }
}
