import React, { useState, useEffect } from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormRadio,
  ProFormSelect,
} from '@ant-design/pro-form';
import { Form } from 'antd';
import { adminAdd, adminEdit } from '@/services/setting/account-management'
import md5 from 'blueimp-md5';

export default (props) => {
  const { visible, setVisible, adminGroupList, callback, onClose, data } = props;
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
    const apiMethod = data ? adminEdit : adminAdd;
    const obj = { ...values };
    if (data) {
      obj.id = data.id;
    }
    // obj.password = md5(obj.password)
    return apiMethod(obj, { showSuccess: true })
  }

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        group_id: data.groupId,
        username: data.username,
        nickname: data.nickname,
        status: data.status,
        mobile: data.mobile,
      });
    }
  }, [data, form])

  return (
    <ModalForm
      title={`${data ? '编辑' : '新建'}账号`}
      modalProps={{
        onCancel: () => onClose(),
      }}
      onVisibleChange={setVisible}
      visible={visible}
      width={550}
      onFinish={async (values) => {
        await submit(values);
        callback();
        return true;
      }}
      form={form}
      labelAlign="right"
      {...formItemLayout}
      initialValues={{
        status: 1,
      }}
    >
      <ProFormText
        name="nickname"
        label="名称"
        placeholder="请输入名称"
        width="md"
        required
      />

      <ProFormText
        name="username"
        label="登录账号"
        placeholder="请输入登录账号"
        width="md"
        required
      />

      <ProFormText.Password
        name="password"
        label="登录密码"
        placeholder="请输入登录密码"
        width="md"
        fieldProps={{
          visibilityToggle: false,
        }}
        rules={[{ required: !data, message: '请输入登录密码' }]}
      />

      <ProFormSelect
        options={adminGroupList}
        width="md"
        name="group_id"
        label="选择角色"
        rules={[{ required: !data, message: '请选择角色' }]}
      />

      <ProFormRadio.Group
        required
        name="status"
        label="状态"
        options={[
          {
            label: '启用',
            value: 1,
          },
          {
            label: '禁用',
            value: 0,
          },
        ]}
      />
      <ProFormText
        name="mobile"
        label="手机号码"
        placeholder="请输入手机号码"
        width="md"
        fieldProps={{
          maxLength: 11
        }}
      />
    </ModalForm>
  );
};