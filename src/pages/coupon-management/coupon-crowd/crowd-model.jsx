import React, { useState,useRef } from 'react';
import { ModalForm,ProFormCheckbox,} from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import { userLevelList } from '@/services/crowd-management/coupon-crowd';
import { Button,message } from 'antd';

export default props=>{
    const {record,title,boxref,Callback,visible, setVisible}=props
    const ref=useRef()
    const columns= [
        {
          title: '头像',
          dataIndex: 'name',
          valueType: 'text',
          hideInSearch: true,
        },
        {
          title: '手机号',
          dataIndex: 'status',
          fieldProps:{
            placeholder:"用户手机号"
          }
        },
        {
          title: '操作',
          key: 'option',
          width: 120,
          valueType: 'option',
          render: (_, data) => [
           <a
              key="dele"
              onClick={()=>{
              }}
            >
              删除
          </a>,
          ],
        },
        
      ];
    return (
        <ModalForm
            title={title}
            onVisibleChange={setVisible}
            visible={visible}
            submitter={{
            render: (props, defaultDoms) => {
                return [
                ...defaultDoms
                ];
            },
            }}
            onFinish={async (values) => {
                setVisible(false)
                Callback(values)
                boxref&&boxref.current?.reload()
                return true;
            }}
        >
        <ProTable
            actionRef={ref}
            rowKey="id"
            options={false}
            //   request={couponCrowdList}
            search={{
            defaultCollapsed: false,
            labelWidth: 100,
            optionRender: ({searchText, resetText}, {form}) => [                                                   
                <Button
                key="search"
                type="primary"
                onClick={() => {
                form?.submit()
                }}
                >
                    {searchText}
                </Button>
            ],
            }}
            rowSelection={{
                preserveSelectedRowKeys: true,
                onChange: (_, val) => {
                    
                }
            }}
            columns={columns}
        />
        </ModalForm>
    )
}

