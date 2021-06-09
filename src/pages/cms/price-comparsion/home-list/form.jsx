import React, { useRef, useEffect, useState } from 'react';
import { message, Form, Button } from 'antd';
import ProForm, {
  DrawerForm,
  ProFormText,
} from '@ant-design/pro-form';
import { bannerAdd } from '@/services/cms/member/member';
import Edit from './list-form'


export default (props) => {
  const { detailData, setVisible, visible } = props;
  const formRef = useRef();
  const [form] = Form.useForm();
  const [listFormVisible, setListFormVisible] = useState(false)
  const waitTime = (values) => {
    const { id, ...rest } = values
    const param = {
      ...rest
    }
    if (id) {
      param.id = id
    }
  
    return new Promise((resolve) => {
      bannerAdd(param).then((res) => {
        if (res.code === 0) {
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
        <Button onClick={() => {
          setListFormVisible(true)
        }}>选择比较商品</Button>
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText 
          width="sm"
          name="title"
          label="商品名称"
          fieldProps={
           { disabled:true }
          }
          
        />
      </ProForm.Group>
      <ProForm.Group>
        <Form.Item
          label="商品图片"
          name="image"
        >
        </Form.Item>
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="sm"
          name="sort"
          label="排序"
          fieldProps={
            {defaultValue:100}
          }
          rules={[{ required: true, message: '请输入排序序号' }]}  
        />

      </ProForm.Group>
        <ProFormText
          name="id"
          label="id"
          hidden
        />
      {listFormVisible && <Edit
      visible={listFormVisible}
      setVisible={setListFormVisible}
    />}
    </DrawerForm>
    
  );
};