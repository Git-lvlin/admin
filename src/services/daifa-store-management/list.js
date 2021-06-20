import request from '@/utils/request';

export const storeList = async (params = {}, options = {}) => {
  const { current} = params;
  const res = await request('/auth/store/AgentShop/page', {
    method: 'POST',
    data: {
      page: current
    },
    ...options
  });

  return {
    data: res.data.length?res.data:[],
    success: true,
    total: res.data.total
  }
}

export const storeDetail = (params = {}, options = {}) => {
  return request('/auth/store/AgentShop/detail', {
    method: 'GET',
    params,
    ...options,
  });
}

export const storeAdd = (params = {}, options = {}) => {
  return request('/auth/store/AgentShop/add', {
    method: 'POST',
    data: params,
    ...options,
  });
}

export const storeEdit = (params = {}, options = {}) => {
  const {storeNo,...rest}=params
  return request('/auth/store/AgentShop/edit', {
    method: 'POST',
    data: {
      storeNo,
      ...rest
    },
    ...options,
  });
}

export const statusSwitch = (params = {}, options = {}) => {
  return request('/auth/store/AgentShop/status', {
    method: 'POST',
    data: params,
    ...options,
  });
}

export const commissionSum = async (params = {}, options = {}) => {
  const res = await request('/auth/store/AgentShopMoney/CommissionSum', {
    method: 'POST',
    data: params,
    ...options,
  });
  return {
    data: res.data,
    success: true,
  }
}

export const commissionPage = async (params = {}, options = {}) => {
  const { current, pageSize,storeNo, ...rest } = params;
  const res = await request('/auth/store/AgentShopMoney/CommissionPage', {
    method: 'POST',
    data:{
      page: current,
      size: pageSize,
      storeNo,
      ...rest
  },
    ...options,
  });
  return {
    data: res.data.records,
    success: true,
    total: res.data.total
  }
  
}

export const file_tpl_url = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/store/AgentShop/file_tpl_url', {
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
    success: true
  }
}

export const findPage = async (params = {}, options = {}) => {
  const { ...rest } = params;
  const res = await request('/auth/java-admin/importTask/findPage', {
    method: 'POST',
    data: {
      code:'inner_store_import',
      ...rest
    },
    ...options
  });
  return {
    data: res.data,
    success: true
  }
}

export const createImportTask = async (params = {}, options = {}) => {
  const { fileUrl} = params;
  const res = await request('/auth/java-admin/importTask/createImportTask', {
    method: 'POST',
    data: {
     code:'inner_store_import',
     fileUrl
    },
    ...options
  });
  return {
    data: res.data,
    success: true
  }
}

export const import_store = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const res = await request('/auth/store/AgentShop/import_store', {
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
    success: true
  }
}