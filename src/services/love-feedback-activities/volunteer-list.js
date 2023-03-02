import request from "@/utils/request";

// 爱心回馈活动 / 志愿者列表
export const volunteerPage = async (params = {}, options = {}) => {
  const { pageSize = 10, current = 1, time, ...rest } = params
  const res = await request('/auth/healthy/Member/volunteerPage', {
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
      success: res.success,
      total: res.data.total
  }
}