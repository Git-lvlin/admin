import request from '@/utils/request'

export const provideGetClassTagListByParams = async (params = {}, options = {}) => {
    const { current=1, pageSize=10,...rest } = params
    const res = await request('/auth/goods/product/provideGetClassTagListByParams', {
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
      code: res.code,
      total: res.data.total
    }
  }

export const provideSaveClassTagData = async (params = {}, options = {}) => {
  return await request('/auth/goods/product/provideSaveClassTagData', {
    method: 'POST',
    data: params,
    ...options
  })
}
