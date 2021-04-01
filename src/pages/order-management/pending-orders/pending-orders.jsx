import React, { useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import Form from './form';

const TableList = () => {
  const columns = [
    {
      title: '订单编号',
      dataIndex: 'name',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入订单编号'
      }
    },
    {
      title: '货号',
      dataIndex: 'name',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入货号'
      }
    },
    {
      title: 'skuID',
      dataIndex: 'name',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入skuID'
      }
    },
    {
      title: '收货人姓名',
      dataIndex: 'name',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入收货人姓名'
      }
    },
    {
      title: '收货人手机号',
      dataIndex: 'name',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入收货人手机号'
      }
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品名称'
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: () => (
        <>
          <a>编辑</a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        options={false}
        search={{
          defaultCollapsed: false,
          labelWidth: 100
        }}
        columns={columns}
      />
      {/* <Form visible /> */}
    </PageContainer>

  );
};

export default TableList;
