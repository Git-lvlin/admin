import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import { bindOperationPage } from '@/services/operation-management/bind-list'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'

const TableList = () => {
  const actionRef = useRef();
  const formRef = useRef();
  const [visit, setVisit] = useState(false)

  const columns = [
    {
      title: '运营商名称',
      dataIndex: 'operationName',
      valueType: 'text',
      hideInTable: true,
    },
    {
      title: '社区店名称',
      dataIndex: 'storeName',
      valueType: 'text',
    },
    {
      title: '社区店地址',
      dataIndex: 'address',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => {
        return `${Object.values(data.areaInfo).join('')}${_}`
      }
    },
    {
      title: '绑定状态',
      dataIndex: 'status',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '绑定状态',
      dataIndex: 'operationIsBinded',
      valueType: 'select',
      hideInTable: true,
      valueEnum: {
        1: '已绑',
        0: '未绑',
      }
    },
    {
      title: '绑定的运营商',
      dataIndex: 'operationCompanyName',
      valueType: 'text',
      hideInSearch: true,
    },
  ];

  const getFieldValue = () => {
    if (formRef?.current?.getFieldsValue) {
      const { current, pageSize, ...rest } = formRef?.current?.getFieldsValue?.();
      return rest
    }
    return {}
  }

  return (
    <>
      <ProTable
        rowKey="id"
        options={false}
        request={bindOperationPage}
        search={{
          defaultCollapsed: false,
          labelWidth: 130,
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
            <Export
              key="3"
              change={(e) => { setVisit(e) }}
              type="community-store-bind-export"
              conditions={getFieldValue}
            />,
            <ExportHistory key="4" show={visit} setShow={setVisit} type="community-store-bind-export" />,
          ],
        }}
        columns={columns}
        actionRef={actionRef}
        formRef={formRef}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
      />
    </>

  );
};

export default TableList;
