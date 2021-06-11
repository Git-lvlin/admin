import React, { useRef, useEffect } from 'react';
import { message, Form } from 'antd';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormRadio,
} from '@ant-design/pro-form';
import Upload from '@/components/upload';
import { homeSuspensionAdd } from '@/services/cms/member/member';



export default (props) => {
  const { detailData, setVisible, setFlag, visible } = props;
  const formRef = useRef();
  const [form] = Form.useForm()

  const waitTime = (values) => {
    const { id, ...rest } = values
    const param = {
      ...rest
    }
    if (id) {
      param.id = id
    }
    return new Promise((resolve) => {
      homeSuspensionAdd(param).then((res) => {
        if (res.code === 0) {
          setFlag(true)
          resolve(true);
        }
      })
  
    });
  };

  useEffect(() => {
    if (detailData) {
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
          label="悬浮窗名称"
          rules={[{ required: true, message: '请输入悬浮窗名称' }]}  
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
              <dd>根据设计，暂无限制</dd>
            </dl>
          }
        >
          <Upload multiple maxCount={1} accept="image/*" />
        </Form.Item>
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