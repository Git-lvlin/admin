import React, {useState, useRef} from 'react';
import {
  DrawerForm,
  ProFormText,
  ProFormRadio,
} from '@ant-design/pro-form';
import { Form } from 'antd';

const edit = props => {
  const { visible, setVisible, detailData, callback = () => { }, onClose = () => { } } = props
  const [form] = Form.useForm()
  
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
    layout: {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
    }
  };

  return (
    <DrawerForm
      title={`${detailData ? '编辑' : '新建'}`}
      onVisibleChange={setVisible}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        width: 800,
        onClose: () => {
          onClose();
        }
      }}
      form={form}
      onFinish={async (values) => {
        await submit(values);
        return true;
      }}
      visible={visible}
      initialValues={{
        status: 1,
      }}
      {...formItemLayout}
    >
       <ProFormText
        name="companyName"
        label="供应商名称"
        placeholder="请输入供应商名称"
        rules={[{ required: true, message: '请输入供应商名称' }]}
        fieldProps={{
          maxLength: 30,
        }}
      />
    </DrawerForm>
  )
}

export default edit;
