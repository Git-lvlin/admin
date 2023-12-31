import request from '@/utils/request';
import moment from 'moment';

//病例订单管理列表
export const getListByParams = async (params = {}, options = {}) => {
  const { current, pageSize, dateRange, area, ...rest } = params;
  const res = await request('/auth/healthy/provide/getListByParams', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      createTimeStart: dateRange?.[0]&& moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss'),
      createTimeEnd: dateRange?.[1]&& moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss'),
      provinceId: area?.[0]&&area[0].value,
      cityId: area?.[1]&&area[1].value,
      regionId: area?.[2]&&area[2].value,
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
      data: params,
      ...options
    });
  }

//咨询回复
export const consultAnswer = (params = {}, options = {}) => {
return request('/auth/healthy/provide/consultAnswer', {
    method: 'POST',
    data: params,
    ...options
});
}

//咨询回复内容
export const getConsultDataByParams = (params = {}, options = {}) => {
    return request('/auth/healthy/provide/getConsultDataByParams', {
        method: 'POST',
        data: params,
        ...options
    });
    }