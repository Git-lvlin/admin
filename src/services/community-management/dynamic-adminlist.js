import request from '@/utils/request';

export const adminList= async (params, options = {}) => {
  const {current,dynamicId,circleId,pageSize,status,...rest}=params
  const res = await request('/auth/java-admin/dynamic/adminList', {
    method: 'POST',
    data: {
      dynamicId:parseInt(dynamicId),
      circleId:parseInt(circleId),
      status:parseInt(status),
      page:current,
      size:pageSize,
      ...rest
    },
    ...options
  });
  return {
    code: res.code,
    data: res.data.records,
    success: res.success,
  }
}