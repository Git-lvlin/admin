import React, { useState, useRef,useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { adminList } from '@/services/community-management/dynamic-admin-list';
import { banDynamicComment } from '@/services/community-management/dynamic-ban-dynamic-comment';
import { cancelBanDynamicComment } from '@/services/community-management/dynamic-cancel-ban-dynamic-comment';
import { banShare } from '@/services/community-management/dynamic-ban-share';
import { cancelBanShare } from '@/services/community-management/dynamic-cancel-ban-share';
import { dynamicDelete } from '@/services/community-management/dynamic-delete';
import { cancelDelete } from '@/services/community-management/dynamic-cancel-delete';
import CircleSelect from '@/components/circle-select'
import  ProForm,{ ModalForm,ProFormSelect} from '@ant-design/pro-form';
import { history } from 'umi';
import { Button } from 'antd';

export default props => {
    const ref=useRef()
    const [visible, setVisible] = useState(false);
    const [byid,setByid]=useState()
    const Termination=(record)=>{
        console.log
        setByid(record.id)
        setVisible(true)
    }
    const columns = [
        {
            title: '帖子ID',
            dataIndex: 'id',
            render:(text, record, _, action)=>[
                <a onClick={()=>history.push('/community-management/content-management/dynamic-get-dynamic-detail?id='+record.id)}>{record.id}</a>
            ],
            hideInSearch:true
        },
        {
            title: '帖子ID',
            dataIndex: 'dynamicId',
            hideInTable:true
        },
        {
            title: '发布时间',
            key: 'dateRange',
            dataIndex: 'createTime',
            valueType: 'dateRange',
            hideInTable: true,
        },
        {
            title: '发布时间',
            dataIndex: 'createTime',
            hideInSearch:true
        },
        {
            title: '按操作状态：',
            dataIndex: 'status',
            valueType:'select',
            valueEnum: {
                0: '全部',
                1: '禁评',
                2: '禁转',
                3: '删除',
            },
            hideInTable: true,
        },
        // {
        //     title: '帖子类型：',
        //     dataIndex: 'sourceType',
        //     valueType:'select',
        //     valueEnum: {
        //         1: '图文',
        //         2: '视频',
        //       }
        // },
        {
            title: '所属圈子：',
            dataIndex:'circleId',
            renderFormItem: () => (<CircleSelect/>),
            hideInTable:true
        },
        {
            title: '所属圈子',
            dataIndex: 'circleName',
            valueType:'text',
            hideInSearch:true
        },
       
        {
            title: '会员ID',
            dataIndex: 'userId',
            valueType: 'text',
        },
        {
            title: '会员昵称',
            dataIndex: 'userName',
            valueType: 'text',
        },
        {
            title: '浏览',
            dataIndex: 'hitsNum',
            valueType: 'text',
            hideInSearch: true,
        },
        {
            title: '点赞',
            dataIndex: 'hitsNum',
            valueType: 'text',
            hideInSearch: true,
            render:(text, record, _, action)=>[
                <a onClick={()=>history.push('/community-management/content-management/dynamic-list-likes?id='+record.id)}>{record.hitsNum}</a>
            ],
        },
        {
            title: '评论',
            dataIndex: 'commentNum',
            valueType: 'text',
            hideInSearch: true,
            render:(text, record, _, action)=>[
                <a onClick={()=>history.push('/community-management/content-management/dynamic-comment-reply-list?id='+record.id)}>{record.commentNum}</a>
            ],
        },
        {
            title: '转发',
            dataIndex: 'shareNum',
            valueType: 'text',
            hideInSearch: true,
        },
        {
            title: '操作',
            render: (text, record, _, action) => [
                <Button onClick={()=>{
                    if(record.banComment){
                        cancelBanDynamicComment({id:record.id}).then(res=>{
                            ref.current.reload()
                        })  
                    }else{
                        banDynamicComment({id:record.id}).then(res=>{
                            ref.current.reload()
                        }) 
                    }
                }}>{record.banComment?'取消禁评':'禁评'}</Button>,
                <Button onClick={()=>{
                    if(record.banShare){
                        cancelBanShare({id:record.id}).then(res=>{
                            ref.current.reload()
                        }) 
                    }else{
                        banShare({id:record.id}).then(res=>{
                            ref.current.reload()
                        }) 
                    }
                    
                }}>{record.banShare?'取消禁转':'禁转'}</Button>,
                <ModalForm
                    title="操作确认"
                    key="model2"
                    onVisibleChange={setVisible}
                    visible={visible}
                    trigger={<Button onClick={()=>Termination(record)}>{record.delete?'已删除':'删除'}</Button>}
                    submitter={{
                    render: (props, defaultDoms) => {
                        return [
                        ...defaultDoms
                        ];
                    },
                    }}
                    onFinish={async (values) => {
                        dynamicDelete({id:byid}).then(res=>{
                            if(res.code==0){
                                setVisible(false)
                                ref.current.reload()
                                return true;
                            }
                        })        
                    }}
                >
                <p>确认要删除所选帖子吗？</p>
                </ModalForm>,
                <Button onClick={()=>cancelDelete({id:record.id}).then(res=>{
                    ref.current.reload()
                }) }>恢复</Button>,
            ],
            hideInSearch: true,
        },
    ];
  return (
    <PageContainer>
        <ProTable
            rowKey="id"
            options={false}
            actionRef={ref}
            params={{
                pageSize:5
            }}
            request={adminList}
            search={{
                defaultCollapsed: false,
                labelWidth: 100,
                optionRender: (searchConfig, formProps, dom) => [
                    ...dom.reverse(),
                    <Button
                    key="primary"
                    type="primary"
                    onClick={() => {
                        history.push('/community-management/content-management/add-content')
                    }}
                    >
                    添加
                </Button>,
                ],
            }}
            columns={columns}
        />
  </PageContainer>
  );
};
