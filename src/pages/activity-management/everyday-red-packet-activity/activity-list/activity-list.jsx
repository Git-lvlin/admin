import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select} from 'antd';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { getActiveConfigList } from '@/services/blind-box-activity-management/blindbox-get-active-config-list';
import ProForm,{ ModalForm,ProFormRadio,ProFormSwitch} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import { history,connect } from 'umi';



export default () => {
    const ref=useRef()
    const columns= [
      {
        title: '活动名称',
        dataIndex: 'name',
        valueType: 'text',
        hideInSearch:true
      },
      {
        title: '活动时间',
        dataIndex: 'startTime',
        valueType: 'text',
      },
      {
        title: '第一天首单红包',
        dataIndex: 'maxPrizeNum',
        valueType: 'text',
      },
      {
        title: '第二天首单红包',
        dataIndex: 'content',
        valueType: 'text',
      },
      {
        title: '第三天首单红包',
        dataIndex: 'createTime',
        valueType: 'text',
      },
      {
        title: '活动状态',
        dataIndex: 'statusDisplay',
        valueType: 'text',
      },
      {
        title: '操作',
        key: 'option',
        valueType: 'option',
        render:(text, record, _, action)=>[
            <a onClick={()=>history.push('/activity-management/everyday-red-packet-activity/activity-list/everyday-packet-rule?id='+record.id)}>查看详情</a>
        ],
      }, 
    ];
    return (
      <PageContainer>
        <ProTable
          actionRef={ref}
          rowKey="id"
          headerTitle="活动列表"
          options={false}
        //   request={getActiveConfigList}
          toolBarRender={()=>[
            <Button icon={<PlusOutlined />}  onClick={()=>history.push('/activity-management/everyday-red-packet-activity/activity-list/everyday-packet-rule')} type="primary">
                添加活动
            </Button>
        ]}
          search={false}
          columns={columns}
        />
        </PageContainer>
    );
  };