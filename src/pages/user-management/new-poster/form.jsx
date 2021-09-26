import React, { useRef, useEffect } from 'react';
import { message, Form } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormRadio,
} from '@ant-design/pro-form';
import Upload from '@/components/upload';
import { posterUpdata } from '@/services/cms/member/member';

export default (props) => {
  const { detailData, setVisible, onClose, visible } = props;
  const formRef = useRef();
  const [form] = Form.useForm();

  const waitTime = (values) => {
    const { image, ...rest } = values
    const param = {
      ...rest,
      bgImage: {
        url: image,
        with: 308,
        height: 410,
        relativeX: 34,
        relativeY: 162,
      },
      compositeXY: {
        relativeX: 108,
        relativeY: 179,
        qrcodeWidth: 92,
        qrcodeHeight: 92,
      }
    }
  
    return new Promise((resolve, reject) => {
      posterUpdata(param).then((res) => {
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
      title={'上传'}
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
          name="title"
          label="海报名称"
          placeholder={'请输入海报名称，长度3-8个汉字、字母或数字'}
          rules={[{ required: true, message: '请输入海报名称，长度3-8个汉字、字母或数字' }]}
          fieldProps={{
            maxLength: 8,
            minLength: 3,
          }}
        />
      </ProForm.Group>
      <ProForm.Group>
        <Form.Item
          label="添加海报图片"
          name="image"
          required
          rules={
            [{
              required: true,
              message: '请上传海报图片'
            }]
          }
          tooltip={
            <dl>
              <dt>图片要求</dt>
              <dd>大小：不超过2MB</dd>
              <dd>尺寸：375px*676px</dd>
              <dd>格式：png/jpg/gif</dd>
            </dl>
          }
        >
          <Upload multiple maxCount={1} />
        </Form.Item>
      </ProForm.Group>
      <ProFormRadio.Group
          name="state"
          label="是否上架"
          initialValue={1}
          options={[
            {
              label: '立即上架',
              value: 1,
            },
            {
              label: '暂不上架',
              value: 0,
            },
          ]}
        />
    </ModalForm>
  );
};