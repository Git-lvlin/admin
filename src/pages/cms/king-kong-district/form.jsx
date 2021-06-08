import React, { useRef, useEffect } from 'react';
import { message, Form } from 'antd';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormRadio,
} from '@ant-design/pro-form';
import Upload from '@/components/upload';
import { kingKongAdd, kingKongModify } from '@/services/cms/member/member';

export default (props) => {
  const { detailData, change, setVisible, visible } = props;
  const formRef = useRef();
  const [form] = Form.useForm()

  const waitTime = (values) => {
    const { id, ...rest } = values
    const param = {
      ...rest
    }
    let api = kingKongAdd
    if (id) {
      param.id = id
      api = kingKongModify
    }
    return new Promise((resolve) => {
      api(param).then((res) => {
        if (res.code === 0) {
          change(true)
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
          label="类目名称"
          rules={[{ required: true, message: '请输入类目名称' }]}  
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
              <dd>57*57</dd>
            </dl>
          }
        >
          <Upload multiple maxCount={1} accept="image/*" proportion={{width:57,height:57}} />
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