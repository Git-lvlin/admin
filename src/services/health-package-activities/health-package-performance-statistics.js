import request from '@/utils/request'
import { amountTransform } from '@/utils/utils'

export const cardCityAgencyOrderPm = async (params = {}, options = {}) => {
  const { current = 1, pageSize = 10, area, payAmount, orderNums, ...rest } = params
  const res = await request('/auth/java-admin/report/config/cardCityAgencyOrderPm', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      provinceId: area&&area[0]?.value,
      cityId: area&&area[1]?.value,
      districtId: area&&area[2]?.value,
      minPayAmount: payAmount&& amountTransform(payAmount?.min,'*'),
      maxPayAmount: payAmount&& amountTransform(payAmount?.max,'*'),
      minOrderNums: orderNums&&orderNums?.min,
      maxOrderNums: orderNums&&orderNums?.max,
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


export const cardCityAgencyOrderPmStats = async (params = {}, options = {}) => {
    const { current = 1, pageSize = 10, area, payAmount, orderNums, ...rest } = params
    const res = await request('/auth/java-admin/report/config/cardCityAgencyOrderPmStats', {
      method: 'POST',
      data: {
        provinceId: area&&area[0]?.value,
        cityId: area&&area[1]?.value,
        districtId: area&&area[2]?.value,
        minPayAmount: payAmount&& amountTransform(payAmount?.min,'*'),
        maxPayAmount: payAmount&& amountTransform(payAmount?.max,'*'),
        minOrderNums: orderNums&&orderNums?.min,
        maxOrderNums: orderNums&&orderNums?.max,
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

export const cardCityAgencyOrderPmDetail = async (params = {}, options = {}) => {
    const { current = 1, pageSize = 10, ...rest } = params
    const res = await request('/auth/java-admin/report/config/cardCityAgencyOrderPmDetail', {
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
