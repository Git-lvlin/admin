import { useEffect, useState } from 'react';
import { Form } from 'antd';
import {
  DrawerForm,
} from '@ant-design/pro-form';
import ProList from '@ant-design/pro-list';
import { getStoreList } from '@/services/intensive-store-management/store-list';
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
  return (
    <DrawerForm
      title={`${type==1?'VIP社区店':'普通社区店'}（ID:${msgDetail?.agencyId}）`}
      onVisibleChange={setVisible}
      visible={visible}
      width={1000}
      form={form}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
          onClose();
        },
        keyboard:false
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
      <ProList<GithubIssueItem>
        search={false}
        rowKey="name"
        request={getStoreList}
        params={{
          agencyId:msgDetail?.agencyId,
          vip:type
        }}
        pagination={{
          pageSize: 5,
          showQuickJumper: true,
        }}
        split={true}
        postData={(data)=>{
          const arr=data.map(ele=>({...ele,desc:ele?.status?.desc}))
          return arr
        }}
        metas={{
          title: {
            dataIndex: 'storeName',
          },
          description: {
            dataIndex: 'desc',
          },
          actions:{
            render:(text, row)=>(
            <div>
              <p style={{float:'right',color:'#262626'}}>{row?.auditTime} <span>审核通过</span></p><br/>
              <p style={{color:'#999999',float:'right'}}>{row?.areaInfo['1964']} {row?.areaInfo['1988']} {row?.areaInfo['1992']} {row?.address}</p>
            </div> 
            )
          }
        }}
      />
    </DrawerForm >
  );
};