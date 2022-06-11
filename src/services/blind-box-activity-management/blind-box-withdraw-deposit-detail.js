import request from '@/utils/request';


export const accountActivityAudit = async (params = {}, options = {}) => {
    const { ...rest } = params;
    const res = await request('/auth/java-admin/purse/accountActivity/audit', {
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