import React, { useState, useRef,useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { couponCcodebase } from '@/services/coupon-codebase/coupon-codebase';
import { history } from 'umi';
import { Button } from 'antd';

export default props => {
    const columns = [
        {
            title: '帖子ID：',
            dataIndex: 'spuId',
        },
        {
            title: '帖子类型',
            dataIndex: 'goodsImageUrl',
            valueType: 'select',
        },
        {
            title: '会员ID',
            dataIndex: 'goodsName',
            valueType: 'text',
        },
        {
            title: '会员昵称',
            dataIndex: 'supplierName',
            valueType: 'text',
        },
        {
            title: '置顶',
            dataIndex: 'gcId1Display',
            valueType: 'text',
        },
        {
            title: '操作',
            render: (text, record, _, action) => [
                <Button>禁评</Button>,
                <Button>禁转</Button>,
                <Button>删除</Button>,
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
        />
  </PageContainer>
  );
};
