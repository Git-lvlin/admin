import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getSupplierOrderList, getSupplierOrderDetail } from '@/services/order-management/supplier-order'
import Detail from './detail';

const TableList = ({ type }) => {
  const [visible, setVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const actionRef = useRef();

  const getDetail = (orderId) => {
    getSupplierOrderDetail({ orderId })
      .then(res => {
        if (res.code === 0) {
          setVisible(true);
          setDetailData(res.data);
        }
      })
  }

  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入订单号'
      },
      hideInTable: true,
    },
    {
      title: '商品名称',
      dataIndex: 'brandName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品名称'
      },
      hideInTable: true,
    },
    {
      title: '买家昵称',
      dataIndex: 'brandName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入买家昵称'
      },
      hideInTable: true,
    },
    {
      title: '买家手机号',
      dataIndex: 'brandName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入买家手机号'
      },
      hideInTable: true,
    },
    {
      title: '店主名称',
      dataIndex: 'brandName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店主名称'
      },
      hideInTable: true,
    },
    {
      title: '订单日期',
      dataIndex: 'brandName',
      valueType: 'dateRange',
      hideInTable: true,
    },
    {
      title: '商品信息',
      dataIndex: 'sku',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => (
        <div>
          <div>供应商名称：{data?.supplier?.companyName}</div>
          <div>订单号：{_.orderId}&nbsp;&nbsp;{data.createTime}</div>
          <div style={{ display: 'flex' }}>
            <img src={_.skuImageUrl} width={50} height={50} />
            <div style={{ marginLeft: 10 }}>
              <div>{_.goodsName}</div>
              <div>店主价：¥{_.price}</div>
              <div><span>预订量：{_.totalNum}件</span>&nbsp;<span>发货量：{_.advancePaymentNum}件</span></div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: '订金',
      dataIndex: 'advancePayment',
      valueType: 'text',
      hideInSearch: true,
      render: (text) => `¥${text}`
    },
    {
      title: '尾款',
      dataIndex: 'finalPayment',
      valueType: 'text',
      hideInSearch: true,
      render: (text) => `¥${text}`
    },
    {
      title: '店主信息',
      dataIndex: 'store',
      valueType: 'text',
      hideInSearch: true,
      render: (_) => (
        <>
          <div>{_.linkman}</div>
          <div>{_.phone}</div>
        </>
      )
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, data) => (
        <Space>
          <a onClick={() => { getDetail(data.orderId) }}>查看</a>
          {data.status === '已关闭' && <a onClick={() => { }}>开启</a>}
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable
        rowKey="orderId"
        options={false}
        params={{
          wholesaleType: 5,
          status: type
        }}
        request={getSupplierOrderList}
        search={{
          defaultCollapsed: false,
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
            <Button key="out" onClick={() => { exportExcel(form) }}>导出</Button>,
          ],
        }}
        columns={columns}
        actionRef={actionRef}
      />
      {detailData && <Detail detailData={detailData} visible={visible} onClose={() => { setVisible(false) }} />}
    </>

  );
};

export default TableList;
