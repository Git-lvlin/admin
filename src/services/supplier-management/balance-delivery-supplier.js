import request from '@/utils/request';
import { amountTransform } from '@/utils/utils';

export const adventPage = async (params = {}, options = {}) => {
  const { current, pageSize,balanceAvailable,balanceProcessable,balanceExpire, ...rest } = params;
  const res = await request('/auth/java-admin/financial/supplier/advent/page', {
    method: 'GET',
    params: {
      page: current,
      size: pageSize,
      balanceAvailableStart:balanceAvailable&&balanceAvailable.min,
      balanceAvailableEnd:balanceAvailable&&balanceAvailable.max,
      balanceProcessableStart:balanceProcessable&&balanceProcessable.min,
      balanceProcessableEnd:balanceProcessable&&balanceProcessable.max,
      balanceExpireStart:balanceExpire&&balanceExpire.min,
      balanceExpireEnd:balanceExpire&&balanceExpire.max,
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