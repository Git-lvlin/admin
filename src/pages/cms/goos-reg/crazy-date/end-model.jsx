import React, { useRef, useEffect, useState } from 'react';
import { message, Form } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-form';
import { seckillingClassEnd } from '@/services/cms/member/goos-reg';

export default (props) => {
  const { setVisible,visible,callBack,onClose,id } = props;
  const formRef = useRef();
  const [form] = Form.useForm();

  const waitTime = () => {
    const param = {
      id
    }
    return new Promise((resolve, reject) => {
      seckillingClassEnd(param).then((res) => {
        if (res.code === 0) {
          callBack()
          resolve(true);
        } else {
          reject(false);
        }
      })
    });
  };

  return (
    <ModalForm
      key="sort"
      width={600}
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
        await waitTime();
        message.success('提交成功');
        // 不返回不会关闭弹框
        return true;
      }}
    >
      <p style={{color:'#908A8A'}}>确定要终止此活动吗？</p>
    </ModalForm>
  );
};