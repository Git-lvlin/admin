import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select} from 'antd';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import ProForm,{ ModalForm,ProFormRadio,ProFormSwitch} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
// import './style.less'
import { history,connect } from 'umi';
const { TabPane } = Tabs



export default () => {
    const ref=useRef()
    const columns= [
      {
        title: '活动名称',
        dataIndex: 'dynamicId',
        valueType: 'text',
        hideInSearch:true
      },
      {
        title: '活动时间',
        dataIndex: 'id',
        valueType: 'text',
        hideInSearch:true
      },
      {
        title: '每天最高中奖次数',
        dataIndex: 'userName',
        valueType: 'text',
        hideInSearch:true
      },
      {
        title: '邀请好友',
        dataIndex: 'content',
        valueType: 'text',
        hideInSearch:true,
      },
      {
        title: '每日签到',
        key: 'dateRange',
        dataIndex: 'createTime',
        valueType: 'dateRange',
        hideInSearch:true,   
      },
      {
        title: '订单消费',
        key: 'dateRange',
        dataIndex: 'createTime',
        hideInSearch:true
      },
      {
        title: '每天最高中奖次数',
        dataIndex: 'createTime',
        valueType: 'text',
        hideInSearch:true
      },
      {
        title: '活动状态',
        dataIndex: 'createTime',
        valueType: 'text',
        hideInSearch: true
      },
      {
        title: '操作',
        key: 'option',
        valueType: 'option',
        render:(text, record, _, action)=>[
            <a onClick={()=>history.push('/blind-box-activity-management/bind-box-rule-set-detail?id='+record.id)}>查看详情</a>,
            <a onClick={()=>{}}>删除</a>
        ],
      }, 
    ];
    return (
      <PageContainer>
        <ProTable
          actionRef={ref}
          rowKey="id"
          headerTitle="盲盒活动列表"
          options={false}
          params={{
          //   auditStatus:type,
          }}
          // request={adminList}
          toolBarRender={()=>[
            <Button icon={<PlusOutlined />}  onClick={()=>history.push('/blind-box-activity-management/bind-box-rule-set')} type="primary">
                添加活动
            </Button>
        ]}
          search={false}
          columns={columns}
        />
        </PageContainer>
    );
  };