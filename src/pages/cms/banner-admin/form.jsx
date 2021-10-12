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
  const { detailData, setVisible, onClose, visible, verifyVersionId } = props;
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
    },
    {
      width: 375,
      height: 160,
    },
    {
      width: 375,
      height: 160,
    }
  ]

  const waitTime = (values) => {
    const { id, ...rest } = values
    const param = {
      ...rest
    }
    if (id) {
      param.id = id
    }
    if (detailData) {
      if (param.location.length > 1) {
        param.location = {
          '首页':1,
          '集约':2,
          '个人中心':3,
          '社区店':4,
          '秒杀爆品':6,
        }[detailData.location]
      }
    }
  
    if (verifyVersionId) {
      param.verifyVersionId = verifyVersionId
    }
    return new Promise((resolve, reject) => {
      bannerAdd(param).then((res) => {
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
      setNowIndex(detailData.location)
      detailData.location = {
        1: '首页',
        2: '集约',
        3: '个人中心',
        4: '社区店',
        6: '秒杀爆品',
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
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormSelect
          name="location"
          label="位置"
          valueEnum={{
            1: '首页',
            2: '集约',
            3: '个人中心',
            4: '社区店',
            6: '秒杀爆品',
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
        >
          <Upload multiple maxCount={1} code={201} accept="image/*" proportion={picSize[nowIndex]||'banner'} />
        </Form.Item>
        <div>
          <dl>
            <dt>图片要求</dt>
            <dd>首页banner-351*100</dd>
            <dd>集约页面banner-375*168</dd>
            <dd>个人中心banner-351*65</dd>
            <dd>社区店专享banner-375*150</dd>
            <dd>秒杀爆品banner-375*160</dd>
          </dl>
        </div>
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