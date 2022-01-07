import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select} from 'antd';
import ProTable from '@ant-design/pro-table';
import { getBuildhouseIncomeList } from '@/services/activity-management/spring-festival-build-building-activity';
import { PageContainer } from '@ant-design/pro-layout';



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
        title: '用户名',
        dataIndex: 'memberNicheng',
        valueType: 'text',
      },
      {
        title: '用户手机号',
        dataIndex: 'memberMobile',
        valueType: 'text',
      },
      {
        title: '绑定支付宝账号',
        dataIndex: 'memberMobile',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '可修改绑定次数',
        dataIndex: 'num',
        valueType: 'text',
        hideInSearch:true
      },
      {
        title: '操作',
        key: 'option',
        valueType: 'option',
        render:(text, record, _, action)=>[
            <a key='detail' onClick={()=>{}}>编辑</a>,
            <a onClick={()=>{}}>绑定记录</a>
        ],
      }, 
    ];
    return (
      <PageContainer title="机会发放明细">
        <ProTable
          actionRef={ref}
          rowKey="id"
          headerTitle="共搜索到 922 条数据"
          options={false}
          request={getBuildhouseIncomeList}
          search={{
            defaultCollapsed: false,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
               ...dom.reverse()
            ],
          }}
          columns={columns}
        />
        </PageContainer>
    );
  };