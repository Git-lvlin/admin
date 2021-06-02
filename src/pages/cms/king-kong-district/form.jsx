import React, { useRef, useState, useEffect } from 'react';
import { Button, message, Form } from 'antd';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormRadio,
  ProFormSelect,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import MemberReg from '@/components/member-reg';
import Upload from '@/components/upload';
import { bannerAdd } from '@/services/cms/member/member';

const waitTime = (values) => {
  console.log('values', values)
  const { id, ...rest } = values
  const param = {
    ...rest
  }
  if (id) {
    param.id = id
  }
  console.log('param', param)
  return new Promise((resolve) => {
    bannerAdd(param).then((res) => {
      console.log('res', res);
      if (res.code === 0) {
        resolve(true);
      }
    })

  });
};



export default (props) => {
  console.log('pppp', props)
  const { detailData, setVisible, onClose, visible } = props;
  const formRef = useRef();
  const [form] = Form.useForm()

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      search: false,
      hideInTable: false,
    },
  ];

  useEffect(() => {
    if (detailData) {
      console.log('1111', detailData)
      const { ...rest } = detailData;
      form.setFieldsValue({
        ...rest
      })
    }
  }, [form, detailData])

  return (
    <DrawerForm
      title={`${detailData ? '编辑' : '新建'}`}
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      form={form}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
          onClose();
        }
      }}
      onFinish={async (values) => {
        await waitTime(values);
        message.success('提交成功');
        // 不返回不会关闭弹框
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormSelect
          name="useType"
          label="适用平台"
          valueEnum={{
            1: '全平台',
            2: '手机端',
            3: 'h5',
            4: 'web网页',
            5: '小程序',
          }}
          placeholder="选择平台"
          rules={[{ required: true, message: '请选择平台!' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          name="location"
          label="位置"
          valueEnum={{
            1: '首页',
            2: '集约',
            3: '个人中心',
            4: '会员店',
          }}
          placeholder="选择位置"
          rules={[{ required: true, message: '请选择位置!' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText 
          width="sm"
          name="title"
          label="banner名称"
          rules={[{ required: true, message: '请输入banner名称' }]}  
        />
      </ProForm.Group>
      <ProForm.Group>
        <Form.Item
          label="添加图片"
          name="image"
          required
          tooltip={
            <dl>
              <dt>图片要求</dt>
              <dd>首页banner-351*100</dd>
              <dd>集约页面banner-375*186</dd>
              <dd>个人中心banner-375*65</dd>
              <dd>会员店专享banner-375*150</dd>
            </dl>
          }
        >
          <Upload multiple maxCount={1} accept="image/*" dimension="1:1" size={375} />
        </Form.Item>
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText 
          width="sm"
          name="sort"
          label="排序"
          rules={[{ required: true, message: '请输入排序序号' }]}  
        />

      </ProForm.Group>
      <ProForm.Group>
        <ProFormText 
            width="sm"
            name="actionUrl"
            label="跳转链接"
            rules={[{ required: false, message: '请输入跳转链接' }]}  
          />
      </ProForm.Group>
      <ProFormRadio.Group
          name="state"
          label="上线/下架"
          required
          options={[
            {
              label: '上线',
              value: 1,
            },
            {
              label: '下架',
              value: 0,
            },
          ]}
        />
        <ProFormText
          name="id"
          label="id"
          hidden
        />
    </DrawerForm>
  );
};