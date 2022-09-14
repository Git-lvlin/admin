import request from '@/utils/request'

// 资质支付分页列表 - 培训服务费交易
export const payPageForAdmin = async (params, options = {}) => {
  const { current = 1, pageSize = 10, payTime,area = [], ...rest } = params
  const res = await request('/auth/store/memberShopOperator/payPageForAdmin', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      payTimeStart:payTime&&payTime[0],
      payTimeEnd:payTime&&payTime[1],
      provinceId: area[0]?.value,
      cityId: area[1]?.value,
      regionId: area[2]?.value,
      ...rest
    },
    ...options
  })
  return {
    data: res.data,
    total: res.data.total,
    success: res.success
  }
}


// 租金支付分页列表 - 租金管理费交易(李源炳)
export const hostingLease = async (params, options = {}) => {
    const { current = 1, pageSize = 10, payTime,area = [], ...rest } = params
    const res = await request('/auth/store/hostingLease/payPageForAdmin', {
      method: 'POST',
      data: {
        page: current,
        size: pageSize,
        payTimeStart:payTime&&payTime[0],
        payTimeEnd:payTime&&payTime[1],
        provinceId: area[0]?.value,
        cityId: area[1]?.value,
        regionId: area[2]?.value,
        ...rest
      },
      ...options
    })
    return {
      data: res.data,
      total: res.data.total,
      success: res.success
    }
  }

//社区店运营设备 管理统计
export const deviceManageStatsForAdmin = async (params = {}, options = {}) => {
const res = await request('/auth/store/memberShopOperator/deviceManageStatsForAdmin', {
    method: 'POST',
    data: params,
    ...options
})
return {
    data: res.data,
    success: res.success,
    code: res.code
}
}