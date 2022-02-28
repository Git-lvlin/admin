import React, { useState } from 'react'
import ProTable from '@ant-design/pro-table'

import AddressCascader from '@/components/address-cascader'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import { amountTransform } from '@/utils/utils'
import { serviceFee } from '@/services/data-board/community-store-data'

const ServiceCharge = () => {
  const [visit, setVisit] = useState(false)

  const getFieldValue = () => {

  }

  const columns = [
    {
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true
    }, 
    {
      title: '社区店名称',
      dataIndex: 'storeName',
      width: '20%',
      align: 'center'
    },
    {
      title: '店铺地址',
      dataIndex: 'fullAddress',
      align: 'center',
      width: '20%',
      hideInSearch: true
    },
    {
      title: '缴费金额',
      dataIndex: 'serviceFee',
      align: 'center',
      render: (_)=> amountTransform(_, '/'),
      hideInSearch: true
    },
    {
      title: '地区范围',
      dataIndex: 'area',
      hideInTable: true,
      renderFormItem: () => <AddressCascader changeOnSelect/>
    },
    {
      title: '缴费时间',
      dataIndex: 'payTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '缴费时间',
      dataIndex: 'payTime',
      valueType: 'dateRange',
      align: 'center',
      hideInTable: true
    },
    {
      title: '缴费有效期',
      dataIndex: 'expireTime',
      align: 'center',
      hideInSearch: true
    }
  ]

  return (
    <ProTable
      rowKey='id'
      columns={columns}
      params={{}}
      request={serviceFee}
      pagination={{
        showQuickJumper: true,
        pageSize: 10
      }}
      toolbar={{
        settings: false
      }}
      headerTitle="服务费统计"
      search={{
        labelWidth: 120,
        optionRender: (searchConfig, formProps, dom) => [
          ...dom.reverse(),
          <Export
            change={(e)=> {setVisit(e)}}
            key="export" 
            type=""
            conditions={getFieldValue}
          />,
          <ExportHistory 
            key="export-history" 
            show={visit}
            setShow={setVisit}
            type=""
          />
        ]
      }}
    />
  )
}

export default ServiceCharge
