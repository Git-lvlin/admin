import request from '@/utils/request'
import { amountTransform } from '@/utils/utils'

// 免卡启动明细
export const deviceStartUpList = async (params, options = {}) => {
  const { current = 1, pageSize = 10, useTime, amount, ...rest } = params
  const res = await request('/auth/healthy/operateOrder/deviceStartUpList', {
    method: 'POST',
    data: {
      useStartTime: useTime?.[0],
      useEndTime: useTime?.[1],
      amount: amount && amountTransform(amount, '*'),
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