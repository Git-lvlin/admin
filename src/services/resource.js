import request from '@/utils/request';

// 资源位列表
export async function getResList(params) {
  return request('/auth/java-admin/cms/json/selByWays', {
    method: 'POST',
    data: params,
  });
}

// 资源位详情
export async function getResDetail(params) {
  return request(`/auth/java-admin/cms/json/selById?id=${!!params.id ? params.id : ""}`, {
    method: 'GET',
  });
}

// 删除列表资源位
export async function getDeleteRes(params) {
  return request('/auth/java-admin/cms/json/delById', {
    method: 'POST',
    data: params,
  });
}

// 添加资源位
export async function addRes(params) {
  return request('/auth/java-admin/cms/json/save', {
    method: 'POST',
    data: params,
  });
}

// 编辑资源位
export async function updateRes(params) {
  return request('/auth/java-admin/cms/json/upd', {
    method: 'POST',
    data: params,
  });
}

// 添加版本号
export async function addVersion(params) {
  return request('/auth/java-admin/cms/appversion/save', {
    method: 'POST',
    data: params,
  });
}

// 更新版本号
export async function updateVersion(params) {
  return request('/auth/java-admin/cms/appversion/update', {
    method: 'POST',
    data: params,
  });
}

// 查询版本号详情
export async function getVersion(params) {
  return request(`/auth/java-admin/cms/appversion/selById?id=${params.id}`, {
    method: 'GET',
  });
}

// 查询版本号列表
export async function getVersionList(params) {
  return request(`/auth/java-admin/cms/appversion/selAll?page=${params.page}&size=${params.size}`, {
    method: 'GET',
  });
}

// 查询所有版本号
export async function getVersionAllList(params) {
  return request('/auth/java-admin/cms/appversion/selAllVersion', {
    method: 'GET',
    data: params,
  });
}

// 导入资源位数据
export async function inputVersionList(params) {
  return request('/auth/java-admin/cms/json/input', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    // data: params,
    body: params,
  });
}

