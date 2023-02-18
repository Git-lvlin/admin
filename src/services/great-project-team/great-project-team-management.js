import request from "@/utils/request";

//办事处管理统计
export const agencyCityCount = async (params = {}, options = {}) => {
    const res = await request('/auth/java-admin/report/config/agencyCityCount', {
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

//团长-管理
export const teamLeaderManager = async (params = {}, options = {}) => {
    const { current, pageSize, ...rest } = params;
    const res = await request('/auth/java-admin/report/config/teamLeaderManager', {
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


//全款氢原子列表
export const agencySalesList = async (params = {}, options = {}) => {
    const { current, pageSize, ...rest } = params;
    const res = await request('/auth/java-admin/report/config/agencySalesList', {
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

//托管氢原子数
export const hostingDeviceList = async (params = {}, options = {}) => {
    const { current, pageSize, ...rest } = params;
    const res = await request('/auth/agency/userCity/hostingDeviceList', {
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

//氢原子租金单数
export const agencyleaseOrder = async (params = {}, options = {}) => {
    const { current, pageSize, ...rest } = params;
    const res = await request('/auth/java-admin/report/config/agencyleaseOrder', {
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

//投资商总人数
export const hostingUserList = async (params = {}, options = {}) => {
    const { current, pageSize, ...rest } = params;
    const res = await request('/auth/agency/userCity/hostingUserList', {
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


//运营商总人数
export const agencyOperateUser = async (params = {}, options = {}) => {
    const { current, pageSize, ...rest } = params;
    const res = await request('/auth/java-admin/report/config/agencyOperateUser', {
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


  export const accountCityDetail = async (params = {}, options = {}) => {
    const res = await request('/auth/agency/accountTeam/detail', {
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
  
  export const accountCityEdit = async (params = {}, options = {}) => {
    const res = await request('/auth/agency/accountTeam/edit', {
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
  
  
  export const checkAccount = async (params = {}, options = {}) => {
    const res = await request('/auth/agency/accountTeam/checkAccount', {
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
  
  export const accountCityResetPwd = async (params = {}, options = {}) => {
    const res = await request('/auth/agency/accountTeam/resetPwd', {
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





