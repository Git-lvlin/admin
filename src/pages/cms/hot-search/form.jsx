import React, { useRef, useEffect, useState } from 'react';
import { message, Form } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-form';
import { bannerAdd } from '@/services/cms/member/member';

export default (props) => {
  const { detailData, setVisible, onClose, visible } = props;
  const formRef = useRef();
  const [form] = Form.useForm();

  const waitTime = (values) => {
    const { id, ...rest } = values
    console.log('rest', rest)
    const param = {
      ...rest
    }
    if (id) {
      param.id = id
    }
    return new Promise((resolve) => {
      bannerAdd(param).then((res) => {
        if (res.code === 0) {
          resolve(true);
        }
      })
  
    });
  };

  useEffect(() => {
    if (detailData) {
      const { ...rest } = detailData;
      console.log('detailData', detailData)
      form.setFieldsValue({
        ...rest
      })
    }
  }, [form, detailData])

  return (
    <ModalForm
      title={`${detailData ? '编辑页面' : '新增'}`}
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      form={form}
      submitter={{
        searchConfig: {
          submitText: detailData?'确认添加':'编辑',
          resetText: '取消',
        },
      }}
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
        <ProFormText 
          width="sm"
          name="title"
          label="关键词名称"
          rules={[{ required: true, message: '请输入关键词名称' }]}  
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="sm"
          name="sort"
          label="排序"
          rules={[{ required: true, message: '请输入排序序号' }]}  
        />

      </ProForm.Group>
        <ProFormText
          name="id"
          label="id"
          hidden
        />
    </ModalForm>
  );
};