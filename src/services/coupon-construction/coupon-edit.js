import request from '@/utils/request';

export const couponEdit = async (params, options = {}) => {
  const {...rest} = params;
  const res = await request('/activityService/admin/couponEdit', {
    method: 'POST',
    data: {
      ...rest
    },  
    ...options
  });
  console.log('res',res)

//   return {
//     // code: res.code,
//     data: res.data,
//     success: res.success,
//   }
}
