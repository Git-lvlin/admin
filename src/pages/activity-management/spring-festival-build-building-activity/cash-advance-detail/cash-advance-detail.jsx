import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select} from 'antd';
import ProTable from '@ant-design/pro-table';
import { withdrawPage } from '@/services/activity-management/spring-festival-build-building-activity';
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
        dataIndex: 'sn',
        valueType: 'text',
      },
      {
        title: '提现用户名',
        dataIndex: 'realName',
        valueType: 'text',
      },
      {
        title: '提现银行机构',
        dataIndex: 'paymentMethod',
        valueType: 'text',
      },
      {
        title: '账户号码',
        dataIndex: 'withdrawAccount',
        valueType: 'text',
      },
      {
        title: '提现金额',
        dataIndex: 'amount',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '提现申请时间',
        key: 'dateTimeRange',
        dataIndex: 'createTime',
        valueType: 'dateTimeRange',
        hideInTable: true,
      },
      {
        title: '提现申请时间',
        dataIndex: 'createTime',
        valueType: 'text',
        hideInSearch:true,
      },
      {
        title: '提现手续费',
        dataIndex: 'fee',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '提现状态',
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: {
          'auditing':'待审核',
          'waitPay':'待执行',
          'paid':'已执行',
          'arrived':'已到帐',
          'unPass':'审核拒绝', 
          'failure':'提现失败'
        },
      },
      {
        title: '失败原因',
        dataIndex: 'reason',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '提现到账结果时间',
        key: 'dateTimeRange2',
        dataIndex: 'notifyTime',
        valueType: 'dateTimeRange',
        hideInTable: true,
      },
      {
        title: '提现到账结果时间',
        dataIndex: 'notifyTime',
        valueType: 'text',
        hideInSearch:true   
      }
    ];
    return (
      <PageContainer>
        <ProTable
          actionRef={ref}
          rowKey="id"
          options={false}
          request={withdrawPage}
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