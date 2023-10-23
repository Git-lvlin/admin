import request from "@/utils/request";

export const subCompanyStoreGoodsAdmSt = async (params = {}, options = {}) => {
  const res = await request('/auth/healthy/provider/subCompanyStoreGoodsAdmSt', {
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

export const subCompanyStoreGoodsAdm = async (params = {}, options = {}) => {
    const { current, pageSize, dateRange, address, ...rest } = params;
    const res = await request('/auth/healthy/provider/subCompanyStoreGoodsAdm', {
      method: 'POST',
      data: {
        page: current,
        size: pageSize,
        startTime:dateRange&&dateRange[0],
        endTime:dateRange&&dateRange[1],
        provinceId: address?.[0]?.value,
        cityId: address?.[1]?.value,
        areaId: address?.[2]?.value,
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



export const subCompanyProviderStoreGoodsSt = async (params = {}, options = {}) => {
    const res = await request('/auth/healthy/provider/subCompanyProviderStoreGoodsSt', {
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


export const subCompanyProviderStoreGoods = async (params = {}, options = {}) => {
    const { current, pageSize, dateRange, ...rest } = params;
    const res = await request('/auth/healthy/provider/subCompanyProviderStoreGoods', {
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

  export const AEDRecordSubCommissionSum = async (params = {}, options = {}) => {
    const res = await request('/auth/java-admin/financial/aedRecord/subCommissionSum', {
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


export const AEDRecordSubCommissionPage = async (params = {}, options = {}) => {
    const { current, pageSize, dateRange, ...rest } = params;
    const res = await request('/auth/java-admin/financial/aedRecord/subCommissionPage', {
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