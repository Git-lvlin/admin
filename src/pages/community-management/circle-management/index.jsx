import React, { useState, useRef,useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { adminCircleList } from '@/services/community-management/circle-admincirclelist';
import { circleHide } from '@/services/community-management/circle-hide';
import { cancelHide } from '@/services/community-management/circle-cancelhide';
import { circleBanDynamic } from '@/services/community-management/circle-bandynamic';
import { cancelBanDynamic } from '@/services/community-management/circle-cancelbandynamic';
import { banDynamicComment } from '@/services/community-management/circle-bandynamiccomment';
import { cancelBanDynamicComment } from '@/services/community-management/circle-cancelbandynamiccomment';
import { circleTop } from '@/services/community-management/circle-top';
import { sortOrderMove } from '@/services/community-management/circle-sortodermove';
import ProForm, { ProFormSwitch} from '@ant-design/pro-form';
import { history } from 'umi';
import { Button } from 'antd';

export default props => {
    const ref=useRef()
    const onTop=(bol,off)=>{
        if(bol){
          circleTop({id:off}).then(res=>{
            ref.current.reload();
          })
        }
        console.log('bol',bol)
        console.log('off',off)
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            hideInSearch:true
        },
        {
            title: '圈子名称',
            dataIndex: 'name',
            valueType: 'text',
            render:(text, record, _, action)=>[
                <a onClick={()=>history.push('/community-management/circleInterior-management?id='+record.id)}>{record.name}</a>
            ],
            hideInSearch:true
        },
        {
            title: '内容',
            dataIndex: 'postNum',
            valueType: 'text',
            hideInSearch:true
        },
        {
            title: '浏览（万）',
            dataIndex: 'hitsNum',
            valueType: 'text',
            hideInSearch:true
        },
        {
            title: '置顶',
            dataIndex: 'hot',
            render:(text, record, _, action)=>[
                <ProFormSwitch  fieldProps={{onChange:(bol)=>{onTop(bol,record.id)}}}/>
            ],
            hideInSearch:true
        },
        {
            title: '排序',
            dataIndex: 'order',
            valueType: 'text',
            render:(text, record, _, action)=>[
                <a onClick={()=>sortOrderMove({id:record.id,type:'up'}).then(res=>{ref.current.reload()})}>上移</a>,
                <a onClick={()=>sortOrderMove({id:record.id,type:'down'}).then(res=>{ref.current.reload()})}>下移</a>
            ],
            hideInSearch:true
        },
        {
            title: '操作',
            render: (text, record, _, action) => [
                <Button onClick={()=>{
                    if(record.delete==2){
                        cancelHide({id:record.id}).then(res=>{
                            ref.current.reload();
                        }) 
                    }else if(record.delete==0){
                        circleHide({id:record.id}).then(res=>{
                            ref.current.reload();
                        })
                    }
                }}>{
                    record.delete?record.delete==1?'已删除':'取消隐藏':'隐藏'
                    }
                </Button>,
                <Button onClick={()=>{
                    if(record.banDynamic){
                        cancelBanDynamic({id:record.id}).then(res=>{
                            ref.current.reload();
                        }) 
                    }else{
                        circleBanDynamic({id:record.id}).then(res=>{
                            ref.current.reload();
                        })
                    }
                }}>{record.banDynamic?'取消禁贴':'禁贴'}</Button>,
                <Button onClick={()=>{
                    if(record.banComment){
                        cancelBanDynamicComment({id:record.id}).then(res=>{
                            ref.current.reload();
                        }) 
                    }else{
                        banDynamicComment({id:record.id}).then(res=>{
                            ref.current.reload();
                        })
                    }
                }}>{record.banComment?'取消禁评':'禁评'}</Button>,
                <Button onClick={()=>history.push('/community-management/circle-management/add-circle?id='+record.id)}>编辑</Button>,

            ],
            hideInSearch: true,
        },
    ];
  return (
    <PageContainer>
        <ProTable
            actionRef={ref}
            rowKey="id"
            toolBarRender={false}
            search={{
                defaultCollapsed: false,
                labelWidth: 100,
                optionRender: (searchConfig, formProps, dom) => [
                    <Button
                        key="primary"
                        type="primary"
                        onClick={() => {
                            history.push('/community-management/circle-management/add-circle')
                        }}
                        >
                        新建圈子
                    </Button>,
                ],
            }}
            request={adminCircleList}
            columns={columns}
        />
    </PageContainer>
  );
};
