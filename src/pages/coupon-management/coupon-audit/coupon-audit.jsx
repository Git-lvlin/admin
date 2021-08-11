import React, { useState, useRef } from 'react';
import { Button,Tabs} from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { couponList } from '@/services/coupon-management/coupon-list';
import styles from './style.less'
import { history} from 'umi';
const { TabPane } = Tabs


const message = (type, module) => {
  const ref=useRef()
  const columns= [
    {
      title: '优惠券名称',
      dataIndex: 'couponName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入优惠券名称'
      },
      render:(text, record, _, action)=>[
        <a onClick={()=>history.push('/coupon-management/coupon-list/list-details?id='+record.id)}>{record.couponName}</a>
    ],
    },
    {
      title: '优惠券类型',
      dataIndex: 'couponType',
      valueType: 'select',
      valueEnum: {
        1: '满减券',
        2: '折扣券',
        3: '立减券'
      }
    },
    {
      title: '发行总金额（元）',
      dataIndex: 'issueAmount',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '发行总数量（张）',
      dataIndex: 'issueQuantity',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '面额（元）',
      dataIndex: 'couponAmountDisplay',
      hideInSearch: true,
    },
    {
      title: '可领取时间',
      dataIndex: 'dateRange',
      valueType: 'text',
      render:(_, data)=>{
        return <p>{data.limitStartTime} 至 {data.limitEndTime}</p>
      },
      hideInSearch: true,
      ellipsis:true
    },
    {
      title: '有效期',
      dataIndex: 'activityTimeDisplay',
      valueType: 'text',
      hideInSearch: true,
      ellipsis:true
    },
    {
      title: '审核状态',
      dataIndex: 'couponVerifyStatus',
      valueType: 'select',
      valueEnum: {
        1: '待提交',
        2: '审核驳回',
        3: '审核中',
        4: '已通过'
      },
      hideInSearch: true
    },
    {
      title: '操作',
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (_, data) => [
      <a
        key="a"
        onClick={()=>{
          Examine(data.id)
        }}
        >
        {
          type==3?
          '审核'
          :null
        }
      </a>,
      <a
        key="a"
        onClick={()=>Examine(data.id)}
      >
        {
          type==4?
          '查看'
          :null
        }
      </a>
      ],
    },
    
  ];
 
  //跳转到新建页面
  const Examine=(id)=>{
    history.push(`/coupon-management/coupon-audit/audit-details?id=`+id);
  }

  return (
      <ProTable
        actionRef={ref}
        rowKey="id"
        options={false}
        params={{
          couponVerifyStatus: type,
        }}
        request={couponList}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
          <Button onClick={()=>{ref.current.reload()}} key="refresh">
            刷新
          </Button>
          ],
        }}
        columns={columns}
      />
  );
};

export default (props) =>{
  const [seleType,setSeleType]=useState()
  return (
    <PageContainer>
      <Tabs
        centered
        defaultActiveKey="1"
        className={styles.auditTabs}
        onChange={(val)=>{
          setSeleType(val)
        }}
      >
        <TabPane tab="待审核" key="3">
          {message(seleType||3, 1)}
        </TabPane>
        <TabPane tab="审核通过" key="4">
          {message(seleType||4, 2)}
        </TabPane>
      </Tabs>
    </PageContainer>
  )
}
