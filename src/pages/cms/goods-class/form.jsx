import React, { useRef, useEffect, useState } from 'react';
import { message, Form } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormRadio,
} from '@ant-design/pro-form';
import { goodsClassAdd, hideItem } from '@/services/cms/member/member';

export default (props) => {
  const { detailData, setVisible, onClose, visible, callback } = props;
  const formRef = useRef();
  const [title, setTitle] = useState('添加集约商品运营类目')
  const [form] = Form.useForm();
  const waitTime = (values) => {
    const { id } = detailData;
    const { categoryName, sort, isShow } = values;
    let api = id?hideItem:goodsClassAdd;
    const param = {
      id: id,
      categoryName: categoryName,
      isShow: isShow,
      sort: sort,
    }
    return new Promise((resolve, reject) => {
      api(param).then((res) => {
        if (res.code === 0) {
          callback();
          resolve(true);
        } else {
          reject(false);
        }
      })
    });
  };

  useEffect(() => {
    if (detailData?.id) {
      setTitle('编辑')
      const { ...rest } = detailData;
      form.setFieldsValue({
        ...rest
      })
    }
  }, [form, detailData])

  return (
    <ModalForm
      title={title}
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
        <ProFormText
          width="sm"
          name="categoryName"
          label="类目名称"
          rules={[{ required: true, message: '请输入排序序号' }]}  
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="sm"
          name="sort"
          label="显示序号"
          rules={[{ required: true, message: '请输入排序序号' }]}  
        />
      </ProForm.Group>
      <ProFormRadio.Group
          name="isShow"
          label="显示状态"
          initialValue={1}
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
      <ProFormText
        name="id"
        label="id"
        hidden
      />
    </ModalForm>
  );
};