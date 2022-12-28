import React, { useRef, useEffect, useState } from 'react';
import { message, Form } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-form';
import { exceptionOrderRefund } from '@/services/financial-management/transaction-detail-management'

export default (props) => {
  const { setVisible,visible,callback,onClose,msgDatail } = props;
  const formRef = useRef();
  const [form] = Form.useForm();

  const waitTime = () => {
    const param = {
      orderSn:msgDatail?.orderNo,
      payAmount:msgDatail?.amount
    }
    return new Promise((resolve, reject) => {
      exceptionOrderRefund(param).then((res) => {
        if (res.code === 0) {
          callback()
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
        message.success('退款成功');
        // 不返回不会关闭弹框
        return true;
      }}
    >
      <p style={{color:'red'}}>确定要退款吗？</p>
    </ModalForm>
  );
};