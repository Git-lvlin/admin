import React, { useState } from 'react';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import Form from './form';


const TableList = () => {

  const [formVisible, setFormVisible] = useState(false);

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
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
      dataIndex: 'name',
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
      dataIndex: 'name',
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
      title: '创建时间',
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

  const newAccount = () => {
    setFormVisible(true);
  }

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        options={false}
        search={{
          defaultCollapsed: false,
          optionRender: ({ searchText, resetText }, { form }) => [
            <Button onClick={newAccount} key="out" type="primary" icon={<PlusOutlined />}>新建</Button>,
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
      />
      <Form visible={formVisible} setVisible={setFormVisible} />
    </PageContainer>

  );
};

export default TableList;
