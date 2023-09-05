import request from '@/utils/request';
import { amountTransform } from '@/utils/utils';

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
    const { current, pageSize, ...rest } = params;
    const res = await request('/auth/stats/purchaseOrder/purchaseUnshippedOrder', {
      method: 'GET',
      params: {
        page: current,
        size: pageSize,
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