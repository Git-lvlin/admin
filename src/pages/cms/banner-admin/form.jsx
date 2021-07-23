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

export default (props) => {
  const { detailData, setVisible, onClose, visible } = props;
  const formRef = useRef();
  const [form] = Form.useForm();
  const [nowIndex, setNowIndex] = useState(0);
  const picSize = [
    false,
    {
      width: 351,
      height: 100,
    },
    {
      width: 375,
      height: 168,
    },
    {
      width: 351,
      height: 65,
    },
    {
      width: 375,
      height: 150,
    }
  ]

  const waitTime = (values) => {
    const { id, ...rest } = values
    console.log('rest', rest)
    const param = {
      ...rest
    }
    if (id) {
      param.id = id
    }
    if (detailData) {
      if (param.useType.length > 1) {
        param.useType = {
          '全平台':1,
          '手机端':2,
          'h5':3,
          'web网页':4,
          '小程序':5,
        }[detailData.useType]
      }
      if (param.location.length > 1) {
        param.location = {
          '首页':1,
          '集约':2,
          '个人中心':3,
          '社区店':4,
        }[detailData.location]
      }
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
      setNowIndex(detailData.location)
      detailData.useType = {
        1: '全平台',
        2: '手机端',
        3: 'h5',
        4: 'web网页',
        5: '小程序',
      }[detailData.useType]
      detailData.location = {
        1: '首页',
        2: '集约',
        3: '个人中心',
        4: '社区店',
      }[detailData.location]
      const { ...rest } = detailData;
      console.log('detailData', detailData)
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
        <ProFormSelect
          name="useType"
          label="适用平台"
          valueEnum={{
            1: '全平台',
            2: '手机端',
            3: 'h5',
            4: 'web网页',
            5: '小程序',
          }}
          placeholder="选择平台"
          rules={[{ required: true, message: '请选择平台!' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          name="location"
          label="位置"
          valueEnum={{
            1: '首页',
            2: '集约',
            3: '个人中心',
            4: '社区店',
          }}
          placeholder="选择位置"
          rules={[{ required: true, message: '请选择位置!' }]}
          fieldProps={{
            onChange: (e) => {
              setNowIndex(e)
            }
          }}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText 
          width="sm"
          name="title"
          label="banner名称"
          rules={[{ required: true, message: '请输入banner名称' }]}  
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
              <dd>首页banner-351*100</dd>
              <dd>集约页面banner-375*168</dd>
              <dd>个人中心banner-351*65</dd>
              <dd>社区店专享banner-375*150</dd>
            </dl>
          }
        >
          <Upload multiple maxCount={1} code={201} accept="image/*" proportion={picSize[nowIndex]||'banner'} />
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
          initialValue={0}
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