import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { adminList } from '@/services/community-management/dynamic-admin-list';
import { banDynamicComment } from '@/services/community-management/dynamic-ban-dynamic-comment';
import { banShare } from '@/services/community-management/dynamic-ban-share';
import { dynamicDelete } from '@/services/community-management/dynamic-delete';
import { cancelDelete } from '@/services/community-management/dynamic-cancel-delete';
import { dynamicTop } from '@/services/community-management/dynamic-top';
import { cancelBanDynamicComment } from '@/services/community-management/dynamic-cancel-ban-dynamic-comment';
import { cancelBanShare } from '@/services/community-management/dynamic-cancel-ban-share';
import { ModalForm,ProFormSwitch} from '@ant-design/pro-form';
import DeleteModal from '@/components/DeleteModal'
import { Button } from 'antd';

export default props => {
    const ref=useRef()
    const [visible, setVisible] = useState(false);
    const [byid,setByid]=useState()
    let id = props.location.query.id
    const onTop=(bol,off)=>{
        dynamicTop({id:off}).then(res=>{
                ref.current.reload()
            }) 
    }
    const Termination=(record)=>{
        setByid(record.id)
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
                <DeleteModal 
                    record={record} 
                    boxref={ref} 
                    text={'确认要删除所选内容吗？'} 
                    InterFace={dynamicDelete} 
                    title={'操作确认'}
                />,
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
