import React, { useRef, useState } from 'react'
import ProTable from '@ant-design/pro-table'

import { supplierDevelopmentData } from '@/services/data-board/supplier-data'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'

const SupplierDevelopmentData = () => {
  const [visit, setVisit] = useState(false)
  const form = useRef()

  const getFieldValue = () => {
    const { time, ...rest } = form.current.getFieldsValue()
    return {
      startTime: time?.[0]?.format('YYYY-MM-DD'),
      endTime: time?.[1].format('YYYY-MM-DD'),
      ...rest
    }
  }

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
      formRef={form}
      toolbar={{
        settings: false
      }}
      headerTitle='供应商开发数据'
      pagination={{
        showQuickJumper: true,
        pageSize: 10
      }}
      search={{
        optionRender: (searchConfig, formProps, dom)=>[
          ...dom.reverse(),
          <Export
            change={(e)=> {setVisit(e)}}
            key="export" 
            type="data-board-supplier-development-data"
            conditions={getFieldValue}
          />,
          <ExportHistory
            key="export-history" 
            show={visit} setShow={setVisit}
            type="data-board-supplier-development-data"
          />
        ]
      }}
      style={{
        marginTop: 30
      }}
    />
  )
}

export default SupplierDevelopmentData
