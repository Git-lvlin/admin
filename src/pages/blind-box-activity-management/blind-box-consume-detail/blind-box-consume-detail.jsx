import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select,Descriptions,Space} from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm,{ ModalForm,ProFormRadio,ProFormSwitch} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
// import './style.less'
import { history, connect } from 'umi';
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
      },
      {
        title: '使用时间',
        key: 'dateRange',
        dataIndex: 'createTime',
        valueType: 'dateRange',   
      },
      {
        title: '筛选',
        dataIndex: 'createTime',
        valueType: 'select',
        valueEnum: {
          0: '全部',
          1: '已获奖',
          2: '获奖已兑换',
          3: '获奖未兑换',
          4: '未获奖',
          5: '机会过期',
          6: '官方回收'
        },
        hideInTable:true
      },
      {
        title: '使用次数',
        dataIndex: 'userName',
        valueType: 'text',
        hideInSearch:true
      },
      {
        title: '使用类型',
        dataIndex: 'userName',
        valueType: 'text',
        hideInSearch:true
      },
      {
        title: '机会编号',
        dataIndex: 'content',
        valueType: 'text',
        ellipsis:true
      },
      {
        title: '获得奖品',
        dataIndex: 'createTime',
        valueType: 'text',
        hideInSearch: true,
        render: (_, data)=>{
          return <div style={{display:'flex',alignItems:'center',justifyContent:'space-around'}}>
                    <Image src={{}} alt="" width='50px' height='50px' />
                    <div>
                      <h4>苹果手机128G</h4>
                      <span style={{color:'red',fontSize:'10px'}}>销售价¥5600.00</span>
                      <p>SKU 5656223</p>
                    </div>
                 </div>
        },
      },
      {
        title: '兑换详情',
        dataIndex: 'createTime',
        valueType: 'text',
        hideInSearch: true,
        render: (_, data)=>{
          return <>
            <p>已兑换</p>
            <p>订单号：</p>
            <a href="">202125686565565</a>
            <p>过期时间：2022/09/18 16:13</p>
          </>
        } 
      },
      {
        title: '操作',
        key: 'option',
        valueType: 'option',
        render:(text, record, _, action)=>[
          <a onClick={()=>history.push('/blind-box-activity-management/blind-box-user-detail?id='+record.id)}>查看此用户明细</a>
        ],
      }, 
    ];
    const defaultData= [
      {
        id: '624748504',
        title: '当天红包金额',
        decs: '这个活动真好玩',
      },
      {
        id: '624691229',
        title: '连续签到额外奖励金额',
      },
    ]
    return (
      <PageContainer>
         <div style={{backgroundColor:'#fff',marginBottom:'20px'}}>
         <Descriptions labelStyle={{fontWeight:'bold'}} column={7} layout="vertical" bordered>
            <Descriptions.Item  label="参与总人数">424</Descriptions.Item>
            <Descriptions.Item  label="已发放次数">456.56</Descriptions.Item>
            <Descriptions.Item  label="未使用次数">456.56</Descriptions.Item>
            <Descriptions.Item  label="已使用次数">456.56</Descriptions.Item>
            <Descriptions.Item  label="已过期">7424</Descriptions.Item>
            <Descriptions.Item  label="已兑奖数">245</Descriptions.Item>
            <Descriptions.Item  label="未兑奖数">53</Descriptions.Item>
        </Descriptions>
         </div>
        <ProTable
          actionRef={ref}
          rowKey="id"
          headerTitle="签到红包消耗明细      剩余开盒总次数：55 （12人）      已开盒总次数：5355"
          options={false}
          dataSource={defaultData}
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