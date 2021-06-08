import request from '@/utils/request';

export const couponCcodebase= async (params, options = {}) => {
  const {status,id } = params;
  const res = await request('/auth/activity/Coupon/couponCodebase', {
    method: 'POST',
    data: {
        status,
        id
    },
    ...options
  });
  // console.log('res',res)

  return {
    code: res.code,
    data: res.data.memberCouponList.records,
    couponInfo:res.data.couponInfo,
    success: res.success,
  }
}