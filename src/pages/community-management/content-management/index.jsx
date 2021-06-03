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
            title: '按操作状态：',
            dataIndex: 'spuId',
            valueType:'select',
            valueEnum: {
                1: '禁评',
                2: '禁转',
                3: '删除',
              }
        },
        {
            title: '帖子类型：',
            dataIndex: 'spuId',
            valueType:'select',
            valueEnum: {
                1: '图文',
                2: '视频',
              }
        },
        {
            title: '所属圈子：',
            dataIndex: 'spuId',
            valueType:'select',
            valueEnum: {
                1: '音乐圈圈',
                2: '宝安水果圈',
              }
        },
        {
            title: '按发布时间',
            key: 'dateRange',
            dataIndex: 'createdAtRange',
            valueType: 'dateRange',
        },
        {
            title: '会员ID',
            dataIndex: 'supplierName',
            valueType: 'text',
        },
        {
            title: '会员昵称',
            dataIndex: 'supplierName',
            valueType: 'text',
        },
        {
            title: '浏览',
            dataIndex: 'supplierName',
            valueType: 'text',
            hideInSearch: true,
        },
        {
            title: '点赞',
            dataIndex: 'supplierName',
            valueType: 'text',
            hideInSearch: true,
        },
        {
            title: '评论',
            dataIndex: 'supplierName',
            valueType: 'text',
            hideInSearch: true,
        },
        {
            title: '转发',
            dataIndex: 'supplierName',
            valueType: 'text',
            hideInSearch: true,
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
