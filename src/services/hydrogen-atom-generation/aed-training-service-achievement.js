import request from '@/utils/request'
import moment from 'moment'

export const cityAgentAedTrain = async (params = {}, options = {}) => {
  const { current=1, pageSize=10,dateRange,...rest } = params
  const res = await request('/auth/java-admin/report/config/cityAgentAedTrain', {
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

export const cityAgentAedTrainStats = async (params = {}, options = {}) => {
    const res = await request('/auth/java-admin/report/config/cityAgentAedTrainStats', {
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


export const cityAgentAedTrainOrder = async (params = {}, options = {}) => {
    const { current=1, pageSize=10,dateRange,...rest } = params
    const res = await request('/auth/java-admin/report/config/cityAgentAedTrainOrder', {
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

export const cityAgentAedTrainOrderStats = async (params = {}, options = {}) => {
    const res = await request('/auth/java-admin/report/config/cityAgentAedTrainOrderStats', {
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