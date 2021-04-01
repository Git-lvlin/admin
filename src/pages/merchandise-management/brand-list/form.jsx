import React from 'react';
import { message, Form, Upload } from 'antd';
import {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-form';
import { UploadOutlined } from '@ant-design/icons'

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

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const uploadChange = (e) => {
    getBase64(e.file.originFileObj).then(res => {
      console.log('res', res);
    })
  }

  return (
    <ModalForm
      title="确认发货"
      modalProps={{
        onCancel: () => console.log('run'),
      }}
      onVisibleChange={setVisible}
      visible={visible}
      width={550}
      onFinish={async (values) => {
        await waitTime(2000);
        message.success('提交成功');
        return true;
      }}
      labelAlign="right"
      {...formItemLayout}
    >
      <ProFormText
        name="select"
        label="品牌名称"
        placeholder="请输入品牌名称"
        rules={[{ required: true, message: '请输入品牌名称' }]}
      />
      <Form.Item
        label="品牌logo"
        name="parentId"
        rules={[{ required: true, message: '请上传品牌logo' }]}
        tooltip={
          <dl>
            <dt>图片要求</dt>
            <dd>1.图片大小5MB以内</dd>
            <dd>2.图片格式png/jpg</dd>
          </dl>
        }
      >
        <Upload
          name="avatar"
          listType="picture-card"
          showUploadList={false}
          onChange={uploadChange}
        >
          <div>
            <UploadOutlined />
            <p>上传</p>
          </div>
        </Upload>
      </Form.Item>
    </ModalForm>
  );
};