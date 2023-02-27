import request from "@/utils/request";

//推荐提成分页列表
export const queryPage = async (params = {}, options = {}) => {
    const { current, pageSize, ...rest } = params;
    const res = await request('/auth/java-admin/financial/loveGiftCommission/queryPage', {
        method: 'POST',
        data:{
          page: current,
          size: pageSize,
          ...rest
        },
        ...options
    });

    return {
        data: res.data.records,
        success: true,
        total: res.data.total,
        code: res.code
    }
}

//推荐提成明细分页列表
export const queryDetailPage = async (params = {}, options = {}) => {
    const { current, pageSize, ...rest } = params;
    const res = await request('/auth/java-admin/financial/loveGiftCommission/queryDetailPage', {
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
      total: res.data.total,
      code: res.code
    }
  }