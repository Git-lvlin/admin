import React, { useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Form from './form';

const TableList = () => {
  const columns = [
    {
      title: '品牌名称',
      dataIndex: 'name',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入品牌名称'
      }
    },
    {
      title: '品牌logo',
      dataIndex: 'name',
      valueType: 'text',
      hideInSearch: true,
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
      <Card>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button key="out" type="primary" icon={<PlusOutlined />}>新建</Button>
        </div>
      </Card>
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
