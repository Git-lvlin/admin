import React, { useState, useEffect, useRef } from 'react';
import { Button, Space } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { getStoreList } from '@/services/intensive-store-management/store-list';
import { history } from 'umi';

const StoreList = () => {

  const actionRef = useRef();
  const formRef = useRef();

  const columns = [
    {
      title: '店铺ID',
      dataIndex: 'id',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店铺ID'
      }
    },
    {
      title: '店铺图片',
      dataIndex: 'storeLogo',
      valueType: 'text',
      hideInSearch: true,
      render: (_) => <img src={_} width="50" height="50" />
    },
    {
      title: '店主手机号',
      dataIndex: 'phone',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店主手机号'
      }
    },
    {
      title: '店铺名称',
      dataIndex: 'storeName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店铺名称'
      }
    },
    {
      title: '等级',
      dataIndex: ['grade', 'gradeName'],
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '积分',
      dataIndex: 'score',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '提货点所在地区',
      dataIndex: 'address',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '集约任务',
      dataIndex: 'wholeTotal',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => _ > 0 ? <a onClick={() => { history.push(`/intensive-store-management/intensive-task/${data.storeNo}`) }}>{_}</a> : _
    },
    {
      title: '店主订单',
      dataIndex: 'saleOrderTotal',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => _ > 0 ? <a onClick={() => { history.push(`/intensive-store-management/shopkeeper-order/${data.storeNo}`) }}>{_}</a> : _
    },
    {
      title: '商品',
      dataIndex: 'productTotal',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => _ > 0 ? <a onClick={() => { history.push(`/intensive-store-management/product-management/${data.storeNo}`) }}>{_}</a> : _
    },
    {
      title: '用户',
      dataIndex: 'userTotal',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => _ > 0 ? <a onClick={() => { history.push(`/intensive-store-management/shop-user/${data.storeNo}`) }}>{_}</a> : _
    },
    {
      title: '所在地区',
      dataIndex: '',
      valueType: 'select',
      hideInTable: true,
    },
    {
      title: '详情地址',
      dataIndex: '',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入详情地址'
      },
      hideInTable: true,
    },
    {
      title: '营业状态',
      dataIndex: ['status', 'desc'],
      valueType: 'select',
    },
    {
      title: '操作',
      dataIndex: '',
      valueType: 'options',
      render: (_, data) => (
        <Space>
          <a onClick={() => { history.push(`/intensive-store-management/store-detail/${data.storeNo}`) }}>详情</a>
          <a>关闭</a>
        </Space>
      )
    },
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        options={false}
        actionRef={actionRef}
        formRef={formRef}
        request={getStoreList}
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
      />
    </PageContainer>
  );
};

export default StoreList;
