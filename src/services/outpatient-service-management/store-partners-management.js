import request from '@/utils/request'
import moment from 'moment'

// 门店合作商分页列表
export const shopPartnerPage = async (params = {}, options = {}) => {
  const { current, pageSize, area, signTime, ...rest } = params
  const res = await request('/auth/store/shopPartner/pageOrder', {
    method: 'GET',
    params: {
      ...rest,
      page: current,
      size: pageSize,
      provinceId: area && area?.[0].value,
      cityId: area && area?.[1].value,
      regionId: area && area?.[2].value,
      signTimeStart: signTime && moment(signTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      signTimeEnd: signTime && moment(signTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
    },
    ...options
  })
  return {
    data: res.data.records,
    total: res.data.total,
    success: res.success
  }
}

// 更新培训状态
export const shopPartnerChange = async (params = {}, options = {}) => {
  return await request('/auth/store/shopPartner/change', {
    method: 'POST',
    data: params,
    ...options
  })
}
