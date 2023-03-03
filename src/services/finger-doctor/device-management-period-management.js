import request from '@/utils/request'

// 手指医生设备列表
export const findDeviceDoctorPage = async (params = {}, options = {}) => {
  const { current = 1, pageSize = 10, time, ...rest } = params
  const res = await request('/auth/java-admin/iot/memberDevice/findDeviceDoctorPage', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
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