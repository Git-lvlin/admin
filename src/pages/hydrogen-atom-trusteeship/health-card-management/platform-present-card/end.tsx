import React, { useRef, useEffect, useState } from 'react';
import { message, Form } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-form';
import { platformCardStatusSub } from "@/services/hydrogen-atom-trusteeship/health-card-management"


export default (props) => {
  const { detailData, setVisible, visible, callback = () => { } } = props;
  const formRef = useRef();
  const [form] = Form.useForm();

  const waitTime = (values) => {
    const params={
      ...values,
      status:detailData?.status?0:1
    }
    return new Promise((resolve, reject) => {
      platformCardStatusSub(params).then((res) => {
        if (res.code === 0) {
          resolve(true);
          callback();
        } else {
          reject(false);
        }
      })
    });
  };

  useEffect(() => {
    if (detailData) {
      const { id } = detailData
      form.setFieldsValue({
        id,
      })
    }
  }, [form, detailData])

  return (
    <ModalForm
      key='end'
      title='操作'
      width={400}
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      form={form}
      drawerprops={{
        forceRender: true,
        destroyOnClose: true,
      }}
      onFinish={async (values) => {
        await waitTime(values);
        message.success('提交成功');
        // 不返回不会关闭弹框
        return true;
      }}
    >
      <p>确定要 <span style={{color:'red'}}>{detailData?.status?'终止':'启用'}</span> 吗？</p>
      <ProFormText
        name="id"
        label="id"
        hidden
      />
    </ModalForm>
  );
};