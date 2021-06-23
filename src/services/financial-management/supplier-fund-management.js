import request from '@/utils/request'

// 账户分页
export const platforms = async (params, options= {}) => {
  const { current=1, pageSize=10, registTime, bindTime, ...rest } = params
  const res = await request('/auth/java-admin/financial/account/page', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      registTimeBegin: registTime&& registTime[0],
      registTimeEnd: registTime&& registTime[1],
      bindTimeBegin: bindTime&& bindTime[0],
      bindTimeEnd: bindTime&& bindTime[1],
      ...rest
    },
    ...options
  })

  return {
    data: res?.data.records,
    success: res?.success,
    total: res.data.total
  }
}

// 获取银行信息
export const findAllBanks = async (params= {}, options= {}) => {
  const res = await request('/auth/java-admin/cms/banks/findAllBanks', {
    method: 'POST',
    params: {
      ...params
    },
    ...options
  })

  return {
    data: res?.data,
    success: res?.success
  }
}

// 帐户信息详情
export const detail = async (params= {}, options= {}) => {
  const res = await request('/auth/java-admin/financial/account/detail', {
    method: 'POST',
    data: {
     ...params
    },
    ...options
  })

  return {
    data: res?.data,
    success: res?.success
  }
}

// 账户禁用/启用
export const enabledDisabledSubmit = async (params= {}, options= {}) => {
  const res = await request('/auth/java-admin/financial/account/enabledDisabledSubmit', {
    method: 'POST',
    data: {
     ...params
    },
    ...options
  })

  return {
    success: res?.success
  }
}

