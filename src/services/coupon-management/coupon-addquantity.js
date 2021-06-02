import request from '@/utils/request';

export const couponAddQuantity= async (params = {}, options = {}) => {
  const { id,issueQuantity } = params;
  const res = await request('/auth/activity/Coupon/couponAddQuantity', {
    method: 'POST',
    data: {
     id,
     issueQuantity
    },
    ...options
  });

  return res
}
