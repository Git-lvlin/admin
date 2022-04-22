import request from '@/utils/request'

// 购买_氢原子交易款的各个角色分成
export const getQyzBuyConfig = async (params = {}, options = {}) => {
  const { ...rest } = params
  const res = await request('/auth/goods/product/getQyzBuyConfig', {
    method: 'POST',
    data: {
      ...rest
    },
    ...options
  })
  return {
    data: res.data,
    success: res.success,
    code: res.code
  }
}


//租赁_氢原子租金款的各个角色提成比例
export const personDivide = async (params = {}, options = {}) => {
  const { ...rest } = params
  const res = await request('/auth/java-admin/bizConfig/findByCode/PERSON_DIVIDE', {
    method: 'POST',
    data: {
      ...rest
    },
    ...options
  })
  return {
    data: res.data,
    success: res.success,
    code: res.code
  }
}


//租赁_氢原子租金款的各个角色提成比例
export const aboutMachine = async (params = {}, options = {}) => {
  const { ...rest } = params
  const res = await request('/auth/java-admin/bizConfig/findByCode/ABOUT_MACHINE', {
    method: 'POST',
    data: {
      ...rest
    },
    ...options
  })
  return {
    data: res.data,
    success: res.success,
    code: res.code
  }
}