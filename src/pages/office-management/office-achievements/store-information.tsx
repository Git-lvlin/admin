import { useEffect, useState } from 'react';
import { Form,List,Divider } from 'antd';
import {
  DrawerForm
} from '@ant-design/pro-form';
import ProList from '@ant-design/pro-list';
import { findItemPage } from "@/services/office-management/office-achievements"
import { amountTransform } from '@/utils/utils'
import type { GithubIssueItem } from "./data"

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
    layout: {
      labelCol: {
        span: 10,
      },
      wrapperCol: {
        span: 14,
      },
    }
  };

export default (props) => {
  const { visible, setVisible,msgDetail,onClose,type} = props;
  const [form] = Form.useForm();
  const divide=(item)=>{
    switch (type) {
      case 0:
        return amountTransform(item?.totalCommission,'/').toFixed(2)
      case 1:
        return amountTransform(item?.totalSaleCommission,'/').toFixed(2)
      case 2:
        return amountTransform(item?.totalRentCommission,'/').toFixed(2)
      case 3:
        return amountTransform(item?.totalOrderAmount,'/').toFixed(2)
      default:
        return ''
    }
  }

  const divideName=()=>{
    switch (type) {
      case 0:
        return '累计分成'
      case 1:
        return '销售分成'
      case 2:
        return '管理费分成'
      case 3:
        return '累计业绩'
      default:
        return ''
    }
  }
  return (
    <DrawerForm
      title={`${msgDetail?.businessDeptName} ${divideName()} （ID:${msgDetail?.businessDeptId}）`}
      onVisibleChange={setVisible}
      visible={visible}
      form={form}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
          onClose();
        }
      }}
      submitter={{
        render:()=>{
            return []
        }
      }}
      onFinish={()=>{
        return false
      }}
      {...formItemLayout}
    >
      {
        type==3&&<><p>总业绩：{amountTransform(msgDetail?.totalOrderAmount,'/').toFixed(2)}元，总机器：{msgDetail?.totalCount}台（销售{msgDetail?.totalSaleCount}台，租赁{msgDetail?.totalRentCount}台）</p><Divider /></>
      }
      <ProList<GithubIssueItem>
        search={false}
        rowKey="name"
        request={findItemPage}
        params={{
          businessDeptId:msgDetail?.businessDeptId,
          userName:msgDetail?.userName,
          type:type
        }}
        pagination={{
          pageSize: 5,
          showQuickJumper: true,
        }}
        split={true}
        metas={{
          title: {
            dataIndex: 'date',
          },
          description: {
            dataIndex: 'totalCount',
            render:(_,data)=>{
              if(type==3){
                return <p>{data?.totalCount}台(销售{data?.totalCount}台，租赁{data?.totalRentCount}台)</p>
              }
            }
          },
          actions:{
            render:(text, row)=>(
            <div>
              <p style={{float:'right',color:'#262626'}}>{divide(row)}元</p><br/>
              <p style={{color:'#999999',float:'right'}}>{type==3?'订单数量':'业绩金额'}：{type==3?`${row?.orderCount}笔`:`${amountTransform(row?.totalOrderAmount,'/').toFixed(2)}元`}</p>
            </div> 
            )
          }
        }}
      />
    </DrawerForm >
  );
};