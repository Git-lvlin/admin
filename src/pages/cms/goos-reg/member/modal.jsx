import React, { useRef, useEffect } from 'react';
import { message, Form } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-form';
import MemberReg from '@/components/member-reg';
import Upload from '@/components/upload';
import { spaceEdit } from '@/services/cms/member/member';

export default (props) => {
  const [form] = Form.useForm()
  const { detailData, setVisible, onClose, visible } = props;
  const formRef = useRef();
  const waitTime = (values) => {
    const { ...rest } = values
    const param = {
      ...rest
    }
    return new Promise((resolve) => {
      spaceEdit(param).then((res) => {
        if (res.code === 0) {
          resolve(true);
        }
      })
  
    });
  };

  useEffect(() => {
    console.log('detailData', detailData)
    if (detailData) {
      const { ...rest } = detailData;
      form.setFieldsValue({
        ...rest
      })
    }
  }, [form, detailData])


  return (
    <ModalForm
      title='新建'
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      form={form}
      modalProps={{
        onClose: () => {
          onClose();
        }
      }}
      onFinish={async (values) => {
        await waitTime(values);
        message.success('修改成功');
        // 不返回不会关闭弹框
        return true;
      }}
    >
      <ProForm.Group>
        <Form.Item
          name="id"
          label="上传区域"
          rules={[{ required: true, message: '请选择上传区域' }]}
        >
          <MemberReg/>
        </Form.Item>
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
            name="subtitle"
            label="商品描述"
            placeholder="请输入商品描述"
            rules={[{ required: true, message: '请输入商品描述' }]}
            fieldProps={{
              maxLength: 16,
            }}
          />
      </ProForm.Group>
      <ProForm.Group>
        <Form.Item
          label="修改图片"
          name="image"
          required
          tooltip={
            <dl>
              <dt>图片要求</dt>
              <dd>1.图片大小500kb以内</dd>
              <dd>2.图片比例1:1</dd>
              <dd>3.图片格式png</dd>
            </dl>
          }
        >
          <Upload multiple maxCount={1} accept="image/*" dimension="1:1" size={500} />
        </Form.Item>
        <ProFormText 
          width="sm"
          name="sort"
          label="排序"
          rules={[{ required: true, message: '请输入排序序号' }]}  
        />
        <ProFormText 
          width="sm"
          name="actionUrl"
          label="链接"
          rules={[{ required: false, message: '请输入链接' }]}  
        />
      </ProForm.Group>
    </ModalForm>
  );
};