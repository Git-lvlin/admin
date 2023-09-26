import request from '@/utils/request'
import moment from 'moment'
import { amountTransform } from '@/utils/utils'

export const provideGetListByParams = async (params = {}, options = {}) => {
  const { current=1, pageSize=10,tPlatformGain,...rest } = params
  const res = await request('/auth/goods/product/provideGetListByParams', {
    method: 'POST',
    data: {
      page: current,
      size: pageSize,
      tPlatformGainStart:tPlatformGain&&amountTransform(tPlatformGain.min,'*'),
      tPlatformGainEnd:tPlatformGain&&amountTransform(tPlatformGain.max,'*'),
      ...rest
    },
    ...options
  })
  return {
    data: res.data,
    success: res.success,
    code: res.code,
    total: res.data.total
  }
}

export const provideSaveData = async (params = {}, options = {}) => {
    const res = await request('/auth/goods/product/provideSaveData', {
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

export const provideUpdateGoodsState = async (params = {}, options = {}) => {
    const res = await request('/auth/goods/product/provideUpdateGoodsState', {
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

export const provideDeleteByIdArr = async (params = {}, options = {}) => {
    const res = await request('/auth/goods/product/provideDeleteByIdArr', {
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

export const provideSort = async (params = {}, options = {}) => {
    const res = await request('/auth/goods/product/provideSort', {
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

export const provideUpdateGoodsClassTag = async (params = {}, options = {}) => {
    const res = await request('/auth/goods/product/provideUpdateGoodsClassTag', {
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
