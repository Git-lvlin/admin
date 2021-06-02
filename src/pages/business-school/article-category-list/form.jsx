import React, { useRef } from 'react';
import { Button, message, Form } from 'antd';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormRadio,
} from '@ant-design/pro-form';
import MemberReg from '@/components/member-reg';
import Upload from '@/components/upload';
import { spaceAdd } from '@/services/cms/member/member';





export default (props) => {
  const { detailData, setVisible, onClose, visible } = props;
  const formRef = useRef();
  const waitTime = (values) => {
    const { image,image1,url,url1,sort,sort1, ...rest } = values
    const info = [
      {
        image,
        url,
        sort
      },
      {
        image: image1,
        url: url1,
        sort: sort1,
      }
    ]
    const param = {
      info,
      ...rest
    }
    return new Promise((resolve) => {
      spaceAdd(param).then((res) => {
        if (res.code === 0) {
          resolve(true);
        }
      })
  
    });
  };

  return (
    <DrawerForm
      title='新建'
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
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
            name="name"
            label="名称"
            placeholder="请输入分类名称，2-6个字符"
            rules={[{ required: true, message: '请输入分类名称，2-6个字符' }]}
            fieldProps={{
              maxLength: 16,
            }}
          />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
            name="sort"
            label="序号"
            placeholder="请输入展示数字序号，升序展示，正整数"
            rules={[{ required: true, message: '请输入展示数字序号，升序展示，正整数' }]}
            fieldProps={{
              maxLength: 16,
            }}
          />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
            name="subtitle"
            label="描述"
            placeholder="请输入分类描述，30字以内"
            rules={[{ required: false, message: '请输入分类描述，30字以内' }]}
            fieldProps={{
              maxLength: 16,
            }}
          />
      </ProForm.Group>
      <ProFormRadio.Group
          name="state"
          label="状态"
          required
          options={[
            {
              label: '开启',
              value: 1,
            },
            {
              label: '关闭',
              value: 0,
            },
          ]}
        />
    </DrawerForm>
  );
};