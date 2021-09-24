import React, { useRef, useEffect } from 'react';
import { message, Form } from 'antd';
import ProForm, {
  ModalForm,
  DrawerForm,
  ProFormText,
  ProFormRadio,
} from '@ant-design/pro-form';
import Upload from '@/components/upload';
import { homeActivityUpdata } from '@/services/cms/member/member';

export default (props) => {
  const { detailData, setVisible, onClose, visible } = props;
  const formRef = useRef();
  const [form] = Form.useForm();

  const waitTime = (values) => {
    const { id, ...rest } = values
    const param = {
      ...rest
    }
    if (id) {
      param.id = id
    }
  
    return new Promise((resolve, reject) => {
      homeActivityUpdata(param).then((res) => {
        if (res.code === 0) {
          resolve(true);
        } else {
          reject(false);
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
    <ModalForm
      title={`${detailData ? '编辑' : '新建'}首页活动入口`}
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
        <ProFormText 
          width="sm"
          name="title"
          label="活动标题"
          rules={[{ required: true, message: '请输入活动标题' }]}
          fieldProps={{
            maxLength: 10
          }}
        />
      </ProForm.Group>
      <ProForm.Group>
        <Form.Item
          label="添加活动图片"
          name="image"
          required
          rules={
            [{
              required: true,
              message: '请上传活动图片'
            }]
          }
          tooltip={
            <dl>
              <dt>图片要求</dt>
              <dd>90*90</dd>
              <dd>支持png,jpg,gif</dd>
            </dl>
          }
        >
          {/* <Upload multiple maxCount={1} code={201} accept="image/*" proportion={{width: 90, height: 90,}} /> */}
          <Upload multiple maxCount={1} code={201} />
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
          label="活动状态"
          initialValue={0}
          options={[
            {
              label: '启用',
              value: 1,
            },
            {
              label: '关闭',
              value: 0,
            },
          ]}
        />
        <ProFormText
          name="id"
          label="id"
          hidden
        />
    </ModalForm>
  );
};