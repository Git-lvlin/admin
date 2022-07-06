import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import {
  ModalForm,
  ProFormRadio,
  ProFormTextArea,
  ProFormDependency,
  ProFormText,
  ProFormCheckbox,
  ProFormDatePicker
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

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        toStatus: data.toStatus,
      })
    }
  }, [data])

  const submit = (values) => {
    return new Promise((resolve, reject) => {
      let userInfo = window.localStorage.getItem('user');
      userInfo = userInfo && JSON.parse(userInfo)
      changeStatus({
        storeNo: data.storeNo,
        optAdminId: userInfo.id,
        optAdminName: userInfo.username,
        reason: values.reason,
        attachList: values.attachList,
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
      title={`操作店主PC后台`}
      onVisibleChange={setVisible}
      visible={visible}
      width={650}
      form={form}
      onFinish={async (values) => {
        await submit(values);
        callback();
        return true;
      }}
      modalProps={{
        forceRender: true,
        destroyOnClose: true,
        onCancel: () => {
          setVisible(false)
        }
      }}
      initialValues={{
        toStatus: 1,
      }}
      {...formItemLayout}
    >
      <ProFormRadio.Group
        name="toStatus"
        label="操作类型"
        rules={[{ required: true, message: '请选择操作' }]}
        options={[
          {
            label: '开通',
            value: 1,
          },
          {
            label: '注销',
            value: 0,
          }
        ]}
      />

      <ProFormCheckbox.Group
        name="checkbox"
        label="行业分布"
        options={[
          {
            label: '预约系统',
            value: 1,
          },
          {
            label: '健康档案',
            value: 2,
          },
          {
            label: '充值系统',
            value: 3,
          },
        ]}
      />

      <ProFormText
        label="已缴费用"
        fieldProps={{
          placeholder: '请输入开通费用,可输0.00至999999.99',
          addonAfter: '元'
        }}
      />

      <ProFormText
        label="登录账号"
        fieldProps={{
          placeholder: '请输入店主PC端后台的登录账号',
        }}
      />
      <ProFormText.Password
        label="登录密码"
        fieldProps={{
          placeholder: '请输入店主PC端后台的登录密码',
        }}
      />
      <ProFormTextArea
        name="reason"
        label="操作说明"
        placeholder="请输入至少5至30个字符"
        rules={[
          { required: true, message: '请输入操作说明' },
        ]}
        fieldProps={{
          maxLength: 30,
        }}
      />
      <ProFormDatePicker name="date" label="开通有效期至" width="100%" placeholder="请输入店主PC端后台的开通有效期截至日期" />

      <ProFormRadio.Group
        name="toStatus"
        label="PC后台状态"
        rules={[{ required: true, message: '请选择操作' }]}
        options={[
          {
            label: '启用',
            value: 1,
          },
          {
            label: '关闭',
            value: 0,
          }
        ]}
      />
    </ModalForm >
  );
};