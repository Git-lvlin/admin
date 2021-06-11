import React, { useState} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { CommentReplyList } from '@/services/community-management/dynamic-comment-reply-list';
import { deleteCommentOrReply } from '@/services/community-management/delete-comment-reply';
import { ModalForm} from '@ant-design/pro-form';
import { history } from 'umi';
import { Button } from 'antd';

export default props => {
    const id=props.location.query.id
    console.log('id',id)
    const [visible, setVisible] = useState(false);
    const [byid,setByid]=useState()
    const Termination=(record)=>{
        setByid(record.id)
        setVisible(true)
    }
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
                <ModalForm
                    title="操作确认"
                    key="model2"
                    onVisibleChange={setVisible}
                    visible={visible}
                    trigger={<Button onClick={()=>Termination(record)}>删除</Button>}
                    submitter={{
                    render: (props, defaultDoms) => {
                        return [
                        ...defaultDoms
                        ];
                    },
                    }}
                    onFinish={async (values) => {
                        console.log('values',values);
                        deleteCommentOrReply({id:byid})
                        setVisible(false)
                        message.success('提交成功');
                        return true;
                    }}
                >
                <p>确认要删除所选评论吗？</p>
                </ModalForm>
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
