import React, { useState, useEffect } from 'react'
import { PageContainer } from '@/components/PageContainer';
import ProTable from '@ant-design/pro-table'
import { history } from 'umi'
import { Button } from 'antd'

import { amountTransform } from '@/utils/utils'
import { operationCommissionPage } from '@/services/financial-management/operator-revenue-detail-management'
import { Export, ExportHistory } from '@/pages/export-excel'
import Detail from '../../common-popup/order-pay-detail-popup'
import { orderTypes } from '@/services/financial-management/common'
import RoyaltyDetails from "../royalty-details"

const OperatorRevenueManagement = () =>{
  const [visit, setVisit] = useState(false)
  const [detailVisible, setDetailVisible] = useState(false)
  const [royaltyVisible, setRoyaltyVisible] = useState(false)
  const [selectItem, setSelectItem] = useState({})
  const [orderType, setOrderType] = useState(null)
  const [type, setType] = useState('')

  const getFieldValue = (form) => {
    const { createTime, ...rest } = form.getFieldsValue()
    return {
      begin: createTime?.[0].format('YYYY-MM-DD'),
      end: createTime?.[1].format('YYYY-MM-DD'),
      ...rest
    }
  }

  useEffect(() => {
    orderTypes({}).then(res=>{
      setOrderType(res.data)
    })
    return () => {
      setOrderType(null)
    }
  }, [])

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
      title: '受益方ID',
      dataIndex: 'accountId'
    },
    {
      title: '受益方手机',
      dataIndex: 'accountMobile'
    },
    {
      title: '会员类型',
      dataIndex: 'accountType',
      valueType: 'select',
      valueEnum: {
        'agentCompany': '运营商',
        'platform': '平台'
      }
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      valueType: 'select',
      valueEnum: orderType,
      hideInTable: true
    },
    {
      title: '订单类型',
      dataIndex: 'orderTypeDesc',
      hideInSearch: true
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
      dataIndex: 'option',
      valueType: 'option',
      render: (_, records)=> <a onClick={()=> {setRoyaltyVisible(true); setSelectItem(records?.orderNo); setType('operator')}}>详情</a>
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
              type="financial-trans-agentCompanyCommission-page-export"
              conditions={()=>getFieldValue(form)}
            />,
            <ExportHistory
              key="exportHistory"
              show={visit}
              setShow={setVisit}
              type="financial-trans-agentCompanyCommission-page-export"
            />
          ],
        }}
        pagination={{
          pageSize: 10,
          hideOnSinglePage: true,
          showQuickJumper: true
        }}
        params={{}}
        request={operationCommissionPage}
      />
      {
        detailVisible &&
        <Detail
          id={selectItem}
          visible={detailVisible}
          setVisible={setDetailVisible}
        />
      }
      {
        royaltyVisible &&
        <RoyaltyDetails
          id={selectItem}
          visible={royaltyVisible}
          setVisible={setRoyaltyVisible}
          title='运营商收益明细'
          type={type}
        />
      }
    </PageContainer>
  )
}

export default OperatorRevenueManagement
