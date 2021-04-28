import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import {
  DrawerForm,
  ProFormText,
  ProFormRadio,
  ProFormTextArea,
  ProFor
} from '@ant-design/pro-form';
import Upload from '@/components/upload'
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
      title={`${detailData ? '编辑' : '新建'}供应商`}
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
        label="供应商名称"
        placeholder="请输入供应商名称"
        rules={[{ required: true, message: '请输入供应商名称' }]}
        fieldProps={{
          maxLength: 30,
        }}
      />
      <ProFormText
        name="goodsDesc"
        label="供应商登录账号"
        placeholder="请输入供应商登录账号"
        rules={[{ required: true, message: '请输入供应商登录账号' }]}
        fieldProps={{
          maxLength: 18,
        }}
      />
      <ProFormText.Password
        name="supplierSpuId"
        label="供应商登录密码"
        placeholder="请输入供应商登录密码"
        rules={[{ required: true, message: '请输入供应商登录密码' }]}
        fieldProps={{
          maxLength: 32,
          visibilityToggle: false,
        }}
      />
      <Form.Item
        label="营业执照"
        name="primaryImages"
        tooltip={
          <dl>
            <dt>图片要求</dt>
            <dd>1.图片大小1MB以内</dd>
            <dd>2.图片格式png/jpg/gif</dd>
          </dl>
        }
      >
        <Upload multiple maxCount={1} accept="image/*" size={1 * 1024} />
      </Form.Item>
      <Form.Item
        label="商品详情"
        name="detailImages"
        tooltip={
          <dl>
            <dt>图片要求</dt>
            <dd>1.图片大小1MB以内</dd>
            <dd>2.图片格式png/jpg/gif</dd>
            <dd>3.图片数量20张以内</dd>
          </dl>
        }
      >
        <Upload multiple maxCount={20} accept="image/*" size={1 * 1024} />
      </Form.Item>
      <ProFormText
        name="goodsDesc"
        label="负责人"
        placeholder="请输入负责人"
        rules={[{ required: true, message: '请输入负责人' }]}
        fieldProps={{
          maxLength: 10,
        }}
      />
      <ProFormText
        name="goodsDesc"
        label="负责人手机号"
        placeholder="请输入负责人手机号"
        rules={[{ required: true, message: '请输入负责人手机号' }]}
        fieldProps={{
          maxLength: 11,
        }}
      />
      <ProFormText
        name="goodsKeywords"
        label="接收订单提醒的手机号"
        placeholder="请输入手机号码 产生待发货订单时自动发送短信"
      />
      <ProFormText
        name="goodsKeywords"
        label="库存预警值"
        placeholder="请输入整数字 可用库存小于等于此值时提醒"
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