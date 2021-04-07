import React, { useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Form from './form';

const TableList = () => {
  const [formVisible, setFormVisible] = useState(false);
  const columns = [
    {
      title: '模板名称',
      dataIndex: 'name',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入模板名称'
      }
    },
    {
      title: '是否有指定地区不配送',
      dataIndex: 'name',
      onFilter: true,
      valueType: 'select',
      hideInTable: true,
      valueEnum: {
        1: {
          text: '全部',
        },
      },
    },
    {
      title: '是否有指定条件包邮',
      dataIndex: 'name',
      onFilter: true,
      valueType: 'select',
      hideInTable: true,
      valueEnum: {
        1: {
          text: '全部',
        },
      },
    },
    {
      title: '应用商品',
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
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button key="out" type="primary" icon={<PlusOutlined />} onClick={() => { setFormVisible(true) }}>新建</Button>
        </div>
      </Card>
      <ProTable
        rowKey="id"
        options={false}
        search={{
          defaultCollapsed: false,
          labelWidth: 150
        }}
        columns={columns}
      />
      <Form visible={formVisible} onClose={() => { setFormVisible(false) }} />
    </PageContainer>
  );
};

export default TableList;
