import React, { useRef } from 'react';
import { Button, message, Form, Cascader, Upload as AntUpload } from 'antd';
import {
  DrawerForm,
  ProFormText,
  ProFormRadio,
  ProFormSelect,
} from '@ant-design/pro-form';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Upload = (props) => {
  return (
    <AntUpload
      name="avatar"
      listType="picture-card"
      showUploadList={false}
      {...props}
    >
      <div>
        <UploadOutlined />
        <p>上传</p>
      </div>
    </AntUpload>
  )
}

const options = [
  {
    value: '食品',
    label: '食品',
    children: [
      {
        value: '肉',
        label: '肉',
      },
    ],
  },
  {
    value: '服饰',
    label: '服饰',
    children: [
      {
        value: '衣',
        label: '衣',
      },
    ],
  },
];

export default (props) => {
  const { visible } = props;
  const formRef = useRef();

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
    <DrawerForm
      title="新建表单"
      formRef={formRef}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values.name);
        message.success('提交成功');
        // 不返回不会关闭弹框
        return true;
      }}
      visible={visible}
      {...formItemLayout}
    >
      <ProFormText
        name="name"
        label="商品名称"
        placeholder="请输入商品名称"
        rules={[{ required: true, message: '请输入商品名称' }]}
      />
      <ProFormText
        name="name"
        label="搜索关键字"
        placeholder="请输入搜索关键字"
      />
      <Form.Item
        label="商品品类"
        name="parentId"
        rules={[{ required: true, message: '请选择商品品类' }]}
      >
        <Cascader options={options} placeholder="请选择商品品类" />
      </Form.Item>
      <ProFormSelect
        options={[
          {
            value: 'a',
            label: 'a',
          },
        ]}
        name="useMode"
        label="商品品牌"
      />
      <ProFormRadio.Group
        name="radio-group"
        label="规格属性"
        rules={[{ required: true }]}
        fieldProps={{
          defaultValue: 'a'
        }}
        options={[
          {
            label: '单规格',
            value: 'a',
          },
          {
            label: '多规格',
            value: 'b',
          },
        ]}
      />
      <ProFormText
        name="name"
        label="可用库存"
        placeholder="请输入可用库存"
        rules={[{ required: true, message: '请输入可用库存数量' }]}
      />
      <ProFormText
        name="name"
        label="库存预警值"
        placeholder="请输入数字 可用库存小于等于此值时提醒"
      />
      <ProFormRadio.Group
        name="radio-group"
        label="供货类型"
        rules={[{ required: true }]}
        fieldProps={{
          defaultValue: 'a'
        }}
        options={[
          {
            label: '批发+零售',
            value: 'a',
          },
          {
            label: '仅批发',
            value: 'b',
          },
        ]}
      />
      <ProFormText
        name="name"
        label="批发价"
        placeholder="请输入批发价"
        rules={[{ required: true, message: '请输入供货价' }]}
      />
      <ProFormText
        name="name"
        label="批发起购量"
        placeholder="请输入批发起购量"
        rules={[{ required: true, message: '请输入数字 需大于可用库存' }]}
      />
      <ProFormText
        name="name"
        label="零售供货价"
        placeholder="请输入零售供货价"
        rules={[{ required: true, message: '请输入供货价' }]}
      />
      <ProFormText
        name="name"
        label="建议零售价"
        placeholder="请输入建议零售价"
        rules={[{ required: true, message: '请输入建议零售价' }]}
      />
      <ProFormRadio.Group
        name="radio-group"
        label="运费属性"
        rules={[{ required: true }]}
        fieldProps={{
          defaultValue: 'a'
        }}
        options={[
          {
            label: '包邮',
            value: 'a',
          },
          {
            label: '不包邮',
            value: 'b',
          },
        ]}
      />
      <ProFormRadio.Group
        name="radio-group"
        label="七天无理由退货"
        rules={[{ required: true }]}
        fieldProps={{
          defaultValue: 'a'
        }}
        options={[
          {
            label: '支持',
            value: 'a',
          },
          {
            label: '不支持',
            value: 'b',
          },
        ]}
      />
      <ProFormRadio.Group
        name="radio-group"
        label="特殊说明"
        rules={[{ required: true }]}
        fieldProps={{
          defaultValue: 'a'
        }}
        options={[
          {
            label: '不需要',
            value: 'a',
          },
          {
            label: '需要',
            value: 'b',
          },
        ]}
      />
      <Form.Item
        label="商品主图"
        name="parentId"
        rules={[{ required: true, message: '请上传商品主图' }]}
        tooltip={
          <dl>
            <dt>图片要求</dt>
            <dd>1.图片大小500kb以内</dd>
            <dd>2.图片比例1:1</dd>
            <dd>3.图片格式png/jpg/gif</dd>
            <dd>4.至少上传3张</dd>
          </dl>
        }
      >
        <Upload />
      </Form.Item>
      <Form.Item
        label="商品详情"
        name="parentId"
        rules={[{ required: true, message: '请上传商品详情' }]}
        tooltip={
          <dl>
            <dt>图片要求</dt>
            <dd>1.图片大小2MB以内</dd>
            <dd>2.图片格式png/jpg/gif</dd>
          </dl>
        }
      >
        <Upload />
      </Form.Item>
      <Form.Item
        label="商品横幅"
        name="parentId"
        tooltip={
          <dl>
            <dt>图片要求</dt>
            <dd>1.图片大小500kb以内</dd>
            <dd>2.图片尺寸702*320px</dd>
            <dd>3.图片格式png/jpg/gif</dd>
            <dd>注：商品横幅用于VIP商品推广，非必填</dd>
          </dl>
        }
      >
        <Upload />
      </Form.Item>
      <Form.Item
        label="商品视频"
        name="parentId"
        tooltip={
          <dl>
            <dt>视频要求</dt>
            <dd>1.视频大小20MB以内</dd>
            <dd>2.视频格式mp4</dd>
          </dl>
        }
      >
        <Upload />
      </Form.Item>
    </DrawerForm>
  );
};