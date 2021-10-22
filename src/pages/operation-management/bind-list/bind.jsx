import React, { useState, useEffect } from 'react';
import ProTable from '@ant-design/pro-table';
import { Form, Button } from 'antd';
import {
  DrawerForm,
} from '@ant-design/pro-form';
import { getCommonList } from '@/services/operation-management/operation-list'
import { bindingForAdmin } from '@/services/operation-management/bind-list'
import Upload from '@/components/upload';

export default (props) => {
  const { setVisible, data, callback = () => { }, onClose = () => { } } = props;
  const [form] = Form.useForm();
  const [selectItem, setSelectItem] = useState(null);

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
      bindingForAdmin({

      })
    });
  }

  const columns = [

    {
      title: '运营商名称',
      dataIndex: 'companyName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入运营商名称'
      },
    },
    {
      title: '联系人',
      dataIndex: 'companyUserName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入联系人'
      },
    },
    {
      title: '联系人手机号',
      dataIndex: 'companyUserName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入联系人手机号'
      },
    },
  ];

  useEffect(() => {

  }, []);

  return (
    <DrawerForm
      title={`绑定运营商`}
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
        request={getCommonList}
        search={{
          defaultCollapsed: false,
          labelWidth: 130,
          optionRender: ({ searchText, resetText }, { form }) => [
            <Button
              key="search"
              type="primary"
              onClick={() => {
                form?.submit();
              }}
            >
              {searchText}
            </Button>,
            <Button
              key="rest"
              onClick={() => {
                form?.resetFields();
              }}
            >
              {resetText}
            </Button>,
          ],
        }}
        columns={columns}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        tableAlertRender={false}
        rowSelection={{
          type: 'radio',
          onSelect: (record) => {
            setSelectItem(record)
          },
        }}
      />
      <Form.Item
        label="绑定审批文件上传"
        name="applyAttach"
        rules={[() => ({
          required: true,
          validator(_, value) {
            if (value && value.length > 0) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('请上传绑定审批文件上传'));
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
