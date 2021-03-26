import React, { useState } from 'react';
import { Button, Card, Table } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
// import { PlusOutlined } from '@ant-design/icons';
import Form from './form';

const testData = [
  {
    name: '首页',
    href: '/index',
    code: '001',
    type: 'page'
  },
  {
    name: '设置',
    href: '/setting',
    code: '002',
    type: 'menu',
    childData: [
      {
        name: '子账号管理',
        href: '/setting/account-management',
        code: '002-001',
        type: 'page',
        childData: [
          {
            name: '新建',
            href: '/api/new',
            code: '002-001-001',
            type: 'button',
          }
        ]
      }
    ]
  }
]

const TableList = () => {
  const [formVisible, setFormVisible] = useState(false);

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      width: 200,
      render: text => <span style={{ whiteSpace: 'noWrap' }}>{text}</span>,
    },
    {
      title: '路径',
      dataIndex: 'href',
      render: text => <span style={{ whiteSpace: 'noWrap' }}>{text}</span>,
    },
    {
      title: '权限编码',
      dataIndex: 'code',
    },
    {
      title: '类型',
      dataIndex: 'type',
      render(item) {
        switch (item) {
          case 'menu':
            return '菜单';
          case 'page':
            return '页面';
          case 'button':
            return '按钮';
          default:
            return '菜单';
        }
      },
    },
    {
      title: '操作',
      render: (text, record) => {
        return (
          <>
            <a>
              编辑
            </a>
            &nbsp;&nbsp;
            <a>删除</a>
          </>
        );
      },
    },
  ];

  const handleFormateData = data => {
    return data.map(item => {
      return Array.isArray(item.childData)
        ? {
          ...item,
          children: handleFormateData(item.childData),
        }
        : item;
    });
  };

  const dataSource = handleFormateData(testData);

  return (
    <PageContainer>
      <Card>
        <Button
          type="primary"
          onClick={() => { setFormVisible(true) }}
          style={{ marginBottom: 20 }}
        >
          新建权限
        </Button>
        <Table
          dataSource={dataSource}
          rowKey="code"
          columns={columns}
          bordered={false}
          scroll={{ x: 'max-content' }}
          pagination={false}
        />
      </Card>
      <Form visible={formVisible} setVisible={setFormVisible} />
    </PageContainer>

  );
};

export default TableList;
