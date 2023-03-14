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

// 手指医生-获取检测报告封面
export const fingerDoctorCover = async (params = {}, options = {}) => {
  const { ...rest } = params
  const res = await request('/auth/healthy/fingerDoctor/cover', {
    method: 'POST',
    data: {
      ...rest
    },
    ...options
  })
  return {
    data: res.data,
    success: res.success,
    code: res.code
  }
}

// 手指医生-编辑检测报告封面
export const fingerDoctorEditCover = async (params = {}, options = {}) => {
  const { ...rest } = params
  const res = await request('/auth/healthy/fingerDoctor/editCover', {
    method: 'POST',
    data: {
      ...rest
    },
    ...options
  })
  return {
    data: res.data,
    success: res.success,
    code: res.code
  }
}


// 手指医生-查询设备信息
export const queryMemberDevice = async (params = {}, options = {}) => {
  const { ...rest } = params
  const res = await request('/auth/java-admin/iot/memberDevice/queryMemberDevice', {
    method: 'POST',
    data: {
      ...rest
    },
    ...options
  })
  return {
    data: res.data,
    success: res.success,
    code: res.code
  }
}


// 手指医生-修改启动费价格
export const modifyStartFee = async (params = {}, options = {}) => {
  const { ...rest } = params
  const res = await request('/auth/java-admin/iot/memberDevice/modifyStartFee', {
    method: 'POST',
    data: {
      ...rest
    },
    ...options
  })
  return {
    data: res.data,
    success: res.success,
    code: res.code
  }
}