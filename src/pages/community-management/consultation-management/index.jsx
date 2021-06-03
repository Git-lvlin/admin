import React, { useState, useRef,useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { couponCcodebase } from '@/services/coupon-codebase/coupon-codebase';
import { history } from 'umi';
import { Button } from 'antd';

export default props => {
    const columns = [
        {
            title: '会员ID：',
            dataIndex: 'spuId',
        },
        {
            title: '会员类型',
            dataIndex: 'goodsImageUrl',
            valueType: 'select',
            valueEnum: {
                1: '消费者',
                2: '会员店',
            }
        },
        {
            title: '时间',
            key: 'dateRange',
            dataIndex: 'createdAtRange',
            valueType: 'dateRange',
        },
        {
            title: '用户名',
            dataIndex: 'goodsName',
            valueType: 'text',
        },
        {
            title: '会话',
            dataIndex: 'supplierName',
            valueType: 'text',
            hideInSearch: true,
        },
        {
            title: '发言',
            dataIndex: 'supplierName',
            valueType: 'text',
            hideInSearch: true,
        },
        {
            title: '开始时间',
            dataIndex: 'supplierName',
            valueType: 'text',
            hideInSearch: true,
        },
        {
            title: '截止时间',
            dataIndex: 'supplierName',
            valueType: 'text',
            hideInSearch: true, 
        },

        {
            title: '操作',
            render: (text, record, _, action) => [
                <Button>导出</Button>
            ],
            hideInSearch: true,
        },
    ];
  return (
    <PageContainer>
        <ProTable
        rowKey="ID"
        options={false}
        search={{
            defaultCollapsed: false,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
                ...dom.reverse(),
            ],
        }}
        columns={columns}
        rowSelection={{}}
        />
  </PageContainer>
  );
};
