import request from "@/utils/request";

export const teamLeaderPm = async (params = {}, options = {}) => {
  const { current, pageSize,createTime, ...rest } = params;
  const res = await request('/auth/java-admin/report/config/teamLeaderPm', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      startTime:createTime&&createTime[0],
      endTime:createTime&&createTime[1],
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

export const teamLeaderPmStats = async (params = {}, options = {}) => {
    const res = await request('/auth/java-admin/report/config/teamLeaderPmStats', {
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


export const teamHydrogen = async (params = {}, options = {}) => {
  const { current, pageSize,dateRange, ...rest } = params;
  const res = await request('/auth/stats/team/hydrogen', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      startTime:dateRange&&dateRange[0],
      endTime:dateRange&&dateRange[1],
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

export const hydrogenStats = async (params = {}, options = {}) => {
    const res = await request('/auth/stats/team/hydrogenStats', {
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


export const wholesaleOrder = async (params = {}, options = {}) => {
  const { current, pageSize,dateRange, ...rest } = params;
  const res = await request('/auth/stats/team/wholesaleOrder', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      startTime:dateRange&&dateRange[0],
      endTime:dateRange&&dateRange[1],
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


export const wholesaleOrderStats = async (params = {}, options = {}) => {
  const res = await request('/auth/stats/team/wholesaleOrderStats', {
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


export const healthyCard = async (params = {}, options = {}) => {
  const { current, pageSize,dateRange, ...rest } = params;
  const res = await request('/auth/stats/team/healthyCard', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      startTime:dateRange&&dateRange[0],
      endTime:dateRange&&dateRange[1],
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


export const healthyCardStats = async (params = {}, options = {}) => {
  const res = await request('/auth/stats/team/healthyCardStats', {
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


export const hydrogenBoot = async (params = {}, options = {}) => {
  const { current, pageSize,dateRange, ...rest } = params;
  const res = await request('/auth/stats/team/hydrogenBoot', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      startTime:dateRange&&dateRange[0],
      endTime:dateRange&&dateRange[1],
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


export const hydrogenBootStats = async (params = {}, options = {}) => {
  const res = await request('/auth/stats/team/hydrogenBootStats', {
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


export const hydrogenRent = async (params = {}, options = {}) => {
  const { current, pageSize,dateRange, ...rest } = params;
  const res = await request('/auth/stats/team/hydrogenRent', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      startTime:dateRange&&dateRange[0],
      endTime:dateRange&&dateRange[1],
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


export const hydrogenRentStats = async (params = {}, options = {}) => {
  const res = await request('/auth/stats/team/hydrogenRentStats', {
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