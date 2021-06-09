import React, { useState, useRef,useEffect } from 'react';
import { Button, Space } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { couponCcodebase } from '@/services/coupon-codebase/coupon-codebase';
import { couponEnd } from '@/services/coupon-management/coupon-end';
import * as api from '@/services/product-management/product-list';
import { amountTransform, typeTransform } from '@/utils/utils'
import XLSX from 'xlsx'
import { history } from 'umi';

export default props => {
  const ref=useRef()
  const [couponInfo,setCouponInfo]=useState([])
  const [libraryId,setLibraryId]=useState(1)

  const columns=[
    {
      title: '优惠券名称',
      dataIndex: 'couponName',
      valueType: 'text',
    },
    {
      title: '优惠券类型',
      dataIndex: 'couponType',
      valueType: 'text'
    },
    {
      title: '使用范围',
      dataIndex: 'useType',
      valueType: 'text'
    },
    {
      title: '有效期',
      dataIndex: 'activityTimeDisplay',
      valueType: 'text',
      width:120
    },
    {
      title: '状态',
      dataIndex: 'couponStatus',
      valueType: 'text',
    },
    {
      title: '发行量',
      dataIndex: 'issueQuantity',
      valueType: 'text',
    },
    {
      title: '已领取',
      dataIndex: 'lqCouponQuantity',
      valueType: 'text',
    },
    {
      title: '待领取',
      dataIndex: 'unLqCouponQuantity',
      valueType: 'text',
    },
    {
      title: '已使用',
      dataIndex: 'useCouponQuantity',
      valueType: 'text',
    },
    {
      title: '未使用',
      dataIndex: 'unUseCouponQuantity',
      valueType: 'text',
    },
  ]
  const columns2 = [
    {
        title: '优惠券码',
        dataIndex: 'memberCouponCode',
        valueType: 'text',
    },
    {
        title: '领取会员昵称',
        dataIndex: 'memberNicheng',
        valueType: 'text',
        fieldProps: {
            placeholder: '请输入会员昵称'
        }
    },
    {
        title: '会员手机号',
        dataIndex: 'memberMobile',
        valueType: 'text'
    },
    {
        title: '领取时间',
        dataIndex: 'createTime',
        valueType: 'text',
        hideInSearch: true,
    },
    {
        title: '使用时间',
        dataIndex: 'actTime',
        valueType: 'text',
        hideInSearch: true,
    },
    {
        title: '订单编号',
        dataIndex: 'orderSn',
        valueType: 'text'
    },
    {
        title: '优惠券状态',
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: {
          1: '未使用',
          2: '已使用',
          3: '已过期',
          4: '已作废'
        }
    },
    {
        title: '领券时间',
        key: 'dateRange',
        dataIndex: 'createdAtRange',
        valueType: 'dateRange',
        hideInTable:true
    }
    
  ];
  const onIpute=(res)=>{
        // console.log('res.selectedRows',res.selectedRows)
  }
 useEffect(()=>{
  let id=props.location.query.id
  setLibraryId(parseInt(id))
   return undefined
 },[])
  //导出数据
const exportExcel = (searchConfig) => {
  console.log('searchConfig',searchConfig.form.getFieldsValue())
  couponCcodebase({...searchConfig.form.getFieldsValue()}).then(res => {
    console.log('res',res)
    if (res.code === 0) {
      const data = res.data.memberCouponList.records.map(item => {
        const { ...rest } = item;
        return {
          ...rest,
        }
      });
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet([
        {
          memberCouponCode: '优惠券码',
          memberNicheng: '领取会员昵称',
          memberMobile: '会员手机号',
          createTime: '领取时间',
          actTime: '使用时间',
          orderSn: '订单编号',
          status: '优惠券状态',
        },
        ...data
      ], {
        header: [
          'memberCouponCode',
          'memberNicheng',
          'memberMobile',
          'createTime',
          'actTime',
          'orderSn',
          'status'
        ],
        skipHeader: true
      });
      XLSX.utils.book_append_sheet(wb, ws, "file");
      XLSX.writeFile(wb, `${+new Date()}.xlsx`)

    }
  })
}

  return (
    <PageContainer>
     <ProTable
        toolBarRender={false}
        search={false}
        rowKey="couponName"
        columns={columns}
        dataSource={couponInfo}
        style={{margin:'40px 0'}}
      />
      <ProTable
        rowKey="id"
        options={false}
        actionRef={ref}
        params={{
          status: 1,
          id:libraryId
        }}
        request={
            params => couponCcodebase(params).then(res =>{
              setCouponInfo([res.data.couponInfo])
            })
        }
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Button key="del" onClick={()=>{
              console.log('searchConfig',searchConfig.form.getFieldsValue())
              couponEnd({id:searchConfig.form.getFieldsValue().orderSn}).then(res=>{
                if(res.code==0){
                  ref.current.reload();
                  return true;
                }
              })
            }}>作废</Button>,
            <Button onClick={()=>{exportExcel(searchConfig)}} key="out">
              导出数据
            </Button>
          ],
        }}
        columns={columns2}
        rowSelection={{}}
        tableAlertOptionRender={onIpute}
      />
    </PageContainer>

  );
};
