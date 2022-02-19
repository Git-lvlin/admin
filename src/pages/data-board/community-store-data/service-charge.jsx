import React, { useState } from 'react'
import ProTable from '@ant-design/pro-table'

import AddressCascader from '@/components/address-cascader'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'

const ServiceCharge = () => {
  const [visit, setVisit] = useState(false)

  const getFieldValue = () => {

  }

  const columns = [
    {
      title: '社区店名称',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '店铺地址',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '缴费金额',
      dataIndex: '',
      align: 'center',
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
      dataIndex: '',
      align: 'center'
    },
    {
      title: '缴费有效期',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    }
  ]

  return (
    <ProTable
      rowKey=''
      columns={columns}
      params={{}}
      request={''}
      pagination={{
        showQuickJumper: true,
        pageSize: 10
      }}
      toolbar={{
        settings: false
      }}
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
