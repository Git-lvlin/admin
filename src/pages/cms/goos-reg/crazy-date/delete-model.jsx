import React, { useRef, useEffect, useState } from 'react';
import { message, Form } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-form';

export default (props) => {
  const { setVisible,visible,callBack,onClose,record } = props;
  const formRef = useRef();
  const [form] = Form.useForm();

  return (
    <ModalForm
      key="sort"
      title='操作确认'
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      form={form}
      modalProps={{
        forceRender: true,
        destroyOnClose: true,
        onCancel:()=>{
          onClose()
        }
      }}
      onFinish={async (values) => {
        await callBack();
        // 不返回不会关闭弹框
        return true;
      }}
    >
      <p>确认要批量删除这些商品吗？</p>
    </ModalForm>
  );
};