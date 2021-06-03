import React, { useState, useRef,useEffect } from 'react';
import { Button, Space } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { couponCcodebase } from '@/services/coupon-codebase/coupon-codebase';
import * as api from '@/services/product-management/product-list';
import { amountTransform, typeTransform } from '@/utils/utils'
import XLSX from 'xlsx'
import { history } from 'umi';

export default props => {
  const actionRef = useRef();
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
      valueType: 'select',
      valueEnum: {
        1: '满减券',
        2: '折扣券',
        3: '立减券',
      }
    },
    {
      title: '使用范围',
      dataIndex: 'useType',
      valueType: 'select',
      valueEnum: {
        1: '秒约商品',
        2: '集约商品',
      }
    },
    {
      title: '有效期',
      dataIndex: 'activityTimeDisplay',
      valueType: 'text',
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
        }
    },
    {
        title: '领券时间',
        key: 'dateRange',
        dataIndex: 'createdAtRange',
        valueType: 'dateRange',
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
const exportExcel = (form) => {
  api.listExport({
    ...form.getFieldsValue(),
  }).then(res => {
    console.log('res',res)
    if (res.code === 0) {
      const data = res.data.map(item => {
        const { ...rest } = item;
        return {
          ...rest,
          // memberCouponCode: amountTransform(rest.memberCouponCode, '/'),
          // memberNicheng: amountTransform(rest.memberNicheng, '/'),
          // memberMobile: amountTransform(rest.memberMobile, '/'),
          // // createTime: amountTransform(rest.createTime, '/'),
          // actTime: amountTransform(rest.actTime, '/'),
          // orderSn: amountTransform(rest.orderSn, '/'),
          // status: amountTransform(rest.status, '/'),

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
        params={{
          status: 1,
          id:libraryId
        }}
        request={
            params => couponCcodebase(params).then(res =>{
              console.log('res',res)
              console.log('res.couponInfo',res.couponInfo)
              setCouponInfo([res.couponInfo])
              return {
                code: res.code,
                data: res.data,
                success: res.success,
              }
            })
        }
        // request={couponCcodebase}
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: ({ searchText, resetText },{ form }) => [
            <Button key="del">作废</Button>,
            <Button onClick={()=>exportExcel(form)} key="out">导出列表</Button>,
          ],
          
        }}
        columns={columns2}
        rowSelection={{}}
        tableAlertOptionRender={onIpute}
      />
    </PageContainer>

  );
};
