import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Detail from './detail';

const TableList = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const actionRef = useRef();

  const columns = [
    {
      title: '订单号',
      dataIndex: 'brandName',
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
      dataIndex: 'brandName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '商品总额',
      dataIndex: 'brandName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '实付金额',
      dataIndex: 'brandName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '店主佣金',
      dataIndex: 'brandName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '买家信息',
      dataIndex: 'brandName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '订单状态',
      dataIndex: 'brandName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, data) => (
        <>
          <a onClick={() => { setSelectItem(data); setFormVisible(true) }}>详情</a>
          &nbsp;
          <a style={{ color: 'red' }} onClick={() => { brandDel(data.brandId) }}>终止</a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button key="out" type="primary" icon={<PlusOutlined />} onClick={() => { setFormVisible(true) }}>新建</Button>
        </div>
      </Card>
      <ProTable
        rowKey="brandId"
        options={false}
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
      <Detail />
    </PageContainer>

  );
};

export default TableList;
