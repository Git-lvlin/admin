import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import * as api from '@/services/product-management/brand-list';
import Form from './form';

const TableList = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const actionRef = useRef();

  const brandDel = (brandId) => {
    api.brandDel({
      brandId
    }, { showSuccess: true }).then(res => {
      if (res.code === 0) {
        actionRef.current.reload();
      }
    })
  }

  const columns = [
    {
      title: '品牌名称',
      dataIndex: 'brandName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入品牌名称'
      }
    },
    {
      title: '品牌logo',
      dataIndex: 'brandLogo',
      valueType: 'text',
      hideInSearch: true,
      render: (text) => <img width={50} height={50} src={text} />
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, data) => (
        <>
          <a onClick={() => { setSelectItem(data); setFormVisible(true) }}>编辑</a>
          &nbsp;
          <a onClick={() => { brandDel(data.brandId) }}>删除</a>
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
        rowKey="brandId"
        options={false}
        request={(params) => api.brand(params)}
        search={{
          defaultCollapsed: false,
          labelWidth: 100
        }}
        columns={columns}
        actionRef={actionRef}
      />
      <Form
        visible={formVisible}
        setVisible={setFormVisible}
        data={selectItem}
        callback={() => {
          setSelectItem(null)
          actionRef.current.reload();
        }}
        onCancel={() => { setSelectItem(null) }}
      />
    </PageContainer>

  );
};

export default TableList;
