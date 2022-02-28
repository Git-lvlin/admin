import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select} from 'antd';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { getActiveConfigList } from '@/services/intensive-activity-management/special-offer-acticity';
import ProForm,{ ModalForm,ProFormRadio,ProFormSwitch} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { history,connect } from 'umi';
import moment from 'moment'



export default () => {
    const ref=useRef()
    const columns= [
      {
        title: '活动编号',
        dataIndex: 'id',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '活动名称',
        dataIndex: 'name',
        valueType: 'text',
      },
      {
        title: '活动时段',
        dataIndex: 'startTime',
        valueType: 'text',
        render:(_,data)=>{
          return <p>{moment(data.startTime*1000).format('YYYY-MM-DD HH:mm:ss')} 至 {moment(data.endTime*1000).format('YYYY-MM-DD HH:mm:ss')}</p>
        },
        hideInSearch: true,
      },
      {
        title: 'C端可购买数量（每人/每天）',
        dataIndex: 'buyerLimit',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: 'C端可购买时间（每天）',
        dataIndex: 'buyerStartTime',
        valueType: 'text',
        hideInSearch: true,
        render:(_,data)=>{
          return <p>{data.buyerStartTime} ~ {data.buyerEndTime}</p>
        },
      },
      {
        title: '参与活动的商品',
        dataIndex: 'goodsCount',
        valueType: 'text',
        render:(_,data)=>{
          return <a onClick={()=>{}}>{_}</a>
        },
        hideInSearch: true,
      },
      {
        title: '操作',
        key: 'option',
        valueType: 'option',
        render:(text, record, _, action)=>[
            <a key='detail' onClick={()=>history.push('/intensive-activity-management/penny-activity/added-activity?id='+record.id)}>详情</a>,
            <a key='detail' onClick={()=>history.push('/intensive-activity-management/penny-activity/added-activity?id='+record.id)}>编辑</a>,
            <a key='detail' onClick={()=>{}}>终止</a>
        ],
      }, 
    ];
    const postData=(data)=>{
      const arr=data.map(ele=>({
        buyerLimit:ele.content?.buyerLimit,
        goodsCount:ele.content?.goodsCount,
        buyerStartTime:ele.content?.buyerStartTime,
        buyerEndTime:ele.content?.buyerEndTime,
        ...ele
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
          params={{
            actCode:'wsCentActiveCode'
          }}
          request={getActiveConfigList}
          postData={postData}
          toolBarRender={()=>[
            <Button key='add' icon={<PlusOutlined />}  onClick={()=>history.push('/intensive-activity-management/special-offer-acticity/add-activity')} type="primary">
                新建
            </Button>
        ]}
        search={false}
          columns={columns}
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
          }}
        />
        </PageContainer>
    );
  };