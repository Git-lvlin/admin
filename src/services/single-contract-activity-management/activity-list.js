import request from '@/utils/request';

export const ruleList = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/activity/Rule/ruleList', {
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

export const ruleSub = async (params = {}, options = {}) => {
  return request('/auth/activity/Rule/ruleSub', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const ruleEdit = async (params = {}, options = {}) => {
  return request('/auth/activity/Rule/ruleEdit', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const ruleDetail = async (params = {}, options = {}) => {
  return request('/auth/activity/Rule/ruleDetail', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const ruleEnd = async (params = {}, options = {}) => {
  return request('/auth/activity/Rule/ruleEnd', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const RuleGoodsImport = async (params = {}, options = {}) => {
  return request('/auth/activityService/admin/RuleGoodsImport', {
    method: 'POST',
    data: params,
    Headers: { 'Content-Type': 'multipart/form-data' },
    ...options
  });
}