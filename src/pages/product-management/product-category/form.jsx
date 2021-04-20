import React, { useEffect } from 'react';
import { Form, TreeSelect, message } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormRadio,
  ProFormDependency,
} from '@ant-design/pro-form';
import * as api from '@/services/product-management/product-category'

export default (props) => {
  const { visible, setVisible, callback, data, parentId, type } = props;
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
      api.categoryAdd({
        ...values,
        gcParentId: parentId,
        gcShow: 1,
      }, { showSuccess: true, showError: true }).then(res => {
        if (res.code === 0) {
          resolve();
        } else {
          reject();
        }
      })
    });
  }

  useEffect(() => {
    // form?.setFieldsValue({
    //   name: data.name,
    //   ruleType: data.ruleType,
    //   title: data.title,
    //   status: data.status,
    //   pid: data.pid || '',
    // })
  }, [data])

  return (
    <ModalForm
      title={data ? '编辑分类' : '添加分类'}
      modalProps={{
        onCancel: () => form.resetFields(),
      }}
      onVisibleChange={setVisible}
      visible={visible}
      width={550}
      form={form}
      onFinish={async (values) => {
        await submit(values);
        form.resetFields();
        callback();
        return true;
      }}
      {...formItemLayout}
    >
      <ProFormText
        label="名称"
        width="md"
        rules={[{ required: true, message: '请输入名称！' }]}
        name="gcName"
      />
    </ModalForm >
  );
};