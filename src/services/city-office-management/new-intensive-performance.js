import request from "@/utils/request";
import moment from "moment";

// 新集约批发单市办事处业绩列表
export const newWholesaleCityAgencyPm = async (params = {}, options = {}) => {
  const { pageSize = 10, current = 1, time, ...rest } = params
  const res = await request('/auth/stats/performance/newWholesaleCityAgencyPm', {
      method: 'POST',
      data: {
        page: current,
        size: pageSize,
        startTime: time && moment(time?.[0]).format('YYYY-MM-DD'),
        endTime: time && moment(time?.[1]).format('YYYY-MM-DD'),
        ...rest
      },
      ...options
  });

  return {
      data: res.data.records,
      success: res.success,
      total: res.data.total
  }
}

// 新集约单市办事处业绩列表统计
export const newWholesaleCityAgencyPmStats = async (params = {}, options = {}) => {
  const { time, ...rest } = params
  const res = await request('/auth/java-admin/report/config/newWholesaleCityAgencyPmStats', {
      method: 'POST',
      data: {
        startTime: time && moment(time?.[0]).format('YYYY-MM-DD'),
        endTime: time && moment(time?.[1]).format('YYYY-MM-DD'),
        ...rest
      },
      ...options
  });

  return {
      data: res.data?.[0],
      success: res.success
  }
}

// 新集约业绩列表
export const newWholesaleAgencyWebPm = async (params = {}, options = {}) => {
  const { time, ...rest } = params
  const res = await request('/auth/java-admin/report/config/newWholesaleAgencyWebPm', {
      method: 'POST',
      data: {
        startTime: time && moment(time?.[0]).format('YYYY-MM-DD'),
        endTime: time && moment(time?.[1]).format('YYYY-MM-DD'),
        ...rest
      },
      ...options
  });

  return {
      data: res.data.records,
      success: res.success,
      total: res.data.total
  }
}

// 新集约批发单分成详情
export const newWholesaleCityAgencyComDetail = async (params = {}, options = {}) => {
  const { time, ...rest } = params
  const res = await request('/auth/stats/report/java/newWholesaleCityAgencyComDetail', {
      method: 'POST',
      data: {
        startTime: time && moment(time?.[0]).format('YYYY-MM-DD'),
        endTime: time && moment(time?.[1]).format('YYYY-MM-DD'),
        ...rest
      },
      ...options
  });

  return {
      data: res.data.records,
      success: res.success,
      total: res.data.total
  }
}

// 爱心回馈分成详情
export const loveFeedBackComDetail = async (params = {}, options = {}) => {
  const { time, ...rest } = params
  const res = await request('/auth/stats/report/java/loveFeedBackComDetail', {
      method: 'POST',
      data: {
        startTime: time && moment(time?.[0]).format('YYYY-MM-DD'),
        endTime: time && moment(time?.[1]).format('YYYY-MM-DD'),
        ...rest
      },
      ...options
  });

  return {
      data: res.data.records,
      success: res.success,
      total: res.data.total
  }
}

// 生活馆服务分成详情
export const cityAgencyLifeHouseComDetail = async (params = {}, options = {}) => {
  const { time, ...rest } = params
  const res = await request('/auth/stats/report/java/cityAgencyLifeHouseComDetail', {
      method: 'POST',
      data: {
        startTime: time && moment(time?.[0]).format('YYYY-MM-DD'),
        endTime: time && moment(time?.[1]).format('YYYY-MM-DD'),
        ...rest
      },
      ...options
  });

  return {
      data: res.data.records,
      success: res.success,
      total: res.data.total
  }
}

// 健康套餐分成详情
export const healthyCardComDetail = async (params = {}, options = {}) => {
  const { time, ...rest } = params
  const res = await request('/auth/stats/report/java/healthyCardComDetail', {
      method: 'POST',
      data: {
        startTime: time && moment(time?.[0]).format('YYYY-MM-DD'),
        endTime: time && moment(time?.[1]).format('YYYY-MM-DD'),
        ...rest
      },
      ...options
  });

  return {
      data: res.data.records,
      success: res.success,
      total: res.data.total
  }
}

// 指定商品结算分成详情
export const cityAgencyGoodsStComDetail = async (params = {}, options = {}) => {
  const { time, ...rest } = params
  const res = await request('/auth/stats/report/java/cityAgencyGoodsStComDetail', {
      method: 'POST',
      data: {
        startTime: time && moment(time?.[0]).format('YYYY-MM-DD'),
        endTime: time && moment(time?.[1]).format('YYYY-MM-DD'),
        ...rest
      },
      ...options
  });

  return {
      data: res.data.records,
      success: res.success,
      total: res.data.total
  }
}

// 健康礼包业绩分成详情
export const listItemCommissionPage = async (params = {}, options = {}) => {
  const { time, ...rest } = params
  const res = await request('/auth/java-admin/financial/healthyGift/cityOffice/listItemCommissionPage', {
      method: 'POST',
      data: {
        startTime: time && moment(time?.[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime: time && moment(time?.[1]).format('YYYY-MM-DD HH:mm:ss'),
        ...rest
      },
      ...options
  });

  return {
      data: res.data.records,
      success: res.success,
      total: res.data.total
  }
}

// 健康礼包业绩提成明细统计
export const itemCommissionSum = async (params = {}, options = {}) => {
  const { time, ...rest } = params
  return await request('/auth/java-admin/financial/healthyGift/cityOffice/itemCommissionSum', {
      method: 'POST',
      data: {
        startTime: time && moment(time?.[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime: time && moment(time?.[1]).format('YYYY-MM-DD HH:mm:ss'),
        ...rest
      },
      ...options
  })
}

// 手指医生业绩分成详情
export const itemCommissionPage = async (params = {}, options = {}) => {
  const { time, ...rest } = params
  const res = await request('/auth/java-admin/financial/doctorBoot/cityOffice/itemCommissionPage', {
      method: 'POST',
      data: {
        startTime: time && moment(time?.[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime: time && moment(time?.[1]).format('YYYY-MM-DD HH:mm:ss'),
        ...rest
      },
      ...options
  });

  return {
      data: res.data.records,
      success: res.success,
      total: res.data.total
  }
}

// 健康礼包业绩提成明细统计
export const commissionSum = async (params = {}, options = {}) => {
  const { time, ...rest } = params
  return await request('/auth/java-admin/financial/doctorBoot/cityOffice/itemCommissionSum', {
      method: 'POST',
      data: {
        startTime: time && moment(time?.[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime: time && moment(time?.[1]).format('YYYY-MM-DD HH:mm:ss'),
        ...rest
      },
      ...options
  })
}