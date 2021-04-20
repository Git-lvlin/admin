import React, { useState, useEffect } from 'react';
import { Button, Card } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import * as api from '@/services/setting/role-management';
import Form from './form';
import { arrayToTree } from '@/utils/utils'


const TableList = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [treeData, setTreeData] = useState([])
  const [originTreeData, setOriginTreeData] = useState([])

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'title',
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

  useEffect(() => {
    api.adminRule()
      .then(res => {
        setOriginTreeData(res.data)
        setTreeData(arrayToTree(res.data.map(item=>{
          return {
            ...item,
            key: item.id,
          }
        })))
      })
  }, [])

  return (
    <PageContainer>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={newAccount} key="out" type="primary" icon={<PlusOutlined />}>新建</Button>
        </div>
      </Card>
      <ProTable
        rowKey="id"
        options={false}
        request={api.adminGroup}
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
      />
      <Form visible={formVisible} setVisible={setFormVisible} treeData={treeData} data={originTreeData} />
    </PageContainer>

  );
};

export default TableList;
