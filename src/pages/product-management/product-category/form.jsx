import React, { useEffect } from 'react';
import { Form } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormSwitch,
  ProFormDigit
} from '@ant-design/pro-form';
import Big from 'big.js';
import * as api from '@/services/product-management/product-category'
import Upload from '@/components/upload'

export default (props) => {
  const { visible, setVisible, callback, data, id, type } = props;
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: { span: 6 },
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

  const submit = (values) => {
    return new Promise((resolve, reject) => {
      const apiMethod = type === 'add' ? api.categoryAdd : api.categoryEdit;
      const { comPercent, innerPercent, gcShow, ...rest } = values;
      const params = {
        ...rest,
        gcShow: gcShow ? 1 : 0,
      }

      if (type === 'add') {
        params.gcParentId = id
        params.comPercent = comPercent
        params.innerPercent = innerPercent
      } else {
        params.id = id;
      }

      apiMethod({
        ...params,
      }, { showSuccess: true, showError: true }).then(res => {
        if (res.code === 0) {
          resolve();
        } else {
          reject();
        }
      })
    });
  }

  useEffect(() => {
    if (data) {
      form?.setFieldsValue({
        ...data,
        comPercent: data.comPercentDisplay,
        innerPercent: data.innerPercentDisplay,
        gcShow: data.gcShow ? 1 : 0
      })
    }
  }, [form, data])

  return (
    <ModalForm
      title={type === 'edit' ? '编辑分类' : `添加${id === 0 ? '一' : '二'}级分类`}
      modalProps={{
      }}
      onVisibleChange={setVisible}
      visible={visible}
      width={550}
      form={form}
      onFinish={async (values) => {
        await submit(values);
        callback();
        return true;
      }}
      initialValues={{
        gcShow: true,
      }}
      {...formItemLayout}
    >
      <ProFormText
        label="分类名称"
        width="md"
        placeholder="请输入分类名称"
        rules={[
          { type: 'string', required: true, message: '分类名称长度应大于等于2个汉字，小于等于4个汉字', min: 2, max: 4 },
          () => ({
            validator(_, value) {
              if (/^[\u4e00-\u9fa5]{2,4}$/.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('分类名称只支持汉字'));
            },
          })
        ]}
        validateFirst={true}
        name="gcName"
        fieldProps={{
          maxLength: 4,
        }}
      />
      <Form.Item
        label="分类图片"
        name="gcIcon"
        rules={[{ required: true, message: '请上传分类图片' }]}
        tooltip={
          <dl>
            <dt>图片要求</dt>
            <dd>1.图片大小100kb以内</dd>
            <dd>2.图片比例1:1</dd>
            <dd>3.图片格式png/jpg/gif</dd>
          </dl>
        }
      >
        <Upload accept="image/*" dimension="1:1" size={100} />
      </Form.Item>
      <ProFormDigit
        placeholder="请输入佣金抽成"
        label="佣金抽成"
        name="comPercent"
        min={1}
        max={50}
        disabled={!!data}
        fieldProps={{
          formatter: value => value ? +new Big(value).toFixed(2) : value
        }}
        step
        rules={[{ required: true, message: '请输入佣金抽成' }]}
        extra={<><span style={{ color: 'red' }}>录入后固定不可编辑修改，谨慎操作</span><span style={{ position: 'absolute', right: 30, top: 5 }}>%</span></>}
      />
      <ProFormDigit
        placeholder="请输入内部店佣金抽成"
        label="内部店佣金抽成"
        name="innerPercent"
        min={1}
        max={50}
        disabled={!!data}
        fieldProps={{
          formatter: value => value ? +new Big(value).toFixed(2) : value
        }}
        step
        rules={[{ required: true, message: '请输入内部店佣金抽成' }]}
        extra={<><span style={{ color: 'red' }}>录入后固定不可编辑修改，谨慎操作</span><span style={{ position: 'absolute', right: 30, top: 5 }}>%</span></>}
      />
      <ProFormSwitch checkedChildren="开" unCheckedChildren="关" name="gcShow" label="状态" />
    </ModalForm >
  );
};