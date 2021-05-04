import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { Button, Space } from 'antd';
import { helperList } from '@/services/supplier-management/supplier-list'

import Edit from './edit';

const TableList = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const actionRef = useRef();

  const columns = [
    {
      title: '顾问名称',
      dataIndex: 'companyUserName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入顾问名称'
      }
    },
    {
      title: '登录账号',
      dataIndex: 'accountName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入登录账号'
      }
    },
    {
      title: '手机号码',
      dataIndex: 'companyUserPhone',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        0: '禁用',
        1: '启用'
      }
    },
    {
      title: '创建人',
      dataIndex: 'createUser',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '涉及供应商',
      dataIndex: 'manageSupplierNum',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '返佣SPU商品',
      dataIndex: 'manageGoodsNum',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, data) => (
        <Space>
          {data.status === 1 && <a>禁用</a>}
          {data.status === 2 && <a>启用</a>}
          <a>修改密码</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable
        rowKey="id"
        options={false}
        request={helperList}
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
      <Edit
        visible={formVisible}
        setVisible={setFormVisible}
        callback={() => { actionRef.current.reload() }}
      />
    </>

  );
};

export default TableList;
