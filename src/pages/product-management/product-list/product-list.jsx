import React, { useState } from 'react';
import { Button, Card } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import Edit from './edit';

const TableList = () => {
  const [formVisible, setFormVisible] = useState(true);

  const columns = [
    {
      title: 'SPU',
      dataIndex: 'name',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品SPU'
      }
    },
    {
      title: 'SKU',
      dataIndex: 'name',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品SKU'
      }
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品名称'
      }
    },
    {
      title: '商家名称',
      dataIndex: 'name',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商家名称'
      }
    },
    {
      title: '供货类型',
      dataIndex: 'name',
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        1: {
          text: '全部',
        },
        2: {
          text: '批发+零售',
        },
        3: {
          text: '批发',
        },
      },
    },
    {
      title: '销售价',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '可用库存',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '活动库存',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '销量',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '审核状态',
      dataIndex: 'name',
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        1: {
          text: '全部',
        },
        2: {
          text: '待审核',
        },
        3: {
          text: '已通过',
        },
        4: {
          text: '驳回',
        },
      },
    },
    {
      title: '上架状态',
      dataIndex: 'name',
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        1: {
          text: '全部',
        },
        2: {
          text: '已上架',
        },
        3: {
          text: '已下架',
        },
      },
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

  return (
    <PageContainer>
      {/* <Card>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button key="out" type="primary" icon={<PlusOutlined />}>新建</Button>
        </div>
      </Card> */}
      <ProTable
        rowKey="id"
        options={false}
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
            <Button key="out">导出</Button>,
          ],
        }}
        columns={columns}
      />
      <Edit
        visible={formVisible}
        onClose={() => { setFormVisible(false)}}
      />
    </PageContainer>

  );
};

export default TableList;
