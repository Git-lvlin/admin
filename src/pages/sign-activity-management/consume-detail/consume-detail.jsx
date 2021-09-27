import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select,Descriptions} from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm,{ ModalForm,ProFormRadio,ProFormSwitch} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
// import './style.less'
const { TabPane } = Tabs



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
        title: '用户手机号',
        dataIndex: 'dynamicId',
        valueType: 'text',
      },
      {
        title: '用户名',
        dataIndex: 'id',
        valueType: 'text',
        hideInSearch:true
      },
      {
        title: '使用时间',
        key: 'dateRange',
        dataIndex: 'createTime',
        valueType: 'dateRange',   
      },
      {
        title: '使用金额',
        dataIndex: 'userName',
        valueType: 'text',
        hideInSearch:true
      },
      {
        title: '订单',
        dataIndex: 'content',
        valueType: 'text',
        ellipsis:true
      },
      {
        title: '类型',
        key: 'dateRange',
        dataIndex: 'createTime',
        hideInSearch:true
      },
      {
        title: '操作',
        key: 'option',
        valueType: 'option',
        render:(text, record, _, action)=>[
            <a onClick={()=>history.push('/sign-activity-management/user-detail?id='+record.id)}>查看此用户明细</a>
        ],
      }, 
    ];
    return (
      <PageContainer>
         <div style={{backgroundColor:'#fff',marginBottom:'20px'}}>
         <Descriptions labelStyle={{fontWeight:'bold'}} column={7} layout="vertical" bordered>
            <Descriptions.Item  label="签到总人数">424</Descriptions.Item>
            <Descriptions.Item  label="已领取金额">456.56</Descriptions.Item>
            <Descriptions.Item  label="已使用金额">456.56</Descriptions.Item>
            <Descriptions.Item  label="已过期金额">456.56</Descriptions.Item>
            <Descriptions.Item  label="连签3日人数">7424</Descriptions.Item>
            <Descriptions.Item  label="连签7日人数">245</Descriptions.Item>
            <Descriptions.Item  label="连签15日人数">53</Descriptions.Item>
        </Descriptions>
         </div>
        <ProTable
          actionRef={ref}
          rowKey="id"
          headerTitle="签到红包消耗明细"
          options={false}
          params={{
          //   auditStatus:type,
          }}
          // request={adminList}
          search={{
            defaultCollapsed: false,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
               ...dom.reverse(),
               <Button onClick={()=>{}} key="out">
                导出数据
               </Button>
            ],
          }}
          columns={columns}
        />
        </PageContainer>
    );
  };