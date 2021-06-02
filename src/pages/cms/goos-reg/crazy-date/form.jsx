import React, { useRef, useState, useEffect } from 'react';
import { message, Form } from 'antd';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormRadio,
  ProFormDateTimePicker ,
} from '@ant-design/pro-form';
import CrazyAddActivityReg from '@/components/crazy-add-activity-reg';
import { crazyActivityAdd } from '@/services/cms/member/member';

const waitTime = (values) => {
  const { ...rest } = values
  const param = {
    ...rest
  }
  return new Promise((resolve) => {
    crazyActivityAdd(param).then((res) => {
      if (res.code === 0) {
        resolve(true);
      }
    })
  });
};

export default (props) => {
  const { detailData, setVisible, onClose, visible } = props;
  const formRef = useRef();
  const [form] = Form.useForm()

  useEffect(() => {
    if (detailData?.id) {
      const { ...rest } = detailData;
      form.setFieldsValue({
        ...rest
      })
    }
  }, [])

  return (
    <DrawerForm
      title={`${detailData ? '编辑活动' : '新增活动'}`}
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
        console.log(values.name);
        message.success('提交成功');
        // 不返回不会关闭弹框
        return true;
      }}
    >

      <ProForm.Group>
        <ProFormText
            name="title"
            label="活动标题"
            placeholder="请输入活动标题"
            rules={[{ required: true, message: '请输入活动标题' }]}
          />
      </ProForm.Group>
      <ProFormDateTimePicker name="activityStartTime" required label="开始时间" />
      <ProFormDateTimePicker name="activityEndTime" required label="结束时间" />
      <ProFormRadio.Group
          name="status"
          label="上线/下架"
          required
          options={[
            {
              label: '上线',
              value: 2,
            },
            {
              label: '下架',
              value: 1,
            },
          ]}
        />
      <ProForm.Group>
        <Form.Item
          name="cmsClassId"
          label="位置"
          rules={[{ required: true, message: '请选择位置' }]}
        >
          <CrazyAddActivityReg />
        </Form.Item>
      </ProForm.Group>
      <ProFormText
          name="id"
          label="id"
          hidden
        />
    </DrawerForm>
  );
};