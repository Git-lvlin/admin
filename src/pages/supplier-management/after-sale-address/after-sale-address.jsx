import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons'

const TableList = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const actionRef = useRef();

  const columns = [
    {
      title: '序号',
      dataIndex: 'brandName',
      valueType: 'text',
    },
    {
      title: '售后联系人',
      dataIndex: 'brandName',
      valueType: 'text',
    },
    {
      title: '售后联系人手机号码',
      dataIndex: 'brandName',
      valueType: 'text',
    },
    {
      title: '售后地址',
      dataIndex: 'brandName',
      valueType: 'text',
    },
    {
      title: '默认售后地址',
      dataIndex: 'brandName',
      valueType: 'text',
    },
    {
      title: '启用状态',
      dataIndex: 'brandName',
      valueType: 'text',
    },
    {
      title: '操作',
      dataIndex: 'brandName',
      valueType: 'options',
      render: () => {
        <a>编辑</a>
      }
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
        rowKey="brandId"
        options={false}
        // request={api.brand}
        search={false}
        columns={columns}
        actionRef={actionRef}
      />
    </PageContainer>
  );
};

export default TableList;
