import React, { useState, useRef,useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { adminList } from '@/services/community-management/dynamic-admin-list';
import { banDynamicComment } from '@/services/community-management/dynamic-ban-dynamic-comment';
import { banShare } from '@/services/community-management/dynamic-ban-share';
import { dynamicDelete } from '@/services/community-management/dynamic-delete';
import { cancelDelete } from '@/services/community-management/dynamic-cancel-delete';
import { circleTop } from '@/services/community-management/circle-top';
import { cancelBanDynamicComment } from '@/services/community-management/dynamic-cancel-ban-dynamic-comment';
import { cancelBanShare } from '@/services/community-management/dynamic-cancel-ban-share';
import ProForm, { ModalForm,ProFormSwitch} from '@ant-design/pro-form';
import { Button } from 'antd';

export default props => {
    const ref=useRef()
    const [visible, setVisible] = useState(false);
    let id = props.location.query.id
    const onTop=(bol,off)=>{
        if(bol){
            circleTop({id:off}).then(res=>{
                ref.current.reload()
            }) 
        }
    }
    const Termination=()=>{
        setVisible(true)
    }
    const columns = [
        {
            title: '帖子ID：',
            dataIndex: 'dynamicId',
            hideInTable: true,
        },
        {
            title: '帖子ID：',
            dataIndex: 'id',
            hideInSearch:true
        },
        // {
        //     title: '帖子类型',
        //     dataIndex: 'sourceType',
        //     valueType: 'select',
        //     valueEnum: {
        //         1: '图文',
        //         2: '视频',
        //       }
        // },
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
            title: '置顶',
            dataIndex: 'topNum',
            valueType: 'text',
            render:(text, record, _, action)=>[
                <ProFormSwitch fieldProps={{onChange:(bol)=>{onTop(bol,record.id)}}}/>
            ],
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
                    trigger={<Button onClick={Termination}>{record.delete?'已删除':'删除'}</Button>}
                    submitter={{
                    render: (props, defaultDoms) => {
                        return [
                        ...defaultDoms
                        ];
                    },
                    }}
                    onFinish={async (values) => {
                        console.log('values',values);
                        dynamicDelete({id:record.id}).then(res=>{
                            if(res.code==0){
                                setVisible(false)   
                                ref.current.reload()
                                return true;
                            }
                        })
                    }}
                >
                <p>确认要删除所选内容吗？</p>
            </ModalForm>,
            <Button onClick={()=>cancelDelete({id:record.id}).then(res=>{
                ref.current.reload();
            }) }>恢复</Button>,
            ],
            hideInSearch: true,
        },
    ];
  return (
    <PageContainer>
        <ProTable
            actionRef={ref}
            rowKey="id"
            options={false}
            params={{
                id
            }}
            request={adminList} 
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
