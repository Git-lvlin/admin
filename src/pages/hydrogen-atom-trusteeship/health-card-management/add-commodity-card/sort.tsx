import React, { useRef, useEffect } from 'react';
import { message, Form } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-form';
import { cardSortSub } from "@/services/hydrogen-atom-trusteeship/health-card-management"
import type { PropsDevices } from "./data"


export default (props:PropsDevices) => {
  const { detailData, setVisible, visible, callback = () => { } } = props;
  const formRef = useRef();
  const [form] = Form.useForm();

  const waitTime = (values:{id:number,sort:number}) => {
    return new Promise((resolve, reject) => {
      cardSortSub(values).then((res) => {
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
      const { id,sort } = detailData
      form.setFieldsValue({
        id,
        sort,
      })
    }
  }, [form, detailData])

  return (
    <ModalForm
      key='sort'
      width={400}
      title={'排序'}
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
      <ProForm.Group>
        <ProFormText
          width="sm"
          name="sort"
          label="排序"
          rules={[{
            required: true,
            message: '请输入排序序号(整数)',
            pattern: /^\+?[1-9][0-9]*$/
          }]}
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