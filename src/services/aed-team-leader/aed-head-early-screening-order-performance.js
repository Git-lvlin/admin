import request from "@/utils/request";


export const scrTeamPmStats = async (params = {}, options = {}) => {
    const res = await request('/auth/stats/report/java/scrTeamPmStats', {
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

export const scrTeamPm = async (params = {}, options = {}) => {
    const { current, pageSize, dateRange, ...rest } = params;
    const res = await request('/auth/stats/report/java/scrTeamPm', {
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