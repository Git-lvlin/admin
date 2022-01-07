import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select} from 'antd';
import ProTable from '@ant-design/pro-table';
import { getBuildhouseIncomeList } from '@/services/activity-management/spring-festival-build-building-activity';
import { PageContainer } from '@ant-design/pro-layout';
import { history,connect } from 'umi';



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
        title: '提现单号',
        dataIndex: 'id',
        valueType: 'text',
      },
      {
        title: '提现用户名',
        dataIndex: 'name',
        valueType: 'text',
      },
      {
        title: '提现银行机构',
        dataIndex: 'name',
        valueType: 'text',
      },
      {
        title: '账户号码',
        dataIndex: 'name',
        valueType: 'text',
      },
      {
        title: '提现金额',
        dataIndex: 'name',
        valueType: 'text',
      },
      {
        title: '提现申请时间',
        key: 'dateTimeRange',
        dataIndex: 'usefulTime',
        valueType: 'dateTimeRange',
        hideInTable: true,
      },
      {
        title: '提现申请时间',
        dataIndex: 'activityStartTime',
        valueType: 'text',
        hideInSearch:true,
        render:(_,data)=>{
          return <p>{data.activityStartTime} 至 {data.activityEndTime}</p>
        }
      },
      {
        title: '提现手续费',
        dataIndex: 'name',
        valueType: 'text',
      },
      {
        title: '提现状态',
        dataIndex: 'type',
        valueType: 'text',
        valueEnum: {
          1:'连续签到',
          2:'邀请好友', 
          3:'订单消费'
        },
      },
      {
        title: '失败原因',
        dataIndex: 'name',
        valueType: 'text',
      },
      {
        title: '提现到账结果时间',
        key: 'dateTimeRange',
        dataIndex: 'usefulTime',
        valueType: 'dateTimeRange',
        hideInTable: true,
      },
      {
        title: '提现到账结果时间',
        dataIndex: 'usefulTime',
        valueType: 'text',
        hideInSearch:true   
      }
    ];
    return (
      <PageContainer>
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