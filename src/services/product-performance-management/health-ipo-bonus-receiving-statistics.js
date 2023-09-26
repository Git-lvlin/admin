import request from "@/utils/request";
import moment from 'moment'
import { amountTransform } from "@/utils/utils";

export const ipoAwardProviderDirectMember = async (params = {}, options = {}) => {
    const { current, pageSize, amount, ...rest } = params;
    const res = await request('/auth/healthy/provider/ipoAwardProviderDirectMember', {
        method: 'POST',
        data: {
        page: current,
        size: pageSize,
        min: amount && amountTransform(amount?.min,'*'),
        max: amount && amountTransform(amount?.max,'*'),
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

export const ipoAwardProviderDirectMemberSt = async (params = {}, options = {}) => {
    const { current, pageSize, amount, ...rest } = params;
    const res = await request('/auth/healthy/provider/ipoAwardProviderDirectMemberSt', {
        method: 'POST',
        data: {
        page: current,
        size: pageSize,
        min: amount && amountTransform(amount?.min,'*'),
        max: amount && amountTransform(amount?.max,'*'),
        ...rest
        },
        ...options
    });

    return {
        data: res.data,
        success: true,
        code: res.code
    }
}

export const ipoAwardProviderDirectMemberDetail = async (params = {}, options = {}) => {
    const { current, pageSize, amount, ...rest } = params;
    const res = await request('/auth/healthy/provider/ipoAwardProviderDirectMemberDetail', {
        method: 'POST',
        data: {
        page: current,
        size: pageSize,
        min: amount && amountTransform(amount?.min,'*'),
        max: amount && amountTransform(amount?.max,'*'),
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

export const ipoAwardStoreDirectMember = async (params = {}, options = {}) => {
    const { current, pageSize, amount, ...rest } = params;
    const res = await request('/auth/healthy/provider/ipoAwardStoreDirectMember', {
      method: 'POST',
      data: {
        page: current,
        size: pageSize,
        min: amount && amountTransform(amount?.min,'*'),
        max: amount && amountTransform(amount?.max,'*'),
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

  export const ipoAwardStoreDirectMemberSt = async (params = {}, options = {}) => {
    const { current, pageSize, ...rest } = params;
    const res = await request('/auth/healthy/provider/ipoAwardStoreDirectMemberSt', {
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
      success: true,
      code: res.code
    }
  }

  export const ipoAwardStoreDirectMemberDetail = async (params = {}, options = {}) => {
    const { current, pageSize, amount, ...rest } = params;
    const res = await request('/auth/healthy/provider/ipoAwardStoreDirectMemberDetail', {
      method: 'POST',
      data: {
        page: current,
        size: pageSize,
        min: amount && amountTransform(amount?.min,'*'),
        max: amount && amountTransform(amount?.max,'*'),
        ...rest
      },
      ...options
    });
  
    return {
      data: res.data.records,
      success: true,
      code: res.code
    }
  }