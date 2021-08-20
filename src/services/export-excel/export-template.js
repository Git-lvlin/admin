import request from '@/utils/request'

// 创建导出任务
export const createExportTask = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/exportTask/createExportTask', {
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

// 导出任务分页查询
export const findByWays = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/exportTask/findByWays', {
    method: 'POST',
    data: {
      ...params
    },
    ...options
  });

  return {
    data: Array.isArray(res.data.records) ? res.data.records : [],
<<<<<<< HEAD
    total: res?.data?.total,
=======
    total: res.data.total,
>>>>>>> coderby
    success: res?.success
  }
}

