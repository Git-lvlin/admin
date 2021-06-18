import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import React, { useRef } from 'react'
import XLSX from 'xlsx'
import { Button } from 'antd'
import moment from 'moment'
import { history } from 'umi'

import { refundOrder } from '@/services/order-management/after-sales-order'
import { amountTransform } from '@/utils/utils'
import './styles.less'


const sourceType = {
  null: '全部',
  1: '待审核',
  2: '处理中',
  3: '已拒绝申请',
  4: '已拒绝退款',
  5: '已完成',
  6: '已关闭'
}

const columns = [
  {
    title: '售后编号',
    dataIndex: 'orderSn',
    align: 'center',
    order: 9,
    colSize: .9,
    render: (_, records) => {
      return(
        <>
          <div key="1">{ records?.orderSn }</div>
          <div key="2">
            { 
              records?.platformInvolved === 1&& 
              <span 
                style={{
                  background: 'rgba(250, 205, 145, 1)', 
                  fontSize: 12,
                  padding: 4,
                  borderRadius: 5
                }}
              >
                平台已介入
              </span> 
            }
          </div>
        </>
      )
    }
  },
  {
    title: '订单编号',
    dataIndex: 'subOrderSn',
    align: 'center',
    order: 8,
    colSize: .9
  },
  {
    title: '申请时间',
    dataIndex: 'applyTime',
    valueType: 'dateRange',
    align: 'center',
    order: 5,
    colSize: .9,
    render: (_, recodes) => moment(recodes?.applyTime).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    title: '买家昵称',
    dataIndex: 'userNickname',
    colSize: .9,
    align: 'center',
    order: 4,
    colSize: .9
  },
  {
    title: '买家手机号',
    dataIndex: 'buyerPhone',
    colSize: .9,
    align: 'center',
    order: 3
  },
  {
    title: '商家名称',
    dataIndex: 'storeName',
    colSize: 1,
    align: 'center',
    order: 2,
    colSize: .9
  },
  {
    title: '商家手机号',
    dataIndex: 'storePhone',
    colSize: 1,
    align: 'center',
    order: 1,
    colSize: .9
  },
  {
    title: '售后类型',
    dataIndex: 'afterSalesType',
    valueType: 'select',
    valueEnum: {
      null: '全部',
      1: '仅退款',
      2: '退款退货'
    },
    colSize: .8,
    align: 'center',
    order: 7
  },
  {
    title: '退款总金额（元）',
    dataIndex: 'returnAmount',
    align: 'center',
    hideInSearch: true,
    render: (_) => amountTransform(_, '/').toFixed(2)
  },
  {
    title: '退款状态',
    dataIndex: 'status',
    valueEnum: sourceType,
    valueType: 'select',
    colSize: .8,
    align: 'center',
    order: 6
  },
  {
    title: '操作',
    dataIndex: 'operation',
    valueType: 'option',
    align: 'center',
    render: (_, record) => {
      return (
        <>
          <a onClick={ () => {history.push(`/order-management/after-sales-order/detail/${record?.id}`)} }>查看详情</a>
        </>
      )
    }
  }
]


// 导出表格
const exportExcel = (form) => {
  console.log(form)
}
const afterSalesOrder = () => {
  const actionRef = useRef();
  return (
    <PageContainer title={false}>
      <ProTable
        rowKey="orderSn"
        options={false}
        params={{}}
        request={refundOrder}
        actionRef={actionRef}
        search={{
          span: 5,
          defaultCollapsed: false,
          collapseRender: false,
          optionRender: ({ searchText, resetText }, { form }) => [
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
            // <Button key="out" onClick={() => { exportExcel(form) }}>导出</Button>
          ],
        }}
        rowSelection={{
          type: "checkbox"
        }}
        headerTitle="数据列表"
        columns={columns}
        pagination={{
          showQuickJumper: true,
          hideOnSinglePage: true
        }}
      />
    </PageContainer>
  )
}

export default afterSalesOrder
