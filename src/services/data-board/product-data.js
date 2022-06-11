import request from '@/utils/request'

// 商品分类数据
export const timeGoodType = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/report/config/timeGoodType', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data,
    success: res.success
  }
}


// 商品明细数据
export const goodDetail = async (params = {}, options = {}) => {
  const { date, gcId, current=1, pageSize=10, ...rest } = params
  return await request('/auth/java-admin/report/config/goodDetail', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      startTime: date?.[0],
      endTime: date?.[1],
      gcId1: gcId?.[0],
      gcId2: gcId?.[1],
      ...rest
    },
    ...options
  })
  // return {
  //   data: res.data.records,
  //   success: res.success,
  //   total: res.data.total
  // }
}

// 饼图数据
export const goodsRateData = async (params = {}, options = {}) => {
  const res = await request('/auth/java-admin/report/config/goodsRateData', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res.data.rateList,
    success: res.success,
  }
}

// 商品详情表格下面的统计数据
export const bJoinRate = async (params = {}, options = {}) => {
  return await request('/auth/java-admin/report/config/bJoinRate', {
    method: 'POST',
    data: params,
    ...options
  })
}

// 滞销商品列表
export const unsalableGoodsList = async (params = {}, options = {}) => {
  const { current=1, pageSize=10, ...rest } = params
  const res = await request('/auth/java-admin/report/config/unsalableGoodsList', {
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

// 滞销商品合计
export const unsalableGoodsNums = async (params = {}, options = {}) => {
  return await request('/auth/java-admin/report/config/unsalableGoodsNums', {
    method: 'POST',
    data: params,
    ...options
  })
}