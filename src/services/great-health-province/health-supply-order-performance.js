import request from '@/utils/request'
import moment from 'moment'

export const provinceAgentStoreGoodsAdm = async (params = {}, options = {}) => {
  const { current=1, pageSize=10,dateRange,...rest } = params
  const res = await request('/auth/healthy/provider/provinceAgentStoreGoodsAdm', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      startTime:dateRange&&moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime:dateRange&&moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss'),
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

export const provinceAgentStoreGoodsAdmSt = async (params = {}, options = {}) => {
    const res = await request('/auth/healthy/provider/provinceAgentStoreGoodsAdmSt', {
        method: 'POST',
        data:params,
        ...options
    });

    return {
        data: res.data,
        success: true,
        code: res.code
    }
}


export const provinceAgentProviderStoreGoods = async (params = {}, options = {}) => {
    const { current=1, pageSize=10,dateRange,...rest } = params
    const res = await request('/auth/healthy/provider/provinceAgentProviderStoreGoods', {
      method: 'POST',
      data: {
        page: current,
        size: pageSize,
        startTime:dateRange&&moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime:dateRange&&moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss'),
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

export const provinceAgentProviderStoreGoodsSt = async (params = {}, options = {}) => {
    const res = await request('/auth/healthy/provider/provinceAgentProviderStoreGoodsSt', {
        method: 'POST',
        data:params,
        ...options
    });

    return {
        data: res.data,
        success: true,
        code: res.code
    }
}