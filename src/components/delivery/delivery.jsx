import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-form';

import { getExpressList } from '@/services/common'

export default (props) => {
  const { visible, setVisible, callback = () => {}, data } = props;
  const [expressList, setExpressList] = useState([]);
  const [form] = Form.useForm()

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
      })
    }
  }, [data])

  useEffect(() => {
    getExpressList()
      .then(res => {
        if (res.code === 0) {
          setExpressList(res.data.records.companyList)
        }
      });
  }, [])

  return (
    <ModalForm
      title="物流信息"
      modalProps={{
        width: 500,
      }}
      form={form}
      onFinish={async (values) => {
        callback(values)
        return true;
      }}
      onVisibleChange={setVisible}
      visible={visible}
      initialValues={{
        method: 1,
      }}
    >
      {/* <ProFormRadio.Group
        name="method"
        label="物流方式"
        options={[
          {
            label: '快递',
            value: 1,
          },
        ]}
      /> */}
      <ProFormSelect
        name="expressId"
        label="快递公司"
        rules={[{ required: true, message: '请选择快递公司' }]}
        options={expressList.map(item => ({ label: item.expressName, value: item.id }))}
      />
      <ProFormText
        name="expressNo"
        label="快递单号"
        placeholder="请输入快递单号"
        rules={[{ required: true, message: '请输入快递单号' }]}
        fieldProps={{
          maxLength: 50,
        }}
      />
    </ModalForm >
  );
};