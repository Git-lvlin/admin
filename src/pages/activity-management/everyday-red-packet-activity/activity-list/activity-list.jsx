import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select} from 'antd';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { couponEverydayList } from '@/services/activity-management/everyday-red-packet-activity';
import ProForm,{ ModalForm,ProFormRadio,ProFormSwitch} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { history,connect } from 'umi';



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
        dataIndex: 'activityStartTime',
        valueType: 'text',
        render:(_,data)=>{
          return <p>{data.activityStartTime} 至 {data.activityEndTime}</p>
        }
      },
      {
        title: '第一天首单红包',
        dataIndex: 'couponOneDisplay',
        valueType: 'text',
      },
      {
        title: '第二天首单红包',
        dataIndex: 'couponTwoDisplay',
        valueType: 'text',
      },
      {
        title: '第三天首单红包',
        dataIndex: 'couponThreeDisplay',
        valueType: 'text',
      },
      {
        title: '活动状态',
        dataIndex: 'activityStatus',
        valueType: 'select',
        valueEnum: {
          0: '全部',
          2: '进行中',
          3: '未开始',
          4: '已结束',
          5: '已删除',
        }
      },
      {
        title: '操作',
        key: 'option',
        valueType: 'option',
        render:(text, record, _, action)=>[
            <a key='detail' onClick={()=>history.push('/activity-management/everyday-red-packet-activity/everyday-packet-rule?id='+record.id)}>查看详情</a>
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
          request={couponEverydayList}
          toolBarRender={()=>[
            <Button key='add' icon={<PlusOutlined />}  onClick={()=>history.push('/activity-management/everyday-red-packet-activity/everyday-packet-rule')} type="primary">
                添加活动
            </Button>
        ]}
          search={false}
          columns={columns}
        />
        </PageContainer>
    );
  };