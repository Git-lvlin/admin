import React, { useState, useEffect } from 'react';
import ProTable from '@ant-design/pro-table';
import { Form, message } from 'antd';
import {
  DrawerForm,
} from '@ant-design/pro-form';
import { unbindingForAdmin } from '@/services/operation-management/bind-list'
import Upload from '@/components/upload';

export default (props) => {
  const { setVisible, data, callback = () => { }, onClose = () => { } } = props;
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
    layout: {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 10,
      },
    }
  };

  const submit = (values) => {
    return new Promise((resolve, reject) => {
      const userInfo = JSON.parse(window.localStorage.getItem('user'));
      unbindingForAdmin({
        applyFromId: userInfo.id,
        applyFromName: userInfo.username,
        storeNo: data.storeNo,
        operationId: data.operationId,
        operationName: data.operationCompanyName,
        applyAttach: values.applyAttach,
      }, { showSuccess: true }).then(res => {
        if (res.code === 0) {
          callback();
          resolve();
        } else {
          reject();
        }
      })
    });
  }

  const columns = [
    {
      title: '社区店名称',
      dataIndex: 'storeName',
      valueType: 'text',
    },
    {
      title: '社区店地址',
      dataIndex: 'address',
      valueType: 'text',
      render: (_, a) => {
        return `${Object.values(a.areaInfo).join('')}${_}`
      }
    },
    {
      title: '绑定的运营商',
      dataIndex: 'operationCompanyName',
      valueType: 'text',
    },
  ];

  useEffect(() => {

  }, []);

  return (
    <DrawerForm
      title={`解绑运营商`}
      onVisibleChange={setVisible}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        width: 1300,
        onClose: () => {
          onClose();
        }
      }}
      form={form}
      onFinish={async (values) => {
        try {
          await submit(values);
          return true;
        } catch (error) {
          console.log('error', error);
        }
      }}
      visible
      {...formItemLayout}
    >
      <ProTable
        rowKey="id"
        options={false}
        dataSource={[data]}
        search={false}
        columns={columns}
        pagination={false}
      />
      <Form.Item
        label="解绑审批文件上传"
        name="applyAttach"
        style={{ marginTop: 20 }}
        rules={[() => ({
          required: true,
          validator(_, value) {
            if (value && value.length > 0) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('请上传解绑审批文件上传'));
          },
        })]}
      >
        <Upload
          multiple
          maxCount={50}
          accept="image/*"
        />
      </Form.Item>
    </DrawerForm>
  );
};
