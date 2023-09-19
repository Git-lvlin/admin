import request from '@/utils/request';

//病例订单管理列表
export const getListByParams = async (params = {}, options = {}) => {
  const { current, pageSize, dateRange, area, ...rest } = params;
  const res = await request('/auth/healthy/provide/getListByParams', {
    method: 'POST',
    params: {
      page: current,
      size: pageSize,
      createTimeStart: dateRange&& moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss'),
      createTimeEnd: dateRange&& moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss'),
      provinceId: area&&area[0].value,
      cityId: area&&area[1].value,
      regionId: area&&area[2].value,
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

// 病例订单发货
export const sendProduct = (params = {}, options = {}) => {
    return request('/auth/healthy/provide/sendProduct', {
      method: 'POST',
      params,
      ...options
    });
  }

//咨询回复
export const consultAnswer = (params = {}, options = {}) => {
return request('/auth/healthy/provide/consultAnswer', {
    method: 'POST',
    params,
    ...options
});
}

//咨询回复内容
export const getConsultDataByParams = (params = {}, options = {}) => {
    return request('/auth/healthy/provide/getConsultDataByParams', {
        method: 'POST',
        params,
        ...options
    });
    }