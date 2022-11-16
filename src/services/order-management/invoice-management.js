import request from '@/utils/request';

export const getInvoiceList = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/invoice/invoice/getInvoiceList', {
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


export const updateAdminInvoiceUrl = async (params = {}, options = {}) => {
    const res = await request('/auth/invoice/invoice/updateAdminInvoiceUrl', {
      method: 'POST',
      data: {
        ...params
      },
      ...options
    })
    return {
       data: res.data,
       success: true,
       code: res.code
    }
  }

export const updateAdminPayInfo = async (params = {}, options = {}) => {
    const res = await request('/auth/invoice/invoice/updateAdminPayInfo', {
      method: 'POST',
      data: {
        ...params
      },
      ...options
    })
    return {
       data: res.data,
       success: true,
       code: res.code
    }
  }

export const updateAdminReject = async (params = {}, options = {}) => {
    const res = await request('/auth/invoice/invoice/updateAdminReject', {
      method: 'POST',
      data: {
        ...params
      },
      ...options
    })
    return {
       data: res.data,
       success: true,
       code: res.code
    }
  }

export const updateAdminCancel = async (params = {}, options = {}) => {
    const res = await request('/auth/invoice/invoice/updateAdminCancel', {
      method: 'POST',
      data: {
        ...params
      },
      ...options
    })
    return {
       data: res.data,
       success: true,
       code: res.code
    }
}

export const updateAdminInvoiceInfo = async (params = {}, options = {}) => {
    const res = await request('/auth/invoice/invoice/updateAdminInvoiceInfo', {
      method: 'POST',
      data: {
        ...params
      },
      ...options
    })
    return {
       data: res.data,
       success: true,
       code: res.code
    }
  }