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
      title: '角色名称',
      dataIndex: 'name',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入角色名称'
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
