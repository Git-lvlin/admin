import React, { useState, useRef,useEffect } from 'react';
import { Input, Form, message,Button,InputNumber,Spin,Space,Switch} from 'antd';
import { EditableProTable } from '@ant-design/pro-table';
import { couponInviteSub,couponInviteEdit,couponInviteDetail,couponInviteSelList } from '@/services/activity-management/share-red-packet-activity';
import ProForm, { ProFormSwitch } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './style.less'

const formItemLayout = {
  labelCol: { span: 2 },
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

 

export default (props) =>{
  const [form] = Form.useForm();
  
  useEffect(() => {
    
  }, [])
  const onsubmit=values=>{
     
  }
 
  return (
    <PageContainer>
      <ProForm
        form={form}
        onFinish={async (values)=>{
            await  onsubmit(values);
          return true;
         } }
         {...formItemLayout} 
        submitter={false}
        className={styles.community_store}
      >
        <Space>
          <span>默认社区店配送范围</span>
          <Form.Item name="num">
            <InputNumber />
          </Form.Item>
          <span>公里</span>
        </Space>
        <p className={styles.hint}>店主可手动修改自己店铺的配送范围，没有修改的店主默认用此处设置的配送范围</p>
        <Space>
          <span>超出配送范围禁止用户下单</span>
          <ProFormSwitch name="switch"/>
        </Space>
       </ProForm>
    </PageContainer>
  )
}
