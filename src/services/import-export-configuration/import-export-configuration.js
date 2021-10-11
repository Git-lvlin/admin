// 添加导出配置
export const add = async (params, options= {}) => {
  const res = await request('/auth/java-admin/exportConfig/add', {
    method: 'POST',
    data: params,
    ...options
  })

  return {
    success: res?.success
  }
}