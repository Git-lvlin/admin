import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import {
  ModalForm,
  ProFormRadio,
  ProFormTextArea,
  ProFormDependency,
} from '@ant-design/pro-form';
import { changeStatus } from '@/services/intensive-store-management/store-list';

export default (props) => {
  const { visible, setVisible, callback, data } = props;
  const [form] = Form.useForm();
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
      let userInfo = window.localStorage.getItem('user');
      userInfo = userInfo && JSON.parse(userInfo)
      changeStatus({
        storeNo: data.storeNo,
        optAdminId: userInfo.id,
        optAdminName: userInfo.username,
        ...values
      }, { showSuccess: true }).then(res => {
        if (res.code === 0) {
          resolve()
        } else {
          reject()
        }
      })
    });
  }


  return (
    <ModalForm
      title={`请登记店铺保证金退回信息  ${data.storeName} （店铺ID：${data.id}）`}
      modalProps={{
      }}
      onVisibleChange={setVisible}
      visible={visible}
      width={650}
      form={form}
      onFinish={async (values) => {
        await submit(values);
        callback();
        return true;
      }}
      {...formItemLayout}
    >
      <Form.Item
        label="保证金缴纳状态"
      >
        已交（￥3000.00）  于 2021-03-15 15:22:02 缴纳
        <div style={{ color: 'red' }}>已实际完成店铺保证金退款操作，确认无误后登记如下：</div>
      </Form.Item>

      <Form.Item
        name="test"
        label="请输入已退回金额"
        rules={[{ required: true, message: '请输入已退回金额' }]}
      >
        <Input placeholder="请输入已退回金额" suffix="元" />
      </Form.Item>

      <ProFormTextArea
        name="reason"
        label="备注"
        placeholder="请输入备注信息 6-50个字 例如：退款时间，退款操作人，退款打款银行卡号码等等"
        rules={[{ required: true, message: '请输入备注' }]}
      />

    </ModalForm >
  );
};