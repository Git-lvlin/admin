import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import React, { useRef } from 'react';
import XLSX from 'xlsx'
import { Button } from 'antd';
import moment from 'moment';
import * as api from '@/services/order-management/after-sales-order';
import { history } from 'umi';
import './styles.less';


const sourceType = {
  0: '全部',
  1: '待处理',
  2: '待收货',
  3: '已收货',
  4: '拒绝申请',
  5: '拒绝退款',
  6: '已完成',
  7: '已关闭'
};

const columns = [
  {
    title: '售后编号',
    dataIndex: 'afterSalesNumber',
    fieldProps: {
      placeholder: '请输入售后编号'
    },
    align: 'center',
    order: 9,
    colSize: .9
  },
  {
    title: '订单编号',
    dataIndex: 'orderNumber',
    fieldProps: {
      placeholder: '请输入订单编号'
    },
    align: 'center',
    order: 8,
    colSize: .9
  },
  {
    title: '申请时间',
    dataIndex: 'applicationTime',
    valueType: 'dateRange',
    align: 'center',
    order: 5,
    colSize: .9,
    render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    title: '买家昵称',
    dataIndex: 'buyerNickname',
    colSize: .9,
    fieldProps: {
      placeholder: '请输入买家昵称'
    },
    align: 'center',
    order: 4,
    colSize: .9
  },
  {
    title: '买家手机号',
    dataIndex: 'buyerPhoneNumber',
    colSize: .9,
    fieldProps: {
      placeholder: '请输入买家手机号'
    },
    align: 'center',
    order: 3
  },
  {
    title: '商家名称',
    dataIndex: 'SellerName',
    colSize: 1,
    fieldProps: {
      placeholder: '请输入商家名称'
    },
    align: 'center',
    order: 2,
    colSize: .9
  },
  {
    title: '商家手机号',
    dataIndex: 'SellerPhoneNumber',
    colSize: 1,
    fieldProps: {
      placeholder: '请输入商家手机号'
    },
    align: 'center',
    order: 1,
    colSize: .9
  },
  {
    title: '售后类型',
    dataIndex: 'afterSalesType',
    onFilter: true,
    valueEnum: {
      0: '全部',
      1: '退货退款',
      2: '仅退款'
    },
    colSize: .8,
    align: 'center',
    order: 7
  },
  {
    title: '退款总金额（元）',
    dataIndex: 'totalRefundAmount',
    align: 'center',
    hideInSearch: true
  },
  {
    title: '退款状态',
    dataIndex: 'refundStatus',
    valueEnum: sourceType,
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
          <a onClick={ () => {history.push(`/order-management/after-sales-order/detail/${record.afterSalesNumber}`)} }>查看详情</a>
        </>
      )
    }
  }
]

const dataSource = () => {
  const data = [
    { 
      afterSalesNumber: "1",
      OrderNumber:"3",
      applicationTime: "66",
      buyerNickname: "仅退款",
      buyerPhoneNumber: "100",
      SellerName: "任性",
      SellerPhoneNumber: "已退款",
      afterSalesType: '1',
      totalRefundAmount: '1',
      refundStatus: '1'
    },
    { 
      afterSalesNumber: "2",
      OrderNumber:"3",
      applicationTime: "66",
      buyerNickname: "退货退款",
      buyerPhoneNumber: "100",
      SellerName: "任性",
      SellerPhoneNumber: "已退款",
      afterSalesType: '1',
      totalRefundAmount: '100',
      refundStatus: '1'
    },
  ]
  return {
    success: true,
    data,
    total: 10
  }
}

// 导出表格
const exportExcel = (form) => {
  console.log(form);
}
const afterSalesOrder = () => {
  const actionRef = useRef();
  return (
    <PageContainer>
      <ProTable
        rowKey="afterSalesNumber"
        options={false}
        params={{
          selectType: 1
        }}
        request={dataSource}
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
                form?.submit();
              }}
            >
              {searchText}
            </Button>,
            <Button
              key="rest"
              onClick={() => {
                form?.resetFields();
              }}
            >
              {resetText}
            </Button>,
            <Button key="out" onClick={() => { exportExcel(form) }}>导出</Button>
          ],
        }}
        rowSelection={{
          type: "checkbox"
        }}
        headerTitle="数据列表"
        columns={columns}
        pagination={{
          current: 10,
          showQuickJumper: true
        }}
      />
    </PageContainer>
  )
}

export default afterSalesOrder;
