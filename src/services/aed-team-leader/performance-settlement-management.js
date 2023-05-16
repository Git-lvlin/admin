import request from "@/utils/request";

//结算申请子订单分页列表
export const applySubPage = async (params = {}, options = {}) => {
  const { current, pageSize,dateRange,remittanceTime,...rest } = params;
  const res = await request('/auth/finance/settlementAudit/applySubPage', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      payTimeStart: dateRange&&dateRange[0],
      payTimeEnd: dateRange&&dateRange[1],
      remittanceTimeStart: remittanceTime&&remittanceTime[0],
      remittanceTimeEnd: remittanceTime&&remittanceTime[1],
      ...rest
    },
    ...options
  });

  return {
    data: res.data,
    success: true,
    total: res.data.total,
    code: res.code
  }
}

//结算申请记录分页数据
export const applyPage = async (params = {}, options = {}) => {
  const { current, pageSize, dateRange, remittanceDate, ...rest } = params;
  const res = await request('/auth/finance/settlementAudit/applyPage', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      applyStartTime: dateRange&&dateRange[0],
      applyEndTime: dateRange&&dateRange[1],
      lastRemittanceStart: remittanceDate&&remittanceDate[0],
      lastRemittanceEnd: remittanceDate&&remittanceDate[1],
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

//订单申请结算 审核
export const settlementAuditAudit = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/finance/settlementAudit/audit', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  });

  return {
    data: res.data,
    success: true,
    code: res.code
  }
}

//获取汇款申请信息
export const getDataByAuditSumId = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/order/remit/getDataByAuditSumId', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  });

  return {
    data: res.data,
    success: true,
    code: res.code
  }
}

//汇款
export const remitSave = async (params = {}, options = {}) => {
  const { ...rest } = params;
  const res = await request('/auth/order/remit/remitSave', {
    method: 'POST',
    data: {
      ...rest
    },
    ...options
  });

  return {
    data: res.data,
    success: true,
    code: res.code
  }
}

//汇款记录详情
export const getRemitListByAuditSumId = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/order/remit/getRemitListByAuditSumId', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  });

  return {
    data: res.data,
    success: true,
    code: res.code
  }
}


//汇款汇款日志详情
export const getRemitDetailById = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/order/remit/getRemitDetailById', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  });

  return {
    data: res.data,
    success: true,
    code: res.code
  }
}


//汇款日志列表
export const getLogsListByParams = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/order/remit/getLogsListByParams', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
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

