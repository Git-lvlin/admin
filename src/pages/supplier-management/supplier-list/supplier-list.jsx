import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Space } from 'antd';
import Edit from './edit';

const TableList = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const actionRef = useRef();

  const columns = [
    {
      title: '供应商名称',
      dataIndex: 'brandName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入供应商名称'
      }
    },
    {
      title: '登录账号',
      dataIndex: 'brandName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入登录账号'
      }
    },
    {
      title: '负责人',
      dataIndex: 'brandName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'brandName',
      valueType: 'select',
      valueEnum: {
        0: '禁用',
        1: '启用'
      }
    },
    {
      title: '创建人',
      dataIndex: 'brandName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'brandName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '子账号',
      dataIndex: 'brandName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, data) => (
        <Space>
          <a>禁用</a>
          <a>启用</a>
          <a>详情</a>
          <a>编辑</a>
          <a>售后地址</a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="brandId"
        options={false}
        // request={api.brand}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
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
            <Button key="out" type="primary" onClick={() => { setFormVisible(true) }}>新建</Button>,
          ],
        }}
        columns={columns}
        actionRef={actionRef}
      />
      <Edit visible={formVisible} setVisible={setFormVisible} />
    </PageContainer>

  );
};

export default TableList;
