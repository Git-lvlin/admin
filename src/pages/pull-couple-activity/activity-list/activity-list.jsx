import React, { useState, useRef } from 'react';
import { Button,Tabs} from 'antd';
import ProTable from '@ant-design/pro-table';
import { ModalForm,ProFormRadio} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import XLSX from 'xlsx'
import { couponList } from '@/services/coupon-management/coupon-list';
import { couponDelSub,couponStatusSub } from '@/services/coupon-management/coupon-delsub';
import DeleteModal from '@/components/DeleteModal'
// import EndModel from './end-model'
// import TurnDownModel from './turn-down-model'
// import styles from './style.less'
import { history,connect } from 'umi';
import { useEffect } from 'react';
const { TabPane } = Tabs


export default (props) => {
  const ref=useRef()
  const columns= [
    {
      title: '活动ID',
      dataIndex: 'couponName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入活动ID'
      },
    },
    {
      title: '活动名称',
      dataIndex: 'couponType',
      valueType: 'select',
      valueEnum: {
        1: '满减券',
        2: '折扣券',
        3: '立减券'
      }
    },
    {
      title: '活动时间',
      dataIndex: 'couponAmountDisplay',
      hideInSearch: true,
    },
    {
      title: '活动金(元)',
      dataIndex: 'issueType',
      valueEnum: {
        1: '会员领取券',
        2: '系统发放券',
        3: '每日红包'
      },
    },
    {
      title: '有效时长(h)',
      dataIndex: 'issueAmount',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '活动商品名称',
      dataIndex: 'issueQuantity',
      valueType: 'text',
      hideInSearch: true,
      render:(_, data)=>{
        return <p>{data.issueQuantity==-1?'不限量':data.issueQuantity}</p>
      }
    },
    {
      title: '商品spuID',
      dataIndex: 'dateRange',
      valueType: 'text',
      render:(_, data)=>{
        return <p>{data.limitStartTime} 至 {data.limitEndTime}</p>
      },
      hideInSearch: true,
      ellipsis:true
    },
    {
      title: '商品skuID',
      dataIndex: 'activityTimeDisplay',
      valueType: 'text',
      hideInSearch: true,
      ellipsis:true
    },
    {
      title: '状态',
      dataIndex: 'couponStatus',
      valueType: 'select',
      valueEnum: {
        1: '未开始',
        2: '进行中',
        3: '已结束',
        4: '已终止'
      }
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      width:200,
      render: (_, data) => [
      <a key="a" onClick={()=>{ look(data.id)}}>
          详情
      </a>,
      <a key="a" onClick={()=>{ Examine(data.id) }}>
          编辑
      </a>,
     
       <DeleteModal
        record={data}
        label2={'撤回'}
        status={1}
        boxref={ref} 
        text={'确定要撤回吗？'} 
        InterFace={couponStatusSub}
        title={'操作确认'}
      />,
    //   <EndModel boxref={ref} data={data}/>
      ],
    },
    
  ];
 
  //编辑
  const Examine=(id)=>{
    history.push(`/coupon-management/coupon-list/construction?id=`+id);
    dispatch({
      type:'DetailList/fetchLookDetail',
      payload:{id:id}
    })
  }
  //查看
  const look=(id)=>{
    history.push(`/coupon-management/coupon-list/list-details?id=`+id);
  }
 
  // 跳转到码库
  const CodeLibrary=(id)=>{
    history.push(`/coupon-management/coupon-list/coupon-codebase?id=`+id);
  }

return(
  <PageContainer>
    <ProTable
      actionRef={ref}
      rowKey="id"
      options={false}
    //   params={{
    //     couponVerifyStatus: type,
    //   }}
    //   request={couponList}
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
  </PageContainer>
  );
};
