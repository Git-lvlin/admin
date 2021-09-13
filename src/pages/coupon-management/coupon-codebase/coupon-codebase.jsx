import React, { useState, useRef,useEffect } from 'react';
import { Button} from 'antd';
import ProTable from '@ant-design/pro-table';
import { couponCcodebase,couponCodebaseEnd } from '@/services/coupon-management/coupon-codebase';
import XLSX from 'xlsx'

export default props => {
  const ref=useRef()
  const [couponInfo,setCouponInfo]=useState([])
  const [libraryId,setLibraryId]=useState(1)
  const [byid,setByid]=useState()

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
        3: '立减券'
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
      },
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
        render:(_,data)=>{
          return <>
           <p>子订单：{data.orderSnSon}</p>
           <p>父订单：{data.orderSn}</p>
          </>
        }
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
        },
        hideInTable:true
    },
    {
        title: '优惠券状态',
        dataIndex: 'status',
        valueType: 'text',
        valueEnum: {
          1: '未使用',
          2: '已使用',
          3: '已过期',
          4: '已作废'
        },
        hideInSearch: true
    },
    {
        title: '领券时间',
        key: 'dateRange',
        dataIndex: 'createdAtRange',
        valueType: 'dateRange',
        hideInTable:true
    }
    
  ];
 useEffect(()=>{
  let id=props.location.query.id
  setLibraryId(parseInt(id))
 },[])
//导出数据
const exportExcel = (searchConfig) => {
  couponCcodebase({id:libraryId,...searchConfig.form.getFieldsValue()}).then(res => {
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
          memberCouponCode: '红包码',
          memberNicheng: '领取会员昵称',
          memberMobile: '会员手机号',
          createTime: '领取时间',
          actTime: '使用时间',
          orderSn: '订单编号',
          status: '红包状态',
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
const filterData=(res)=>{
  setCouponInfo([res.couponInfo])
  return res.memberCouponList.records
  }
const onIpute=(res)=>{
  setByid(res.selectedRowKeys.toString())
}

  return (
    <>
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
          id:libraryId
        }}
        postData={filterData}
        request={couponCcodebase}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Button  onClick={()=>{
              couponCodebaseEnd({ids:byid}).then(res=>{
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
      </>
  );
};
