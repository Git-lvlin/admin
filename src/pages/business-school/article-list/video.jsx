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
import { adminArticleDetail } from '@/services/business-school/find-admin-article-list';
import 'react-quill/dist/quill.snow.css';





const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
  layout: {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 14,
    },
  }
};



export default (props) => {
  const { detailData, setVisible, onClose, visible,callback } = props;
  const formRef = useRef();
  const [form] = Form.useForm()

  useEffect(() => {
    if(detailData?.id){
        adminArticleDetail({id:detailData?.id}).then(res=>{
            form.setFieldsValue({
                ...res.data
              })
        })
    }

  }, [form, detailData])

  const onsubmit = (values) => {
    const { ...rest } = values
    const param = {
      articleType:2,
      ...rest
    }
    if (detailData?.id) {
      param.articleTypeId = detailData?.id
    }
    return new Promise((resolve) => {
      bannerAdd(param).then((res) => {
        if (res.code === 0) {
          message.success('提交成功');
          resolve(true);
          callback(true)
        }
      })
  
    });
  };

  return (
    <DrawerForm
      title={`${detailData?.id ?detailData?.edtil?'详情': '编辑视频' : '新建视频'}`}
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
        await onsubmit(values);
        // 不返回不会关闭弹框
        return true;
      }}
      {...formItemLayout}
    >
        <ProFormText 
          width="md"
          name="articleTitle"
          label="标题"
          placeholder="请输入视频标题"
          rules={[{ required: true, message: '请输入视频标题' }]}
          readonly={detailData?.id&&detailData?.edtil&&true}
          fieldProps={{
            maxLength: 60,
          }} 
        />

        <ProFormText 
          width="md"
          name="authorNickName"
          label="发布人昵称"
          placeholder="请输入当前登录账户昵称"
          rules={[{ required: true, message: '请输入当前登录账户昵称' }]}
          readonly={detailData?.id&&detailData?.edtil&&true}
          fieldProps={{
            maxLength: 20,
          }}  
        />

        <Form.Item
          label="封面图片"
          name="coverPicture"
          required
          tooltip={
            <dl>
            <dt>图片要求</dt>
            <dd>1.图片大小500kb以内</dd>
            <dd>2.图片尺寸为 360 x 100</dd>
            <dd>3.图片格式png/jpg/gif</dd>
          </dl>
          }
          readonly={detailData?.id&&detailData?.edtil}  
        >
          <Upload multiple dimension={{width:360,height:100}}  maxCount={1} accept="image/*"  size={1*1024/2} />
        </Form.Item>

        <ProFormSelect
          name="storeType"
          label="可展示店铺"
          valueEnum={{
            1: '所有店铺',
            2: '社区店',
            3: '内部店',
            4: '自营店',
          }}
          placeholder="请选择可展示的店铺"
          rules={[{ required: true, message: '请选择店铺!' }]}
          readonly={detailData?.id&&detailData?.edtil}  
        />

      <ProFormRadio.Group
          name="isTop"
          label="是否置顶"
          required
          rules={[{ required: true, message: '是否置顶!' }]}
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
          readonly={detailData?.id&&detailData?.edtil}  
        />

        <ProFormText 
          width="md"
          name="virtualClickNum"
          label="虚拟浏览量"
          placeholder="请输入虚拟浏览量，8位以内整数"
          rules={[{ required: true, message: '请输入虚拟浏览量,8位以内整数' }]}  
          readonly={detailData?.id&&detailData?.edtil}  
        />

        <Form.Item
          label="上传视频"
          name="videoUrl"
          required
          tooltip={
            <dl>
              <dt>视频要求</dt>
              <dd>1.500MB以内</dd>
              <dd>2.60分钟以内</dd>
              <dd>3.mp4格式</dd>
            </dl>
          }
          extra="视频要求 1.500MB以内 2.60分钟以内 3.mp4格式"
          readonly={detailData?.id&&detailData?.edtil}  
        >
          <Upload multiple maxCount={1} size={500*1024}  accept="video/*" />
        </Form.Item>

    </DrawerForm>
  );
};