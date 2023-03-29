import request from '@/utils/request';
import moment from 'moment';

export const commissionPage = async (params, options = {}) => {
  const { pageSize, current, payTime, ...rest } = params
  const res = await request('/auth/java-admin/financial/doctorBoot/commission/page', {
    method: 'POST',
    data: {
      startTime: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  })
  return {
    data: res.data.records,
    total: res.data.total,
    success: res.success
  }
}


export const commissionSum = async (params, options = {}) => {
    const { pageSize, current, payTime, ...rest } = params
    const res = await request('/auth/java-admin/financial/doctorBoot/commission/sum', {
      method: 'POST',
      data: {
        startTime: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
        page: current,
        size: pageSize,
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



  export const buyDoctorPage = async (params, options = {}) => {
    const { pageSize, current, payTime, ...rest } = params
    const res = await request('/auth/java-admin/financial/buyDoctor/commission/page', {
      method: 'POST',
      data: {
        startTime: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
        page: current,
        size: pageSize,
        ...rest
      },
      ...options
    })
    return {
      data: res.data.records,
      total: res.data.total,
      success: res.success
    }
  }
  
  
  export const buyDoctorSum = async (params, options = {}) => {
      const { pageSize, current, payTime, ...rest } = params
      const res = await request('/auth/java-admin/financial/buyDoctor/commission/sum', {
        method: 'POST',
        data: {
          startTime: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
          endTime: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
          page: current,
          size: pageSize,
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