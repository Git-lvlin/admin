import request from '@/utils/request';

export const getActiveConfigList = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/activity/buildHouse/getActiveConfigList', {
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
    total: res.data.total
  }
}


export const saveBHActiveConfig = async (params = {}, options = {}) => {
    const { ...rest } = params;
    const res = await request('/auth/activity/buildHouse/saveBHActiveConfig', {
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

export const getActiveConfigById = async (params = {}, options = {}) => {
    const { ...rest } = params;
    const res = await request('/auth/activity/buildHouse/getActiveConfigById', {
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

export const changeStatus = async (params = {}, options = {}) => {
    const { ...rest } = params;
    const res = await request('/auth/activity/buildHouse/changeStatus', {
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



//使用明细和用户明细

export const getBuildhouseIncomeList = async (params = {}, options = {}) => {
  const { current, pageSize,dateTimeRange, ...rest } = params;
  const res = await request('/auth/buildhouse/Buildhouse/getBuildhouseIncomeList', {
    method: 'POST',
    data: {
      page: current,
      pageSize: pageSize,
      startTime1:dateTimeRange&&dateTimeRange[0],
      startTime2:dateTimeRange&&dateTimeRange[1],
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

export const getBlindboxIncomeDetail = async (params = {}, options = {}) => {
  const { current, pageSize,dateTimeRange, ...rest } = params;
  const res = await request('/auth/blindbox/Blindbox/getBlindboxIncomeDetail', {
    method: 'POST',
    data: {
      page: current,
      pageSize:pageSize,
      startTime1:dateTimeRange&&dateTimeRange[0],
      startTime2:dateTimeRange&&dateTimeRange[1],
      ...rest
    },
    ...options
  });

  return {
    data: res.data,
    success: true,
    total: res.data.total
  }
}


export const getBuildhouseUseList = async (params = {}, options = {}) => {
  const { current, pageSize,dateTimeRange,dateTimeRange2,...rest } = params;
  const res = await request('/auth/buildhouse/Buildhouse/getBuildhouseUseList', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      startTime1:dateTimeRange&&dateTimeRange[0],
      startTime2:dateTimeRange&&dateTimeRange[1],
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

export const buildhouseAccountSub = async (params = {}, options = {}) => {
  const {...rest } = params;
  const res = await request('/auth/buildhouse/Buildhouse/buildhouseAccountSub', {
    method: 'POST',
    data: {
      ...rest
    },
    ...options
  });

  return {
    data: res.data,
    success: true,
    code:res.code
  }
}


export const getBlindboxUseDetail = async (params = {}, options = {}) => {
  const { current, pageSize,dateTimeRange,...rest } = params;
  const res = await request('/auth/blindbox/Blindbox/getBlindboxUseDetail', {
  method: 'POST',
  data: {
      page: current,
      pageSize:pageSize,
      startTime1:dateTimeRange&&dateTimeRange[0],
      startTime2:dateTimeRange&&dateTimeRange[1],
      ...rest,
  },
  ...options
  });

  return {
  data: res.data,
  success: true,
  code: res.code,
  total: res.data.total
  }
}








//排名数据

export const statInfo = async (params = {}, options = {}) => {
  const { current, pageSize,...rest } = params;
  const res = await request('/auth/buildhouse/Buildhouse/statInfo', {
  method: 'POST',
  data: {
      ...rest,
  },
  ...options
  });

  return {
  data: res.data,
  success: true,
  code: res.code,
  }
}


export const inviteRankList = async (params = {}, options = {}) => {
  const { current, pageSize,dateTimeRange,...rest } = params;
  const res = await request('/auth/buildhouse/Buildhouse/inviteRankList', {
  method: 'POST',
  data: {
      page: current,
      pageSize:pageSize,
      startTime1:dateTimeRange&&dateTimeRange[0],
      startTime2:dateTimeRange&&dateTimeRange[1],
      ...rest,
  },
  ...options
  });

  return {
  data: res.data.records,
  success: true,
  code: res.code,
  total: res.data.total
  }
}

export const floorRankList = async (params = {}, options = {}) => {
  const { current, pageSize,dateTimeRange,...rest } = params;
  const res = await request('/auth/buildhouse/Buildhouse/floorRankList', {
  method: 'POST',
  data: {
      page: current,
      pageSize:pageSize,
      startTime1:dateTimeRange&&dateTimeRange[0],
      startTime2:dateTimeRange&&dateTimeRange[1],
      ...rest,
  },
  ...options
  });

  return {
  data: res.data.records,
  success: true,
  code: res.code,
  total: res.data.total
  }
}



export const setVirtualInvite= async (params = {}, options = {}) => {
  const { ...rest } = params;
  const res = await request('/auth/buildhouse/Buildhouse/setVirtualInvite', {
  method: 'POST',
  data: {
      ...rest,
  },
  ...options
  });

  return {
  data: res.data,
  success: true,
  code: res.code,
  }
}



export const checkUserExist= async (params = {}, options = {}) => {
  const { ...rest } = params;
  const res = await request('/auth/buildhouse/Buildhouse/checkUserExist', {
  method: 'POST',
  data: {
      ...rest,
  },
  ...options
  });

  return {
  data: res.data,
  success: true,
  code: res.code,
  }
}