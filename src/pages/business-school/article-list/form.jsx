import React, { useRef, useEffect, useState } from 'react';
import { message, Form } from 'antd';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormRadio,
  ProFormSelect,
} from '@ant-design/pro-form';
import Upload from '@/components/upload';
import { bannerAdd } from '@/services/cms/member/member';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



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



export default (props) => {
  const { detailData, setVisible, onClose, visible } = props;
  const formRef = useRef();
  const [form] = Form.useForm()
  const [value, setValue] = useState('');

  useEffect(() => {
    console.log('value', value)
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
          label="标题"
          rules={[{ required: true, message: '请输入banner名称' }]}  
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText 
          width="sm"
          name="title"
          label="昵称"
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
              <dd>首页banner-351*100</dd>
              <dd>集约页面banner-375*186</dd>
              <dd>个人中心banner-375*65</dd>
              <dd>社区店专享banner-375*150</dd>
            </dl>
          }
        >
          <Upload multiple maxCount={1} accept="image/*" dimension="1:1" size={375} />
        </Form.Item>
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          name="location"
          label="所属分类"
          valueEnum={{
            1: '首页',
            2: '集约',
            3: '个人中心',
            4: '社区店',
          }}
          placeholder="选择位置"
          rules={[{ required: true, message: '请选择位置!' }]}
        />
      </ProForm.Group>
      <ProFormRadio.Group
          name="state"
          label="是否置顶"
          required
          options={[
            {
              label: '置顶',
              value: 1,
            },
            {
              label: '不置顶',
              value: 0,
            },
          ]}
        />
      <ProFormRadio.Group
          name="state"
          label="状态"
          required
          options={[
            {
              label: '显示',
              value: 1,
            },
            {
              label: '隐藏',
              value: 0,
            },
          ]}
        />
      <ProForm.Group>
        <ProFormText 
          width="sm"
          name="sort"
          label="虚拟浏览量"
          rules={[{ required: true, message: '请输入虚拟浏览量,8位以内整数' }]}  
        />

      </ProForm.Group>
      <ProForm.Group>
        <ReactQuill theme="snow" value={value} onChange={setValue}/>
      </ProForm.Group>

        <ProFormText
          name="id"
          label="id"
          hidden
        />
    </DrawerForm>
  );
};