import React, { useState } from 'react';
import { Button, Card } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import * as api from '@/services/setting/account-management';
import Form from './form';

const TableList = () => {

  const [formVisible, setFormVisible] = useState(false);

  const newAccount = () => {
    setFormVisible(true);
  }

  const columns = [
    {
      title: '名称',
      dataIndex: 'username',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入名称'
      }
    },
    {
      title: '登录账号',
      dataIndex: 'name',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入登录账号'
      }
    },
    {
      title: '角色',
      dataIndex: 'title',
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        1: {
          text: 'iOS',
        },
        2: {
          text: 'Android',
        },
        3: {
          text: 'MiniProgram',
        },
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      onFilter: true,
      valueType: 'select',
      hideInTable: true,
      valueEnum: {
        1: {
          text: '开启',
        },
        2: {
          text: '禁用',
        },
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'text',
      hideInSearch: true,
      render: (text) => text === 1 ? '开启' : '禁用',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        return (
          <a onClick={newAccount}>编辑</a>
        )
      },
    },
  ];

  return (
    <PageContainer>
      <Card>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button onClick={newAccount} key="out" type="primary" icon={<PlusOutlined />}>新建</Button>
        </div>
      </Card>
      <ProTable
        rowKey="id"
        options={false}
        request={(params) => api.adminList(params)}
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
          ],
        }}
        columns={columns}
        pagination={false}
      />
      <Form visible={formVisible} setVisible={setFormVisible} />
    </PageContainer>
  );
};

export default TableList;
