import request from '@/utils/request';
import { amountTransform } from '@/utils/utils';

export const adventPage = async (params = {}, options = {}) => {
  const { current, pageSize,balanceAvailable,balanceProcessable,balanceExpire, ...rest } = params;
  const res = await request('/auth/java-admin/financial/supplier/advent/page', {
    method: 'GET',
    params: {
      page: current,
      size: pageSize,
      balanceAvailableStart:balanceAvailable&&amountTransform(balanceAvailable.min,'*'),
      balanceAvailableEnd:balanceAvailable&&amountTransform(balanceAvailable.max,'*'),
      balanceProcessableStart:balanceProcessable&&amountTransform(balanceProcessable.min,'*'),
      balanceProcessableEnd:balanceProcessable&&amountTransform(balanceProcessable.max,'*'),
      balanceExpireStart:balanceExpire&&amountTransform(balanceExpire.min,'*'),
      balanceExpireEnd:balanceExpire&&amountTransform(balanceExpire.max,'*'),
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