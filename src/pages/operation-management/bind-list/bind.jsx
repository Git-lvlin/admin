import React, { useState, useEffect } from 'react';
import { Form, Button, Input, Space, Typography, Divider, DatePicker } from 'antd';
import {
  DrawerForm,
} from '@ant-design/pro-form';
import Upload from '@/components/upload';

export default (props) => {
  const { setVisible, callback = () => { }, onClose = () => { } } = props;
  const [form] = Form.useForm()

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
    layout: {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 10,
      },
    }
  };

  const submit = (values) => {
    return new Promise((resolve, reject) => {
    });
  }

  useEffect(() => {
    
  }, []);

  return (
    <DrawerForm
      title={`绑定运营商`}
      onVisibleChange={setVisible}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        width: 1300,
        onClose: () => {
          onClose();
        }
      }}
      form={form}
      onFinish={async (values) => {
        try {
          await submit(values);
          return true;
        } catch (error) {
          console.log('error', error);
        }
      }}
      visible
      {...formItemLayout}
    >
      
    </DrawerForm>
  );
};
