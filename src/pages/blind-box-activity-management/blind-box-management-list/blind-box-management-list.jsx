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
        dataIndex: 'id',
        valueType: 'text',
        hideInSearch:true,
        render:(_,data)=>{
          return <p>{moment(data?.startTime*1000).format('YYYY-MM-DD HH:mm:ss')} 至 {moment(data?.endTime*1000).format('YYYY-MM-DD HH:mm:ss')}</p>
        }
      },
      {
        title: '每天最高中奖次数',
        dataIndex: 'maxPrizeNum',
        valueType: 'text',
        hideInSearch:true,
        render:(_,data)=>{
          return <p>{data?.content?.maxPrizeNum}</p>
        }
      },
      {
        title: '邀请好友',
        dataIndex: 'content',
        valueType: 'text',
        hideInSearch:true,
        render:(_,data)=>{
          return <p>
            每邀请{data?.content?.accessGain?.inviteFriends?.inviteNum}
            位新用户注册获得{data?.content?.accessGain?.inviteFriends?.prizeNum}次
            （概率{data?.content?.accessGain?.inviteFriends?.probability}%）
            </p>
        }
      },
      {
        title: '每日签到',
        key: 'dateRange',
        dataIndex: 'createTime',
        valueType: 'dateRange',
        hideInSearch:true,
        render:(_,data)=>{
          return <p>
            每连续签到{data?.content?.accessGain?.signIn?.signInNum}
            天获得{data?.content?.accessGain?.signIn?.prizeNum}次
            （概率{data?.content?.accessGain?.signIn?.probability}%）
            </p>
        }   
      },
      {
        title: '订单消费',
        key: 'dateRange',
        dataIndex: 'createTime',
        hideInSearch:true,
        render:(_,data)=>{
          return <p>
            每日首次消费{data?.content?.accessGain?.orderConsume?.consumeNum}
            笔获得{data?.content?.accessGain?.orderConsume?.prizeNum}次
            （概率{data?.content?.accessGain?.orderConsume?.probability}%）
            </p>
        }   
      },
      {
        title: '每天最高中奖次数',
        dataIndex: 'maxPrizeNum',
        valueType: 'text',
        hideInSearch:true,
        render:(_,data)=>{
          return <p>{data?.content?.maxPrizeNum}</p>
        }
      },
      {
        title: '活动状态',
        dataIndex: 'statusDisplay',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '操作',
        key: 'option',
        valueType: 'option',
        render:(text, record, _, action)=>[
            <a onClick={()=>history.push('/blind-box-activity-management/bind-box-rule-set?id='+record.id)}>查看详情</a>
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
          request={getActiveConfigList}
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