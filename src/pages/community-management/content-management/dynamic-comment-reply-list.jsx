import React, { useState,useRef} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { CommentReplyList } from '@/services/community-management/dynamic-comment-reply-list';
import { deleteCommentOrReply } from '@/services/community-management/delete-comment-reply';
import DeleteModal from '@/components/DeleteModal'
import { history } from 'umi';
import { Button } from 'antd';

export default props => {
    const ref=useRef()
    const id=props.location.query.id
    const columns = [
        {
            title: '评论ID：',
            dataIndex: 'id',
            hideInSearch: true,
        },
        {
            title: '会员ID：',
            dataIndex: 'userId',
            hideInSearch: true,
        },
        {
            title: '会员昵称',
            dataIndex: 'userName',
            valueType: 'text',
        },
        {
            title: '评论内容',
            dataIndex: 'content',
            valueType: 'text',
        },
        {
            title: '评论时间',
            dataIndex: 'createTime',
            valueType: 'text',
            hideInSearch:true
        },
        {
            title: '评论时间',
            key: 'dateRange',
            dataIndex: 'createTime',
            valueType: 'dateRange',
            hideInTable: true
        },
        {
            title: '操作',
            render: (text, record, _, action) => [
                <DeleteModal 
                    record={record} 
                    boxref={ref} 
                    text={'确认要删除所选评论吗？'} 
                    InterFace={deleteCommentOrReply} 
                    title={'操作确认'}
                />
            ],
            hideInSearch: true,
        },
    ];
  return (
    <PageContainer>
        <ProTable
        rowKey="id"
        options={false}
        params={{
            dynamicId:id
        }}
        request={CommentReplyList}
        search={{
            defaultCollapsed: false,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
                ...dom.reverse(),
            ],
        }}
        columns={columns}
        />
        <Button
            key="primary"
            type="primary"
            style={{margin:'20px'}}
            onClick={() => {
                history.push('/community-management/content-management')
            }}
            >
            返回
        </Button>,
  </PageContainer>
  );
};
