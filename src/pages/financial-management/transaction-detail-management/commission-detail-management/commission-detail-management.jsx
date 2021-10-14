import React, { useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { Button } from 'antd'
import { history } from 'umi'

import { amountTransform } from '@/utils/utils'
import { platformCommissionPage } from '@/services/financial-management/transaction-detail-management'
import { Export, ExportHistory } from '@/pages/export-excel'

// commission detail
const CommissionDetailManagement = () =>{
  const [visit, setVisit] = useState(false)

  const skipToDetail = data => {
    history.push(`/financial-management/transaction-detail-management/royalty-details/${data}?type=commission`)
  }

  const getFieldValue = (form) => {
    const { createTime, ...rest } = form.getFieldsValue()
    return {
      begin: createTime?.[0]?.format('YYYY-MM-DD'),
      end: createTime?.[1]?.format('YYYY-MM-DD'),
      ...rest
    }
  }

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '序号',
      dataIndex: 'serial',
      valueType: 'indexBorder'
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      valueType: 'select',
      valueEnum: {
        'second': '秒约订单',
        'commandSalesOrder': '集约批发订单',
        'activeSalesOrder': '主动集约店主订单',
        'dropShipping1688': '1688代发订单',
        'commandCollect': '集约销售订单',
        'activeCollect': '主动集约C端订单',
        'blindBox': '盲盒订单',
        'signIn': '签到订单'
      },
      hideInSearch: true
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      valueType: 'select',
      valueEnum: {
        'commandSalesOrder': '集约批发订单',
        'second': '秒约订单',
        'dropShipping1688': '1688代发订单',
      },
      hideInTable: true
    },
    {
      title: '订单号',
      dataIndex: 'orderNo'
    },
    {
      title: '平台单号',
      dataIndex: 'payNo'
    },
    {
      title: '资金流水号',
      dataIndex: 'transactionId'
    },
    {
      title: '金额',
      dataIndex: 'amount',
      render: (_)=> amountTransform(_, '/'),
      hideInSearch: true
    },
    {
      title: '手续费',
      dataIndex: 'fee',
      render: (_)=> amountTransform(_, '/'),
      hideInSearch: true
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '操作',
      dataIndex: 'optoion',
      valueType: 'option',
      render: (_, records)=> <a onClick={()=>{skipToDetail(records?.orderNo)}}>详情</a>
    }
  ]
  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='id'
        columns={columns}
        toolBarRender={false}
        search={{
          optionRender: ({searchText, resetText}, {form}) => [
            <Button
              key="search"
              type="primary"
              onClick={() => {
                form?.submit()
              }}
            >
              {searchText}
            </Button>,
            <Button
              key="rest"
              onClick={() => {
                form?.resetFields()
                form?.submit()
              }}
            >
              {resetText}
            </Button>,
            <Export
              change={(e)=> {setVisit(e)}}
              key="export"
              type="financial-trans-platformCommission-page-export"
              conditions={getFieldValue(form)}
            />,
            <ExportHistory
              key="exportHistory"
              show={visit}
              setShow={setVisit}
              type="financial-trans-platformCommission-page-export"
            />
          ],
        }}
        pagination={{
          pageSize: 10,
          hideOnSinglePage: true,
          showQuickJumper: true
        }}
        params={{}}
        request={platformCommissionPage}
      />
    </PageContainer>
  )
}

export default CommissionDetailManagement
