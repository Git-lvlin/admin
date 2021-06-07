import request from '@/utils/request';

export const CommentReplyList= async (params, options = {}) => {
  const {dynamicId}=params
  const res = await request('/auth/java-admin/dynamicComment/adminCommentReplyList', {
    method: 'POST',
    data: {
        dynamicId
    },
    ...options
  });
  return {
    code: res.code,
    data: res.data.records,
    success: res.success,
  }
}