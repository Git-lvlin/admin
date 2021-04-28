import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import {
  DrawerForm,
  ProFormText,
  ProFormRadio,
} from '@ant-design/pro-form';
import * as api from '@/services/product-management/product-list';

export default (props) => {
  const { visible, setVisible, detailData, callback, onClose = () => { } } = props;
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

  const submit = (values) => {
    return new Promise((resolve, reject) => {
      const apiMethod = detailData ? api.editGoods : api.addGoods
      apiMethod(obj, { showSuccess: true, showError: true }).then(res => {
        if (res.code === 0) {
          resolve();
          callback();
        } else {
          reject();
        }
      })
    });
  }


  useEffect(() => {
    if (detailData) {
      form.setFieldsValue({})
    }

  }, [form, detailData]);

  return (
    <DrawerForm
      title={`${detailData ? '编辑' : '新建'}顾问`}
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

      }}
      {...formItemLayout}
    >
      <ProFormText
        name="goodsName"
        label="顾问名称"
        placeholder="请输入顾问名称"
        rules={[{ required: true, message: '请输入顾问名称' }]}
        fieldProps={{
          maxLength: 30,
        }}
      />
      <ProFormText
        name="goodsDesc"
        label="登录账号"
        placeholder="请输入登录账号"
        rules={[{ required: true, message: '请输入登录账号' }]}
        fieldProps={{
          maxLength: 18,
        }}
      />
      <ProFormText.Password
        name="supplierSpuId"
        label="登录密码"
        placeholder="请输入登录密码"
        rules={[{ required: true, message: '请输入登录密码' }]}
        fieldProps={{
          maxLength: 32,
          visibilityToggle: false,
        }}
      />
      
      <ProFormText
        name="goodsDesc"
        label="手机号"
        placeholder="请输入手机号"
        rules={[{ required: true, message: '请输入手机号' }]}
        fieldProps={{
          maxLength: 11,
        }}
      />

      <ProFormText
        name="goodsDesc"
        label="备注"
        placeholder="请输入备注"
        fieldProps={{
          maxLength: 30,
        }}
      />

      <ProFormRadio.Group
        name="goodsSaleType"
        label="状态"
        rules={[{ required: true }]}
        options={[
          {
            label: '启用',
            value: 1,
          },
          {
            label: '禁用',
            value: 2,
          },
        ]}
      />
    </DrawerForm>
  );
};