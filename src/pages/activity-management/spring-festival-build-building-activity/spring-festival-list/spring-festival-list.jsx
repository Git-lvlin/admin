import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select} from 'antd';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { getActiveConfigList } from '@/services/activity-management/spring-festival-build-building-activity';
import ProForm,{ ModalForm,ProFormRadio,ProFormSwitch} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { history,connect } from 'umi';
import moment from 'moment'



export default () => {
    const ref=useRef()
    const columns= [
      {
        title: '活动名称',
        dataIndex: 'name',
        valueType: 'text',
      },
      {
        title: '活动时间',
        dataIndex: 'startTime',
        valueType: 'text',
        render:(_,data)=>{
          return <p>{moment(data.startTime).format('YYYY-MM-DD HH:mm:ss')} 至 {moment(data.endTime).format('YYYY-MM-DD HH:mm:ss')}</p>
        }
      },
      {
        title: '1-9层',
        dataIndex: 'couponOneDisplay',
        valueType: 'text',
      },
      {
        title: '10-15层',
        dataIndex: 'couponTwoDisplay',
        valueType: 'text',
      },
      {
        title: '16-20层',
        dataIndex: 'couponThreeDisplay',
        valueType: 'text',
      },
      {
        title: '21-49层',
        dataIndex: 'couponThreeDisplay',
        valueType: 'text',
      },
      {
        title: '活动状态',
        dataIndex: 'statusDisplay',
        valueType: 'text'
      },
      {
        title: '操作',
        key: 'option',
        valueType: 'option',
        render:(text, record, _, action)=>[
            <a key='detail' onClick={()=>history.push('/activity-management/spring-festival-build-building-activity/rule-configuration?id='+record.id)}>查看详情</a>
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
          request={getActiveConfigList}
          toolBarRender={()=>[
            <Button key='add' icon={<PlusOutlined />}  onClick={()=>history.push('/activity-management/spring-festival-build-building-activity/rule-configuration')} type="primary">
                添加活动
            </Button>
        ]}
          search={false}
          columns={columns}
        />
        </PageContainer>
    );
  };