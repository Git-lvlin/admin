import request from '@/utils/request'
import moment from 'moment'

export const hpaAedTrain = async (params = {}, options = {}) => {
  const { current=1, pageSize=10,dateRange,...rest } = params
  const res = await request('/auth/java-admin/report/config/hpaAedTrain', {
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

export const hpaAedTrainStats = async (params = {}, options = {}) => {
    const res = await request('/auth/java-admin/report/config/hpaAedTrainStats', {
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


export const hpaAedTrainOrder = async (params = {}, options = {}) => {
    const { current=1, pageSize=10,dateRange,...rest } = params
    const res = await request('/auth/java-admin/report/config/hpaAedTrainOrder', {
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

export const hpaAedTrainOrderStats = async (params = {}, options = {}) => {
    const res = await request('/auth/java-admin/report/config/hpaAedTrainOrderStats', {
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