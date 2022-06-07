import request from '@/utils/request';
import moment from 'moment';

// 运营商氢原子业绩
export const operationsCommissionPage = async (params = {}, options = {}) => {
  const { current = 1, pageSize = 10, time, ...rest } = params
  const res = await request('/auth/java-admin/financial/hydrogenDivide/operationsCommissionPage', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      begin: time?.[0],
      end: time?.[1],
      ...rest
    },
    ...options
  });
  return {
    data: res.data.records,
    total: res.data.total,
    success: res.success
  }
}

// 运营商氢原子业绩明细
export const operationsCommissionItemPage = async (params = {}, options = {}) => {
  const { current = 1, pageSize = 10, ...rest } = params
  const res = await request('/auth/java-admin/financial/hydrogenDivide/operationsCommissionItemPage', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      begin: moment().startOf('month').format("YYYY-MM-DD"),
      end: moment().endOf('month').format("YYYY-MM-DD"),
      ...rest
    },
    ...options
  });
  return {
    data: res.data.records,
    total: res.data.total,
    success: res.success
  }
}