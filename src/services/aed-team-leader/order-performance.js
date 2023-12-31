import request from "@/utils/request";
import moment from "moment";


export const AEDOrderPmStats = async (params = {}, options = {}) => {
    const res = await request('/auth/java-admin/report/config/AEDOrderPmStats', {
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

export const AEDOrderPm = async (params = {}, options = {}) => {
    const { current, pageSize, dateRange, ...rest } = params;
    const res = await request('/auth/java-admin/report/config/AEDOrderPm', {
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


export const scrSubOrderPmStats = async (params = {}, options = {}) => {
    const res = await request('/auth/stats/report/java/scrSubOrderPmStats', {
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

export const scrSubOrderPm = async (params = {}, options = {}) => {
    const { current, pageSize, dateRange, ...rest } = params;
    const res = await request('/auth/stats/report/java/scrSubOrderPm', {
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


export const AEDOrderStats = async (params = {}, options = {}) => {
    const res = await request('/auth/stats/subsidiary/AEDOrderStats', {
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


export const AEDOrder = async (params = {}, options = {}) => {
    const { current, pageSize, dateRange, ...rest } = params;
    const res = await request('/auth/stats/subsidiary/AEDOrder', {
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

  export const AEDTrainingsServiceStats = async (params = {}, options = {}) => {
    const res = await request('/auth/stats/subsidiary/AEDTrainingsServiceStats', {
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


export const AEDTrainingsService = async (params = {}, options = {}) => {
    const { current, pageSize, dateRange, ...rest } = params;
    const res = await request('/auth/stats/subsidiary/AEDTrainingsService', {
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


  export const scrSpecOrderPm = async (params = {}, options = {}) => {
    const { current, pageSize, dateRange=[], ...rest } = params;
    const res = await request('/auth/stats/report/java/scrSpecOrderPm', {
      method: 'POST',
      data: {
        page: current,
        size: pageSize,
        startTime:dateRange[0]&&moment(dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime:dateRange[1]&&moment(dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss'),
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


  export const scrSpecOrderPmStats = async (params = {}, options = {}) => {
    const res = await request('/auth/stats/report/java/scrSpecOrderPmStats', {
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

export const scrSpecOrderPmDetail = async (params = {}, options = {}) => {
  const { current, pageSize, dateRange=[], ...rest } = params;
  const res = await request('/auth/healthy/screening/scrSpecOrderPmDetail', {
      method: 'POST',
      data:{
        page: current,
        size: pageSize,
        startTime:dateRange[0]&&moment(dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime:dateRange[1]&&moment(dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss'),
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

export const scrSpecOrderPmDetailStats = async (params = {}, options = {}) => {
  const { dateRange=[], ...rest } = params;
  const res = await request('/auth/healthy/screening/scrSpecOrderPmDetailStats', {
      method: 'POST',
      data:{
        startTime:dateRange[0]&&moment(dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime:dateRange[1]&&moment(dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss'),
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