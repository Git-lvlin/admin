import request from '@/utils/request'

// add export config
export const add = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/exportConfig/add', {
    method: 'POST',
    data: {
      ...params
    },
    ...options
  })
  return {
    success: res.success
  }
}

// update export config
export const update = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/exportConfig/update', {
    method: 'POST',
    data: {
      ...params
    },
    ...options
  });

  return {
    success: res.success
  }
}

// create export task
export const create = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/exportTask/createExportTask', {
    method: 'POST',
    data: { 
      ...params
    },
    ...options
  });

  return {
    success: res.success
  }
}

