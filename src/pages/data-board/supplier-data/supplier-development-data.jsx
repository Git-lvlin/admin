import React from 'react'
import ProTable from '@ant-design/pro-table'

import { supplierDevelopmentData } from '@/services/data-board/supplier-data'

const SupplierDevelopmentData = () => {

  const columns =[
    {
      title: '时间范围',
      dataIndex: 'time',
      align: 'center',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '采购账号ID',
      dataIndex: 'operateId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '姓名',
      dataIndex: 'operateName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '开发供应商数量',
      dataIndex: 'supplierNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '集约商品审核通过数量（SPU）',
      dataIndex: 'wholesaleApprovedSpuNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '集约商品审核未通过数量（SPU）',
      dataIndex: 'wholesaleNotApprovedSpuNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '秒约商品审核通过数量（SPU）',
      dataIndex: 'secondApprovedSpuNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '秒约商品审核未通过数量（SPU）',
      dataIndex: 'secondNotApprovedSpuNum',
      align: 'center',
      hideInSearch: true
    }
  ]
  return (
    <ProTable
      rowKey='operateId'
      columns={columns}
      request={supplierDevelopmentData}
      params={{}}
      toolbar={{
        settings: false
      }}
      headerTitle='供应商开发数据'
      pagination={{
        showQuickJumper: true,
        pageSize: 10
      }}
      style={{
        marginTop: 30
      }}
    />
  )
}

export default SupplierDevelopmentData
