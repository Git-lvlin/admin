import { PageContainer } from '@/components/PageContainer';
import ProTable from '@ant-design/pro-table'
import React, { useRef } from 'react'
import { Button } from 'antd'
import moment from 'moment'
import { history } from 'umi'

import { amountTransform } from '@/utils/utils'
import { refundOrder } from '@/services/order-management/intensive-after-sale-orders'
import './styles.less'

const columns = [
  {
    title: '售后编号',
    dataIndex: 'refundId',
    align: 'center',
    order: 9
  },
  {
    title: '订单编号',
    dataIndex: 'orderId',
    align: 'center',
    order: 8,
  },
  {
    title: '申请时间',
    dataIndex: 'applyTime',
    valueType: 'dateTimeRange',
    align: 'center',
    order: 5,
    render: (_, recodes) => moment(recodes?.applyTime).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    title: '买家昵称',
    dataIndex: 'buyerNickname',
    align: 'center',
    order: 4,
  },
  {
    title: '供应商家id',
    dataIndex: 'supplierId',
    align: 'center',
    order: 1,
  },
  {
    title: '售后类型',
    dataIndex: 'refundType',
    align: 'center',
    order: 7,
    valueType: 'select',
    valueEnum: {
      1: '退款',
      2: '退货退款'
    }
  },
  {
    title: '退款总金额（元）',
    dataIndex: 'refundTotalMoney',
    align: 'center',
    hideInSearch: true,
    render: (_) => amountTransform(_, '/').toFixed(2)
  },
  {
    title: '退款状态',
    dataIndex: 'refundStatus',
    align: 'center',
    order: 6,
    valueType: 'select',
    valueEnum: {
      1: '待审核,',
      2: '拒绝审核',
      3: '待退货',
      4: '待退款',
      5: '拒绝退款',
      6: '退款中',
      7: '已完成',
      8: '已关闭'
    }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    valueType: 'option',
    align: 'center',
    render: (_, record) => <a onClick={ () => {history.push(`/order-management/intensive-after-sale-orders/detail/${record?.refundId}`)} }>查看详情</a>
  }
]

const afterSalesOrder = () => {
  const actionRef = useRef()

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey="refundId"
        options={false}
        params={{}}
        request={refundOrder}
        actionRef={actionRef}
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
            </Button>
          ]
        }}
        headerTitle="数据列表"
        columns={columns}
        pagination={{
          showQuickJumper: true,
          hideOnSinglePage: true,
          pageSize: 10
        }}
      />
    </PageContainer>
  )
}

export default afterSalesOrder
