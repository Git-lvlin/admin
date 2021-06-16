import request from '@/utils/request';

export const listLikes= async (params, options = {}) => {
  const { id }=params
  const res = await request('/auth/java-admin/dynamic/listLikes', {
    method: 'POST',
    data: {
        id
    },
    ...options
  });
  console.log('res',res)
  return {
    code: res.code,
    data: Array.isArray(res.data)?res.data:[],
    success: res.success,
  }
}