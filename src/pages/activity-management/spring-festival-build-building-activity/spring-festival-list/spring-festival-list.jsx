import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select} from 'antd';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { getActiveConfigList } from '@/services/activity-management/spring-festival-build-building-activity';
import ProForm,{ ModalForm,ProFormRadio,ProFormSwitch} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { history,connect } from 'umi';
import moment from 'moment'
import { amountTransform } from '@/utils/utils'



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
        title: '阶段一',
        dataIndex: 'tiersSet',
        valueType: 'text',
        render:(_,data)=>{
          return <>
                  <p>{data?.tiersSet[0]?.tierStart}-{data?.tiersSet[0]?.tierEnd}层</p>
                  <p>普惠奖概率{data?.tiersSet[0]?.general?.probability}% 幸运奖概率{data?.tiersSet[0]?.lucky?.probability}%</p>
                  <p>普惠奖奖励金：{data?.tiersSet[0]?.general?.moneyRange.map(ele=>amountTransform(ele, '/')).toString()}</p>
                  <p>幸运奖奖励金：{data?.tiersSet[0]?.lucky?.moneyRange.map(ele=>amountTransform(ele, '/')).toString()}</p>
                 </>
        },
        align: 'center'
      },
      {
        title: '阶段二',
        dataIndex: 'tiersSet',
        valueType: 'text',
        render:(_,data)=>{
          return <>
                  <p>{data?.tiersSet[1]?.tierStart}-{data?.tiersSet[1]?.tierEnd}层</p>
                  <p>普惠奖概率{data?.tiersSet[1]?.general?.probability}% 幸运奖概率{data?.tiersSet[1]?.lucky?.probability}%</p>
                  <p>普惠奖奖励金：{data?.tiersSet[1]?.general?.moneyRange.map(ele=>amountTransform(ele, '/')).toString()}</p>
                  <p>幸运奖奖励金：{data?.tiersSet[1]?.lucky?.moneyRange.map(ele=>amountTransform(ele, '/')).toString()}</p>
                </>
        },
        align: 'center'
      },
      {
        title: '阶段三',
        dataIndex: 'tiersSet',
        valueType: 'text',
        render:(_,data)=>{
          return <>
                  <p>{data?.tiersSet[2]?.tierStart}-{data?.tiersSet[2]?.tierEnd}层</p>
                  <p>普惠奖概率{data?.tiersSet[2]?.general?.probability}% 幸运奖概率{data?.tiersSet[2]?.lucky?.probability}%</p>
                  <p>普惠奖奖励金：{data?.tiersSet[2]?.general?.moneyRange.map(ele=>amountTransform(ele, '/')).toString()}</p>
                  <p>幸运奖奖励金：{data?.tiersSet[2]?.lucky?.moneyRange.map(ele=>amountTransform(ele, '/')).toString()}</p>
                </>
        },
        align: 'center'
      },
      {
        title: '阶段四',
        dataIndex: 'tiersSet',
        valueType: 'text',
        render:(_,data)=>{
          return <>
                  <p>{data?.tiersSet[3]?.tierStart}-{data?.tiersSet[3]?.tierEnd}层</p>
                  <p>普惠奖概率{data?.tiersSet[3]?.general?.probability}% 幸运奖概率{data?.tiersSet[3]?.lucky?.probability}%</p>
                  <p>普惠奖奖励金：{data?.tiersSet[3]?.general?.moneyRange.map(ele=>amountTransform(ele, '/')).toString()}</p>
                  <p>幸运奖奖励金：{data?.tiersSet[3]?.lucky?.moneyRange.map(ele=>amountTransform(ele, '/')).toString()}</p>
                </>
        },
        align: 'center'
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
    const postData=(data)=>{
      const arr=data.map(item=>({
        tiersSet:item?.content?.rewardsSet?.tiersSet,
        ...item
      }))
      return arr
    }
    return (
      <PageContainer>
        <ProTable
          actionRef={ref}
          rowKey="id"
          headerTitle="活动列表"
          options={false}
          postData={postData}
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