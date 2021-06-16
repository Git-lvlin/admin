import request from '@/utils/request';

export const couponCcodebase= async (params, options = {}) => {
  const {status,id,dateRange,...rest } = params;
  const res = await request('/auth/activity/Coupon/couponCodebase', {
    method: 'POST',
    data: {
        status:parseInt(status),
        id:parseInt(id),
        lqStartTime:dateRange&&dateRange[0],
        lqEndTime:dateRange&&dateRange[1],
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