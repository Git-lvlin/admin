import request from '@/utils/request';

export const spaceInfoList = async (params = {}, options = {}) => {
  const { current, pageSize, status, ...rest } = params;

  const data = {
    page: current,
    size: pageSize,
    ...rest
  }
  if (status) {
    data.status = Number(status);
  }
  const res = await request('/auth/activity/Activity/spaceInfoList', {
    method: 'POST',
    data,
    ...options
  });

  return {
    data: res.data.records || [],
    success: true,
    total: res.data.total,
  }
}

export const crazyActivityAdd = (params = {}, options = {}) => {
  return request('/auth/activity/Cms/cmsSub', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const spaceAdd = (params = {}, options = {}) => {
  return request('/auth/activity/Activity/spaceAdd', {
    method: 'POST',
    data: params,
    ...options
  });
}
export const spaceEdit = (params = {}, options = {}) => {
  return request('/auth/activity/Activity/spaceEdit', {
    method: 'POST',
    data: params,
    ...options
  });
}


export const bannerAdd = (params = {}, options = {}) => {
  return request('/auth/java-admin/cms/banner/saveOrUpdate', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const tagSortModify = (params = {}, options = {}) => {
  return request('/auth/activity/Goods/goodsTagSortSub', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const saveSortModify = (params = {}, options = {}) => {
  return request('/auth/activity/Goods/wholesaleGoodsSortSub', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const kingKongAdd = (params = {}, options = {}) => {
  return request('/auth/java-admin/cms/goodsType/goodsTypeSave', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const kingKongModify = (params = {}, options = {}) => {
  return request('/auth/java-admin/cms/goodsType/goodsTypeUpdate', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const expressNewsUpdate = (params = {}, options = {}) => {
  const { id, ...rest } = params

  const param = {
    ...rest
  }
  if (id) {
    param.id = id
  }
  const url = id?'/auth/java-admin/cms/notice/update':'/auth/java-admin/cms/notice/add';
  return request(url, {
    method: 'POST',
    data: param,
    ...options
  });
}

export const homeSuspensionAdd = (params = {}, options = {}) => {
  return request('/auth/java-admin/cms/bannerFloat/saveOrUpdate', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const saveMoneyList = async (params = {}, options = {}) => {
  const { current, pageSize, status, ...rest } = params;

  const data = {
    page: current,
    size: pageSize,
    ...rest
  }
  if (status) {
    data.status = Number(status);
  }
  const res = await request('/auth/activity/Goods/wholesaleGoodsList', {
    method: 'POST',
    data,
    ...options
  });

  return {
    data: res.data.records || [],
    success: true,
    total: res.data.total,
  }
}
export const hotGoosList = async (params = {}, options = {}) => {
  const { current, pageSize, status, goodsType, ...rest } = params;

  const data = {
    page: current,
    pageSize: pageSize,
    ...rest
  }
  if (goodsType) {
    data.goodsType = Number(goodsType)
  }
  if (status) {
    data.status = Number(status);
  }
  const res = await request('/auth/activity/Goods/goodsTagList', {
    method: 'POST',
    data,
    ...options
  });

  return {
    data: res.data.records || [],
    success: true,
    total: res.data.total,
  }
}
export const crazyDateList = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  
  const data = {
    page: current,
    size: pageSize,
    ...rest
  }
  const res = await request('/auth/activity/Cms/cmsList', {
    method: 'POST',
    data,
    ...options
  });

  return {
    data: res.data.records || [],
    success: true,
    total: res.data.total,
  }
}

export const crazyGoodsList = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;

  const data = {
    page: current,
    size: pageSize,
    ...rest
  }

  const res = await request('/auth/activity/Cms/cmsGoodsList', {
    method: 'POST',
    data,
    ...options
  });
  if (!res.data.records.length) {
    res.data = []
  }
  return {
    data: res.data.records || [],
    success: true,
    total: res.data.total,
  }
}

export const crazyActivityGoodsAdd = (params = {}, options = {}) => {
  return request('/auth/activity/Cms/cmsGoodsSub', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const hotGoosAdd = (params = {}, options = {}) => {
  return request('/auth/activity/Goods/goodsTagSub', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const priceListAdd = (params = {}, options = {}) => {
  return request('/auth/go-spider-api/contestprice/auth/contestprice/AddContestGoods', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const saveMoneyAdd = (params = {}, options = {}) => {
  return request('/auth/activity/Goods/wholesaleGoodsSub', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const hotGoosOperation = (params = {}, options = {}) => {
  return request('/auth/activity/Goods/goodsTagStatusSub', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const delContestGoods = (params = {}, options = {}) => {
  return request(`/auth/go-spider-api/contestprice/auth/contestprice/DelContestGoods?id=${params.id}`, {
    method: 'GET',
    data: params,
    ...options
  });
}

export const bindSkuId = (params = {}, options = {}) => {
  return request(`/auth/go-spider-api/spiderdbc/auth/spiderdbc/setContestBindSku?goodsSpuId=${params.goodsSpuId}&sourceType=${params.sourceType}&skuId=${params.skuId}`, {
    method: 'GET',
    data: params,
    ...options
  });
}

export const tagSortTop = (params = {}, options = {}) => {
  return request('/auth/activity/Goods/goodsTagSortTop', {
    method: 'POST',
    data: params,
    ...options
  });
}
export const saveMoneySortTop = (params = {}, options = {}) => {
  return request('/auth/activity/Goods/wholesaleGoodsSortTop', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const bannerSortTop = (params = {}, options = {}) => {
  return request('/auth/java-admin/cms/banner/setTop', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const crazyActivityDel = (params = {}, options = {}) => {
  return request('/auth/activity/Cms/cmsStatusSub', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const SetHotGoodsDel = (params = {}, options = {}) => {
  return request(`/auth/go-spider-api/contestprice/auth/contestprice/SetHotGoods?ids=${params.ids}&opt=${params.opt}`, {
    method: 'GET',
    data: params,
    ...options
  });
}

export const SetHomePageGoodsDel = (params = {}, options = {}) => {
  return request(`/auth/go-spider-api/contestprice/auth/contestprice/SetHomePageGoods?ids=${params.ids}&opt=${params.opt}`, {
    method: 'GET',
    data: params,
    ...options
  });
}
export const SetHomePageGoodsDelSort = (params = {}, options = {}) => {
  return request(`/auth/go-spider-api/contestprice/auth/contestprice/SetHomePageGoods?id=${params.id}&sort=${params.sort}&opt=${params.opt}`, {
    method: 'GET',
    data: params,
    ...options
  });
}

export const homeBannerDel = (params = {}, options = {}) => {
  return request('/auth/java-admin/cms/banner/delByIds', {
    method: 'POST',
    data: params,
    ...options
  });
}
export const homeSuspensionDel = (params = {}, options = {}) => {
  return request('/auth/java-admin/cms/bannerFloat/delById', {
    method: 'POST',
    data: params,
    ...options
  });
}
export const expressNewsDel = (params = {}, options = {}) => {
  return request('/auth/java-admin/cms/notice/deleteById', {
    method: 'POST',
    data: params,
    ...options,
  });
}

export const expressNewsDown = (params = {}, options = {}) => {
  return request('/auth/java-admin/cms/notice/updateState',{
    method: 'POST',
    data: params,
    ...options,
  })
}

export const expressNewsTop = (params = {}, options = {}) => {
  return request('/auth/java-admin/cms/notice/updateTop',{
    method: 'POST',
    data: params,
    ...options,
  })
}

export const kingKongTop = (params = {}, options = {}) => {
  return request('/auth/java-admin/cms/goodsType/updateTop',{
    method: 'POST',
    data: params,
    ...options,
  })
}

export const kongKongDistrictDel = (params = {}, options = {}) => {
  return request('/auth/java-admin/cms/goodsType/goodsTypeDelById', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const kongKongModifyType = (params = {}, options = {}) => {
  return request('/auth/java-admin/cms/goodsType/goodsTypeUpdateMoreState', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const modifySaveMoneySort = (params = {}, options = {}) => {
  return request('/auth/activity/Goods/wholesaleGoodsSortSub', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const memberOperation = (params = {}, options = {}) => {
  return request('/auth/activity/Activity/spanceInfoStatusEdit', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const goosAllList = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const data = {
    page: current,
    pageSize: pageSize,
    ...rest
  }
  const res = await request('/auth/activity/Goods/wholesaleTransGoodsList', {
    method: 'POST',
    data,
    ...options
  });

  return {
    data: res.data.records || [],
    success: true,
    total: res.data.total,
  }
}

export const goodsAllList = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;
  const data = {
    page: current,
    size: pageSize,
    ...rest
  }
  const res = await request('/auth/goods/product/skuList', {
    method: 'POST',
    data,
    ...options
  });

  return {
    data: res.data.records || [],
    success: true,
    total: res.data.total,
  }
}

export const goosReplaceList = async (params = {}, options = {}) => {
  const { current, pageSize, ...rest } = params;

  const data = {
    page: current,
    pageSize: pageSize,
    ...rest
  }
  const res = await request('/auth/activity/Goods/ylbbGoodsList', {
    method: 'POST',
    data,
    ...options
  });

  return {
    data: res.data.records || [],
    success: true,
    total: res.data.total,
  }
}

export const saveMoneyOperation = (params = {}, options = {}) => {
  return request('/auth/activity/Goods/wholesaleGoodsStatusSub', {
    method: 'POST',
    data: params,
    ...options
  });
}


export const saveMoneyFormList = async (params = {}, options = {}) => {
  const { current, pageSize, status, ...rest } = params;

  const data = {
    page: current,
    size: pageSize,
    ...rest
  }
  if (status) {
    data.status = Number(status);
  }
  const res = await request('/auth/activity/Goods/wholesaleTransGoodsList', {
    method: 'POST',
    data,
    ...options
  });

  return {
    data: res.data.records || [],
    success: true,
    total: res.data.total,
  }
}

export const homeBannerList = async (params = {}, options = {}) => {
  const { current, pageSize, status, ...rest } = params;

  const data = {
    page: current,
    pageSize: pageSize,
    ...rest
  }
  if (status) {
    data.status = Number(status);
  }
  const res = await request('/auth/java-admin/cms/banner/page', {
    method: 'POST',
    data,
    ...options
  });

  return {
    data: res.data.records || [],
    success: true,
    total: res.data.total,
  }
}


export const homeSuspensionList = async (params = {}, options = {}) => {
  const { current, pageSize, status, ...rest } = params;

  const data = {
    page: current,
    pageSize: pageSize,
    ...rest
  }
  if (status) {
    data.status = Number(status);
  }
  const res = await request('/auth/java-admin/cms/bannerFloat/page', {
    method: 'POST',
    data,
    ...options
  });

  return {
    data: res.data.records || [],
    success: true,
    total: res.data.total,
  }
}
export const expressNewsList = async (params = {}, options = {}) => {
  const { current, pageSize, state, id, ...rest } = params;

  const data = {
    page: current,
    size: pageSize,
    ...rest
  }
  if (state) {
    data.state = Number(state);
  }
  
  const res = await request('/auth/java-admin/cms/notice/selectByWays', {
    method: 'POST',
    data,
    ...options
  });

  return {
    data: res.data.records || [],
    success: true,
    total: res.data.total,
  }
}

export const kingKongDistrictList = async (params = {}, options = {}) => {
  const { current, pageSize, status, ...rest } = params;

  const data = {
    page: current,
    size: pageSize,
    ...rest
  }
  if (status) {
    data.status = Number(status);
  }
  const res = await request('/auth/java-admin/cms/goodsType/goodsTypeByWays', {
    method: 'POST',
    data,
    ...options
  });

  return {
    data: res.data.records || [],
    success: true,
    total: res.data.total,
  }
}

export const todayAllGoodsList = async (params = {}, options = {}) => {
  const { current, pageSize, status, ...rest } = params;

  const data = {
    page: current,
    pageSize: pageSize,
    ...rest
  }
  if (status) {
    data.status = Number(status);
  }
  const res = await request('/auth/activity/Goods/commonSpuList', {
    method: 'POST',
    data,
    ...options
  });

  return {
    data: res.data.records || [],
    success: true,
    total: res.data.total,
  }
}


export const memberSortTop = (params = {}, options = {}) => {
  return request('/auth/activity/Activity/spanceInfoSortTop', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const priceComparsionListAll = async (params = {}, options = {}) => {
  const { current, pageSize, ishot, ...rest } = params;

  const data = {
    page: current,
    size: pageSize,
    ...rest
  }
  const res = await request('/auth/go-spider-api/contestprice/auth/contestprice/GetContestGoodsList?isHot=0', {
    method: 'GET',
    data,
    ...options
  });

  return {
    data: res.data.records || [],
    success: true,
    total: res.data.total,
  }
}
export const priceComparsionListAlls = async (params = {}, options = {}) => {
  const { current, pageSize, ishot, ...rest } = params;

  const data = {
    page: current,
    size: pageSize,
    ...rest
  }
  const res = await request('/auth/go-spider-api/contestprice/auth/contestprice/GetContestGoodsList', {
    method: 'GET',
    data,
    ...options
  });

  return {
    data: res.data.records || [],
    success: true,
    total: res.data.total,
  }
}

export const priceComparsionList = async (params = {}, options = {}) => {
  const { current, pageSize, ishot, ...rest } = params;
  const data = {
    page: current,
    size: pageSize,
    ...rest
  }
  const res = await request('/auth/go-spider-api/contestprice/auth/contestprice/GetContestGoodsList?isHot=1', {
    method: 'GET',
    data,
    ...options
  });

  return {
    data: res.data.records || [],
    success: true,
    total: res.data.total,
  }
}

export const savePriceList = async (params = {}, options = {}) => {
  const { current, pageSize, status, ...rest } = params;

  const data = {
    page: current,
    size: pageSize,
    ...rest
  }
  if (status) {
    data.status = Number(status);
  }
  const res = await request('/auth/go-spider-api/contestprice/auth/contestprice/GetHotGoodsList', {
    method: 'GET',
    data,
    ...options
  });

  if (!res.data.length) {
    res.data = []
  }

  return {
    data: res.data || [],
    success: true,
    total: res.data.total,
  }
}

export const priceComparsionHomeList = async (params = {}, options = {}) => {
  const { current, pageSize, status, ...rest } = params;

  const data = {
    page: current,
    size: pageSize,
    ...rest
  }
  if (status) {
    data.status = Number(status);
  }
  const res = await request('/auth/go-spider-api/contestprice/auth/contestprice/GetFaceGoodsList', {
    method: 'GET',
    data,
    ...options
  });

  if (!res.data.length) {
    res.data = []
  }

  return {
    data: res.data || [],
    success: true,
    total: res.data.total,
  }
}

export const createTaskSrc = (params = {}, options = {}) => {
  return request('/auth/go-spider-api/spiderdbc/auth/spiderdbc/CreateTask', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const sendTask = (params = {}, options = {}) => {
  return request('/auth/go-spider-api/spiderdbc/auth/spiderdbc/SendTask', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const getSpiderGoodsListByDate = (params = {}, options = {}) => {
  return request(`/auth/go-spider-api/spiderdbc/auth/spiderdbc/GetSpiderGoodsListByDate?sourceType=${params.sourceType}&goodsId=${params.goodsId}`, {
    method: 'GET',
    data: params,
    ...options
  });
}