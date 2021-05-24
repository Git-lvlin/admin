import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { memberShopUser } from '@/services/intensive-store-management/shop-user';
import { useParams } from 'umi';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import moment from 'moment';

const TableList = () => {

  const params = useParams();

  const columns = [
    {
      title: '昵称',
      dataIndex: 'nickName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入昵称'
      },
      render: (_, data) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ borderRadius: '50%', width: 50, height: 50, overflow: 'hidden', marginRight: 5 }}>
            <img src={data.icon} width="50" height="50" />
          </div>
          <span>{_}</span>
          <div style={{ marginLeft: 5 }}>{data.gender === 1 ? <ManOutlined /> : <WomanOutlined />}</div>
        </div>
      )
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入手机号'
      },
    },
    {
      title: '积分',
      dataIndex: 'integralValue',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '店主订单数',
      dataIndex: 'orderNum',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch: true,
      render: (_) => moment(_).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '状态',
      dataIndex: ['status', 'desc'],
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      hideInTable: true,
      valueEnum: {
        1: '启用',
        2: '禁用'
      }
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      hideInTable: true,
    },
    {
      title: '性别',
      dataIndex: 'status',
      valueType: 'select',
      hideInTable: true,
      valueEnum: {
        1: '男',
        0: '女'
      }
    },
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="storeNo"
        options={false}
        params={{
          storeNo: params.id
        }}
        request={memberShopUser}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
          ],
        }}
        columns={columns}
      />
    </PageContainer>

  );
};

export default TableList;
