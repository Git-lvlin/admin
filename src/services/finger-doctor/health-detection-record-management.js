import request from '@/utils/request'

// 健康检测记录
export const admReportList = async (params = {}, options = {}) => {
  const { current = 1, pageSize = 10, time, ...rest } = params
  const res = await request('/auth/healthy/FingerDoctor/admReportList', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      startTime: time && time?.[0],
      endTime: time && time?.[1],
      ...rest
    },
    ...options
  })
  return {
    data: res.data.records,
    success: res.success,
    total: res.data.total
  }
}