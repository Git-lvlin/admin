import React, { useState } from 'react'
import ProTable from '@ant-design/pro-table'

export default ({data}) => {
  const [id, setId] = useState()
  const dataSource = Array.isArray(data) ? [] : [data]

  const columns = [
    { 
      title: '操作人角色',
      dataIndex: 'returnNum',
      align: 'center' 
    },
    {
      title: '操作人ID',
      dataIndex: 'goodsInfo',
      align: 'center',
    },
    {
      title: '操作人账号',
      dataIndex: 'skuSalePrice',
      align: 'center',
    },
    { 
      title: '操作时间',
      dataIndex: 'unit',
      align: 'center' 
    },
    { 
      title: '动作',
      dataIndex: 'returnNum',
      align: 'center' 
    },
  ]

  return (
    <>
      <ProTable
        rowKey="orderItemId"
        pagination={false}
        columns={columns}
        bordered
        options={false}
        headerTitle="操作流程记录"
        search={false}
        dataSource={dataSource}
      />
    </>
  )
}
