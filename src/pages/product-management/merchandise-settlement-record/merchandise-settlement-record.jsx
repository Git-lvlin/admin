import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@/components/PageContainer';
import { Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { postageList, postageDetail } from '@/services/product-management/freight-template';

export default () => {
  const actionRef = useRef();
  const columns = [
    {
      title: '序号',
      dataIndex:'id',
      valueType: 'borderIndex',
      hideInSearch: true,
      valueType: 'indexBorder'
    },
    {
      title: '操作类型',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      hideInSearch: true,
    },
     {
      title: '操作时间',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: 'skuID',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      hideInTable: true,
      fieldProps: {
        placeholder: '请输入spuID或商品名称',
      },
    },
    {
      title: 'skuID',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '售价',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '商品名称',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '供应商-货款',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '省办事处',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: 'VIP店主-直推',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: 'VIP店主-间推',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '普通店主-直推',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '普通店主-间推',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '用户-直推',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      hideInSearch: true,
    },

    {
      title: '用户-间推',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '运营中心',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '省代',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '市代',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '全国分红奖',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '汇能科技',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '操作人',
      dataIndex: 'name',
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        bordered
        options={false}
        request={postageList}
        columns={columns}
        actionRef={actionRef}
        pagination={{
            pageSize:10
        }}
      />
    </PageContainer>
  );
};
