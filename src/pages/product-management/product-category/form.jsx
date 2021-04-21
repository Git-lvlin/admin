import React, { useEffect } from 'react';
import { Form } from 'antd';
import {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-form';
import * as api from '@/services/product-management/product-category'

export default (props) => {
  const { visible, setVisible, callback, gcName, id, type } = props;
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
      const apiMethod = type === 'add' ? api.categoryAdd : api.categoryEdit;
      const params = {
        ...values,
        gcShow: 1,
      }

      if (type === 'add') {
        params.gcParentId = id
      } else {
        params.id = id;
      }

      apiMethod({
        ...params,
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
    form?.setFieldsValue({
      gcName,
    })
  }, [form, gcName])

  return (
    <ModalForm
      title={type === 'edit' ? '编辑分类' : `添加${id === 0 ? '一' : '二'}级分类`}
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