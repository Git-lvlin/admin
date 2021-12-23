import React, { useState, useEffect } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { Button } from 'antd'

import { amountTransform } from '@/utils/utils'
import { platformCommissionPage } from '@/services/financial-management/transaction-detail-management'
import { Export, ExportHistory } from '@/pages/export-excel'
import Detail from '../../common-popup/order-pay-detail-popup'
import { orderTypes } from '@/services/financial-management/common'

// commission detail
const CommissionDetailManagement = () =>{
  const [detailVisible, setDetailVisible] = useState(false)
  const [selectItem, setSelectItem] = useState({})
  const [visit, setVisit] = useState(false)
  const [orderType, setOrderType] = useState(null)

  useEffect(() => {
    orderTypes({}).then(res=>{
      setOrderType(res.data)
    })
    return () => {
      setOrderType(null)
    }
  }, [])

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
      valueEnum: orderType
    },
    {
      title: '订单号',
      dataIndex: 'orderNo'
    },
    {
      title: '平台单号',
      dataIndex: 'payNo',
      render: (_, records) => (
        records?.orderNo?
        <a onClick={() => { setSelectItem(records.orderNo); setDetailVisible(true); }}>{_}</a>:
        <span>{_}</span>
      )
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
      render: (_, records)=> <a target='_blank' href={`/financial-management/transaction-detail-management/royalty-details/${records?.orderNo}?type=commission`}>详情</a>
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
      {
        detailVisible &&
        <Detail
          id={selectItem}
          visible={detailVisible}
          setVisible={setDetailVisible}
        />
      }
    </PageContainer>
  )
}

export default CommissionDetailManagement
