import request from '@/utils/request';
import { amountTransform } from '@/utils/utils';
import moment from 'moment';

export const purchaseUnshippedStats = async (params = {}, options = {}) => {
  const { current, pageSize,orderNum,orderAmount, ...rest } = params;
  const res = await request('/auth/stats/purchaseOrder/purchaseUnshippedStats', {
    method: 'GET',
    params: {
      page: current,
      size: pageSize,
      orderNumMin:orderNum&&orderNum.min,
      orderNumMax:orderNum&&orderNum.max,
      orderAmountMin:orderAmount&&amountTransform(orderAmount.min,'*'),
      orderAmountMax:orderAmount&&amountTransform(orderAmount.max,'*'),
      ...rest
    },
    ...options
  });

  return {
    data: res.data.records,
    success: true,
    total: res.data.total
  }
}


export const purchaseUnshippedOrder = async (params = {}, options = {}) => {
    const { current, pageSize, dateTimeRange, ...rest } = params;
    const res = await request('/auth/stats/purchaseOrder/purchaseUnshippedOrder', {
      method: 'GET',
      params: {
        page: current,
        size: pageSize,
        payTimeStart:dateTimeRange&&moment(dateTimeRange[0]).format('YYYY-MM-DD HH:mm:ss'),
        payTimeEnd:dateTimeRange&&moment(dateTimeRange[1]).format('YYYY-MM-DD HH:mm:ss'),
        ...rest
      },
      ...options
    });
  
    return {
      data: res.data.records,
      success: true,
      total: res.data.total
    }
  }