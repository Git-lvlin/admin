import React from 'react';
import { message } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormRadio,
  ProFormSelect,
} from '@ant-design/pro-form';

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default (props) => {
  const { visible, setVisible } = props;
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
    <ModalForm
      title="新建账号"
      modalProps={{
        onCancel: () => console.log('run'),
      }}
      onVisibleChange={setVisible}
      visible={visible}
      width={550}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values.name);
        message.success('提交成功');
        return true;
      }}
      labelAlign="right"
      {...formItemLayout}
    >
      <ProFormText
        name="name"
        label="名称"
        placeholder="请输入名称"
        width="md"
        required
      />

      <ProFormText
        name="name"
        label="登录账号"
        placeholder="请输入登录账号"
        width="md"
        required
      />

      <ProFormText.Password
        name="name"
        label="登录密码"
        placeholder="请输入登录密码"
        width="md"
        required
      />

      <ProFormSelect
        options={[
          {
            value: 'chapter',
            label: '管理员',
          },
        ]}
        width="md"
        name="useMode"
        label="选择角色"
        required
      />

      <ProFormRadio.Group
        required
        name="radio"
        label="状态"
        options={[
          {
            label: '启用',
            value: 'a',
          },
          {
            label: '禁用',
            value: 'b',
          },
        ]}
      />
    </ModalForm>
  );
};