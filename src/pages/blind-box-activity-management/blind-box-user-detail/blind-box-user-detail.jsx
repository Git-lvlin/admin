import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Space} from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { getBlindboxIncomeDetail,getBlindboxIncomeReclaim } from '@/services/blind-box-activity-management/blindbox-blindbox-get-lncome';
import AuditModel from './audit-model'
const { TabPane } = Tabs


export default(props) => {
  let id = props.location.query.id
  const ref=useRef()
  const [detailList,setDetailList]=useState()
  const columns= [
    {
      title: '序号',
      dataIndex:'id',
      valueType: 'borderIndex',
      hideInSearch: true,
      valueType: 'indexBorder'
    },
    {
      title: '发放原因',
      dataIndex: 'type',
      valueType: 'select',
      hideInSearch:true,
      valueEnum: {
        1:'连续签到',
        2:'邀请好友', 
        3:'订单消费'
      },
    },
    {
      title: '筛选',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: {
        0: '全部',
        1: '连续签到获得',
        2: '邀请好友获得',
        3: '订单消费获得'
      },
      hideInTable:true
    },
    {
      title: '发放时间',
      key: 'dateTimeRange',
      dataIndex: 'usefulTime',
      valueType: 'dateTimeRange',
      hideInTable: true,
    },
    {
      title: '发放时间',
      dataIndex: 'usefulTime',
      valueType: 'text',
      hideInSearch:true   
    },
    {
      title: '过期时间',
      dataIndex: 'outUsefulTime',
      hideInSearch:true
    },
    {
      title: '发放次数',
      dataIndex: 'num',
      valueType: 'text',
      hideInSearch:true
    },
    {
      title: '机会编号',
      dataIndex: 'code',
      valueType: 'text',
    },
    {
      title: '操作',
      dataIndex: 'status',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data)=>{
        if(data.status==1){
          return  <AuditModel
                    label={'回收'}
                    InterFace={getBlindboxIncomeReclaim}
                    id={data.id}
                    title={'填写回收原因'}
                    boxref={ref}
                  />
        }else if(data.status==2){
          return <p>已使用</p>
        }else if(data.status==3){
          return <p>已回收</p>
        }else if(data.status==4){
          return <p>已过期</p>
        }
        },
    },
  ];
  const postData=(data)=>{
    console.log('data',data)
    setDetailList(data)
    return data.records
  }
  return (
    <PageContainer>
      <ProTable
        actionRef={ref}
        rowKey="id"
        options={false}
        headerTitle={`用户手机号:${detailList?.memberMobile}         用户名：${detailList?.memberNicheng}         剩余开盒次数：${detailList?.restNum}        已使用次数：${detailList?.useNum}`}
        params={{
          id:id
        }}
        postData={postData}
        request={getBlindboxIncomeDetail}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
             ...dom.reverse(),
          ],
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

