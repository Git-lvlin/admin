import request from "@/utils/request";
import moment from 'moment'


export const ipoProviderDirectAward = async (params = {}, options = {}) => {
  const { current, pageSize, recheckTime, dateRange, ...rest } = params;
  const res = await request('/auth/healthy/provider/ipoProviderDirectAward', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      finishStartTime: recheckTime?.[0] && moment(recheckTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      finishEndTime: recheckTime?.[1] && moment(recheckTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      noticeStartTime: dateRange?.[0] && moment(dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      noticeEndTime: dateRange?.[1] && moment(dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest
    },
    ...options
  });

  return {
    data: res.data.records,
    success: true,
    total: res.data.total,
    code: res.code
  }
}

export const ipoProviderAward = async (params = {}, options = {}) => {
    const { current, pageSize, recheckTime, dateRange, ...rest } = params;
    const res = await request('/auth/healthy/provider/ipoProviderAward', {
      method: 'POST',
      data: {
        page: current,
        size: pageSize,
        finishStartTime: recheckTime?.[0] && moment(recheckTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
        finishEndTime: recheckTime?.[1] && moment(recheckTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
        noticeStartTime: dateRange?.[0] && moment(dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss'),
        noticeEndTime: dateRange?.[1] && moment(dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss'),
        ...rest
      },
      ...options
    });
  
    return {
      data: res.data.records,
      success: true,
      total: res.data.total,
      code: res.code
    }
  }

export const ipoCurrMonth = async (params = {}, options = {}) => {
    const { current, pageSize, orderNums, ...rest } = params;
    const res = await request('/auth/healthy/provider/ipoCurrMonth', {
        method: 'POST',
        data: {
        page: current,
        size: pageSize,
        min: orderNums && orderNums?.min,
        max: orderNums && orderNums?.max,
        ...rest
        },
        ...options
    });

    return {
        data: res.data.records,
        success: true,
        total: res.data.total,
        code: res.code
    }
}

export const ipoHistoryMonth = async (params = {}, options = {}) => {
    const { current, pageSize,  dateRange, orderNums, ...rest } = params;
    const res = await request('/auth/healthy/provider/ipoHistoryMonth', {
      method: 'POST',
      data: {
        page: current,
        size: pageSize,
        noticeStartTime: dateRange?.[0] && moment(dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss'),
        noticeEndTime: dateRange?.[1] && moment(dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss'),
        min: orderNums && orderNums?.min,
        max: orderNums && orderNums?.max,
        ...rest
      },
      ...options
    });
  
    return {
      data: res.data.records,
      success: true,
      total: res.data.total,
      code: res.code
    }
  }


export const ipoNotice = async (params = {}, options = {}) => {
    const res = await request('/auth/commonService/common/health/ipoNotice', {
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