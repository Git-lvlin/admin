import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Space } from 'antd';

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
          ],
        }}
        columns={columns}
        actionRef={actionRef}
      />
    </PageContainer>

  );
};

export default TableList;
