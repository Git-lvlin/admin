import request from '@/utils/request';

export const getActiveConfigList = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/activity/buildHouse/getActiveConfigList', {
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
    success: true,
    total: res.data.total
  }
}


export const saveBHActiveConfig = async (params = {}, options = {}) => {
    const { ...rest } = params;
    const res = await request('/auth/activity/buildHouse/saveBHActiveConfig', {
    method: 'POST',
    data: {
        ...rest
    },
    ...options
    });

    return {
    data: res.data,
    success: true,
    code: res.code
    }
}

// export const couponInviteEdit = async (params = {}, options = {}) => {
//     const { ...rest } = params;
//     const res = await request('/auth/activity/CouponInvite/couponInviteEdit', {
//     method: 'POST',
//     data: {
//         ...rest
//     },
//     ...options
//     });

//     return {
//     data: res.data,
//     success: true,
//     code: res.code
//     }
// }


export const getActiveConfigById = async (params = {}, options = {}) => {
    const { ...rest } = params;
    const res = await request('/auth/activity/buildHouse/getActiveConfigById', {
    method: 'POST',
    data: {
        ...rest
    },
    ...options
    });

    return {
    data: res.data,
    success: true,
    code: res.code
    }
}

// export const couponInviteEnd = async (params = {}, options = {}) => {
//     const { ...rest } = params;
//     const res = await request('/auth/activity/CouponInvite/couponInviteEnd', {
//     method: 'POST',
//     data: {
//         ...rest
//     },
//     ...options
//     });

//     return {
//     data: res.data,
//     success: true,
//     code: res.code
//     }
// }

// export const couponInviteSelList = async (params = {}, options = {}) => {
//     const { ...rest } = params;
//     const res = await request('/auth/activity/CouponInvite/couponInviteSelList', {
//     method: 'POST',
//     data: {
//         ...rest
//     },
//     ...options
//     });

//     return {
//     data: res.data,
//     success: true,
//     code: res.code
//     }
// }


// export const couponInviteLogList = async (params = {}, options = {}) => {
//   const { current, pageSize,dateTimeRange,dateTimeRange2,...rest } = params;
//   const res = await request('/auth/activity/CouponInvite/couponInviteLogList', {
//     method: 'POST',
//     data: {
//       page: current,
//       size: pageSize,
//       startTime1:dateTimeRange&&dateTimeRange[0],
//       startTime2:dateTimeRange&&dateTimeRange[1],
//       ...rest
//     },
//     ...options
//   });

//   return {
//     data: res.data.records,
//     success: true,
//     total: res.data.total
//   }
// }