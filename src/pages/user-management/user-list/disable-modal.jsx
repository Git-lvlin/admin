import React from 'react';
import { message } from 'antd';
import {
  ModalForm,
  ProFormTextArea
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
      title="请确认要禁用会员：青蜂侠（手机号：18928892873）？"
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
      <ProFormTextArea
        name="text"
        label="禁用原因"
        placeholder="请输入禁用原因 30个字以内"
        rules={[{ required: true, message: '请输入禁用原因！' }]}
        fieldProps={{
          rows: 4,
          autoSize: false,
          maxLength: 30
        }}
      />
      <div style={{ color: 'red', textIndent: 125 }}>禁用后，会员将无法登录平台，请谨慎操作！</div>
    </ModalForm>
  );
};