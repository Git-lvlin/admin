import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select} from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm,{ ModalForm,ProFormRadio,ProFormSwitch} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
// import './style.less'
const { TabPane } = Tabs



export default () => {
    const ref=useRef()
    const columns= [
      {
          title: '序号',
          dataIndex:'id',
          valueType: 'borderIndex',
          hideInSearch: true,
          valueType: 'indexBorder'
      },
      {
        title: '用户手机号',
        dataIndex: 'dynamicId',
        valueType: 'text',
        hideInTable:true
      },
      {
        title: '用户名',
        dataIndex: 'id',
        valueType: 'text',
      },
      {
        title: '修改版本',
        dataIndex: 'userName',
        valueType: 'text',
        hideInSearch:true
      },
      {
        title: '发放方式',
        dataIndex: 'content',
        valueType: 'text',
        hideInSearch:true,
        ellipsis:true
      },
      {
        title: '签到时间',
        key: 'dateRange',
        dataIndex: 'createTime',
        valueType: 'dateRange',   
      },
      {
        title: '领取金额',
        key: 'dateRange',
        dataIndex: 'createTime',
        hideInSearch:true
      },
      {
        title: '连签天数',
        dataIndex: 'createTime',
        valueType: 'text',
        hideInSearch:true
      },
      {
        title: '开启状态',
        dataIndex: 'createTime',
        valueType: 'text',
        hideInSearch: true
      },
      {
        title: '操作',
        key: 'option',
        valueType: 'option',
        render:(text, record, _, action)=>[
            <a onClick={()=>history.push('/sign-activity-management/user-detail?id='+record.id)}>查看此用户明细</a>
        ],
      }, 
    ];
    return (
      <PageContainer>
        <ProTable
          actionRef={ref}
          rowKey="id"
          headerTitle="签到红包发放明细"
          options={false}
          params={{
          //   auditStatus:type,
          }}
          // request={adminList}
          search={{
            defaultCollapsed: false,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
               ...dom.reverse(),
               <Button onClick={()=>{}} key="out">
                导出数据
               </Button>
            ],
          }}
          columns={columns}
        />
        </PageContainer>
    );
  };