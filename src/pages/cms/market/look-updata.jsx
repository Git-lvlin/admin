import React, { useRef, useEffect } from 'react';
import { message, Form } from 'antd';
import ProForm, {
  DrawerForm,
  ProFormText,
} from '@ant-design/pro-form';
import Upload from '@/components/upload';
import { merketDetailUpdata } from '@/services/cms/member/member';

export default (props) => {
  const { detailDataz, setVisible, visible, setFlag } = props;
  const formRef = useRef();
  const [form] = Form.useForm();


  const waitTime = (values) => {
    const { ...rest } = values
    console.log('rest', rest)
    let param = {
      ...rest
    }
    if (detailDataz.id) {
      param.id = detailDataz.id
    }
    console.log('param', param)
    return new Promise((resolve, reject) => {
      merketDetailUpdata(param).then((res) => {
        if (res.code === 0) {
          setFlag(true)
          resolve(true);
        } else {
          reject(false);
        }
      })
  
    });
  };

  useEffect(() => {
    if (detailDataz) {
      const { ...rest } = detailDataz;
      console.log('detailDataz', detailDataz)
      form.setFieldsValue({
        ...rest
      })
    }
  }, [form, detailDataz])

  return (
    <DrawerForm
      title={`${detailDataz ? '编辑' : '新建'}`}
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
          label="区块名称"
          rules={[{ required: true, message: '请输入区块名称' }]}  
        />
      </ProForm.Group>
      <ProForm.Group>
        <Form.Item
          label="添加图片"
          name="image"
          required
          rules={
            [{
              required: true,
              message: '请上传图片'
            }]
          }
          tooltip={
            <dl>
              <dt>图片要求</dt>
              <dd>暂未限制</dd>
            </dl>
          }
        >
          <Upload multiple maxCount={1} code={201} accept="image/*" />
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
      <ProForm.Group>例子：http://publicmobile-uat.yeahgo.com/web/market?spuId=2441&skuId=3285</ProForm.Group>
      <ProForm.Group>
        <ProFormText
            width="sm"
            name="actionUrl"
            label="跳转链接"
            rules={[{ required: false, message: '请输入跳转链接' }]}  
          />
      </ProForm.Group>
      <ProFormText
        name="itemId"
        label="itemId"
        hidden
      />
    </DrawerForm>
  );
};