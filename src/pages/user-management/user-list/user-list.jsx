import React, { useState } from 'react';
import { Button, Card } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import UserDetail from './user-detail';
import DisableModal from './disable-modal';
import { userList } from '@/services/user-management/user-list';

const sourceType = {
  1: {
    text: 'vivo',
  },
  2: {
    text: '小米',
  },
  3: { text: '应用宝' },
  4: { text: '小程序' },
  5: { text: '移动端浏览器' },
  6: { text: '官方渠道' },
  7: { text: '魅族' },
  8: { text: '360' },
  9: { text: '百度' },
  10: { text: 'appStore' },
  11: { text: 'WEB' },
}



const TableList = () => {
  const columns = [
    {
      title: '昵称',
      dataIndex: 'nickName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入昵称'
      }
    },
    {
      title: '头像',
      dataIndex: 'icon',
      valueType: 'text',
      hideInSearch: true,
      render: (text) => <img src={text} width="50" height="50" />
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueType: 'text',
      hideInSearch: true,
      render: (text) => text === 1 ? '男' : '女'
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入手机号'
      }
    },
    // {
    //   title: '等级',
    //   dataIndex: 'name',
    //   onFilter: true,
    //   valueType: 'select',
    //   valueEnum: {
    //     1: {
    //       text: '全部',
    //     },
    //     2: {
    //       text: '注册会员',
    //     },
    //     3: {
    //       text: '金卡',
    //     },
    //     4: {
    //       text: '银卡',
    //     },
    //     5: {
    //       text: '铜卡',
    //     },
    //   },
    // },
    // {
    //   title: '积分',
    //   dataIndex: 'name',
    //   valueType: 'text',
    //   hideInSearch: true,
    // },
    // {
    //   title: '约卡余额',
    //   dataIndex: 'name',
    //   valueType: 'text',
    //   hideInSearch: true,
    // },
    // {
    //   title: '所属会员店',
    //   dataIndex: 'name',
    //   onFilter: true,
    //   valueType: 'select',
    //   hideInTable: true,
    //   valueEnum: {
    //     1: {
    //       text: '全部',
    //     },
    //   },
    // },
    // {
    //   title: '会员店主',
    //   dataIndex: 'name',
    //   onFilter: true,
    //   valueType: 'select',
    //   hideInTable: true,
    //   valueEnum: {
    //     1: {
    //       text: '全部',
    //     },
    //   },
    // },
    {
      title: '注册来源',
      dataIndex: 'sourceType',
      onFilter: true,
      valueType: 'select',
      valueEnum: sourceType,
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      hideInTable: true,
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch: true,
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '上次访问时间',
      dataIndex: 'name',
      valueType: 'dateRange',
      hideInTable: true,
    },
    {
      title: '上次访问时间',
      dataIndex: 'loginTime',
      valueType: 'text',
      hideInSearch: true,
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss')

    },
    {
      title: '用户性别',
      dataIndex: 'name',
      onFilter: true,
      valueType: 'select',
      hideInTable: true,
      valueEnum: {
        1: {
          text: '全部',
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
        request={userList}
        search={{
          labelWidth: 120,
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
      {/* <UserDetail /> */}
      {/* <DisableModal visible /> */}
    </PageContainer>

  );
};

export default TableList;
