import request from '@/utils/request';

export const couponSub = async (params, options = {}) => {
  const {...rest} = params;
  const res = await request('/auth/activity/Coupon/couponSub', {
    method: 'POST',
    data: {
      ...rest
    },  
    ...options
  });
  console.log('res',res)

  return {
    code: res.code,
    data: res.data,
    success: res.success,
  }
}
