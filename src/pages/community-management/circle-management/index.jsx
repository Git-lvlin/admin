import React, { useState, useRef,useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { adminCircleList } from '@/services/community-management/circle-adminCircleList';
import { circleHide } from '@/services/community-management/circle-hide';
import { circleBanDynamic } from '@/services/community-management/circle-banDynamic';
import { banDynamicComment } from '@/services/community-management/circle-banDynamicComment';
import { circleTop } from '@/services/community-management/circle-top';
import { sortOrderMove } from '@/services/community-management/circle-sortOrderMove';
import ProForm, { ProFormSwitch} from '@ant-design/pro-form';
import { history } from 'umi';
import { Button } from 'antd';

export default props => {
    const onTop=(off)=>{
        circleTop({id:off})
        console.log('off',off)
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '圈子名称',
            dataIndex: 'name',
            valueType: 'text',
        },
        {
            title: '内容',
            dataIndex: 'postNum',
            valueType: 'text',
        },
        {
            title: '浏览（万）',
            dataIndex: 'hitsNum',
            valueType: 'text',
        },
        {
            title: '置顶',
            dataIndex: 'hot',
            render:(text, record, _, action)=>[
                <ProFormSwitch fieldProps={{onChange:()=>{onTop(record.id)}}}/>
            ]
        },
        {
            title: '排序',
            dataIndex: 'order',
            valueType: 'text',
            render:(text, record, _, action)=>[
                <a onClick={()=>sortOrderMove({id:record.id,type:'up'})}>上移</a>,
                <a onClick={()=>sortOrderMove({id:record.id,type:'down'})}>下移</a>
            ]
        },
        {
            title: '操作',
            render: (text, record, _, action) => [
                <Button onClick={()=>circleHide({id:record.id})}>隐藏</Button>,
                <Button onClick={()=>circleBanDynamic({id:record.id})}>禁贴</Button>,
                <Button onClick={()=>banDynamicComment({id:record.id})}>禁评</Button>,
                <Button onClick={()=>history.push('/community-management/circle-management/add-circle?id='+record.id)}>编辑</Button>,

            ],
            hideInSearch: true,
        },
    ];
  return (
    <PageContainer>
        <Button
              key="primary"
              type="primary"
              onClick={() => {
                history.push('/community-management/circle-management/add-circle')
              }}
            >
              新建圈子
        </Button>,
        <ProTable
            rowKey="id"
            toolBarRender={false}
            search={false}
            request={adminCircleList}
            columns={columns}
        />
    </PageContainer>
  );
};
