import React, { useEffect } from 'react';
import { Form } from 'antd';
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
      title={`请确认店铺状态  ${data.storeName} （店铺ID：${data.id}）`}
      modalProps={{
      }}
      onVisibleChange={setVisible}
      visible={visible}
      width={550}
      form={form}
      onFinish={async (values) => {
        await submit(values);
        callback();
        return true;
      }}
      initialValues={{
        toStatus: 1,
      }}
      {...formItemLayout}
    >
      <ProFormRadio.Group
        name="toStatus"
        label="操作结果"
        options={[
          {
            label: '开启',
            value: 1,
          },
          {
            label: '关闭',
            value: 3,
          },
          {
            label: '注销',
            value: 2,
          },
        ]}
      />
      <ProFormDependency name={['toStatus']}>
        {({ toStatus }) => {
          return toStatus === 2 && <div style={{ color: 'red', marginLeft: 130, marginTop: '-25px', marginBottom: 20 }}>注销后不能再开启，请谨慎操作！</div>
        }}
      </ProFormDependency>

      <ProFormDependency name={['toStatus']}>
        {({ toStatus }) => {
          return toStatus !== 1 && <ProFormTextArea
            name="reason"
            label="理由"
            placeholder="请输入操作理由 6-50个字"
            rules={[{ required: true, message: '请输入理由' }]}
          />
        }}
      </ProFormDependency>

    </ModalForm >
  );
};