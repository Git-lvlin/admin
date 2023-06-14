import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Form, message, Space } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormSwitch,
  ProFormDependency,
  ProFormRadio,
} from '@ant-design/pro-form';
import { EditableProTable } from '@ant-design/pro-table';
import debounce from 'lodash/debounce';
import * as api from '@/services/product-management/front-category'
import Upload from '@/components/upload'
import styles from './form.less'
import Big from 'big.js';
import AptitudeCategory from '@/components/aptitude-category'

Big.RM = 0;


const FromWrap = ({ value, onChange, content, right }) => (
  <div style={{ display: 'flex' }}>
    <div>{content(value, onChange)}</div>
    <div style={{ flex: 1, marginLeft: 10, minWidth: 180 }}>{right(value)}</div>
  </div>
)

export default (props) => {
  const { visible, setVisible, callback, data, id, type, selectItem, parentId, level } = props;
  const [selectKeys, setSelectKeys] = useState([]);
  const [form] = Form.useForm();
  const [formRef] = Form.useForm();
  const ref = useRef();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    layout: {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 20,
      },
    }
  };

  const submit = (values) => {
    return new Promise((resolve, reject) => {
      if(type === 'edit') {
        api.categoryAppEdit({
          ...values,
          relCategory: values.relCategory?.join?.(','),
          gcShow: 1,
          id,
          gcParentId: data.gcParentId
        }, {showSuccess: true}).then(res => {
          if(res.code === 0) {
            resolve()
          } else {
            reject()
          }
        })
      } else {
        api.categoryAppAdd({
          ...values,
          id: 0,
          gcShow: 1,
          relCategory: values.relCategory?.join?.(','),
          gcParentId: parentId
        }, {showSuccess: true}).then(res => {
          if(res.code === 0) {
            resolve()
          } else {
            reject()
          }
        })
      }
    });
  }

  const debounceValidate = useMemo(() => {
    const validate = () => {
      formRef.validateFields()
    };
    return debounce(validate, 1000);
  }, []);

  useEffect(() => {
    if (data) {
      const arr = data.relCategory.split(',')
      const newArr = arr.map(res=> Number(res))
      form?.setFieldsValue({
        gcName: data.gcName,
        gcIcon: data.gcIcon,
        relCategory: newArr
      })
    }
  }, [data])

  return (
    <ModalForm
      title={type === 'edit' ? '编辑分类' : `添加${id === 0 ? '一' : '二'}级分类`}
      modalProps={{
      }}
      onVisibleChange={setVisible}
      visible={visible}
      width={800}
      form={form}
      onFinish={async (values) => {
        await submit(values);
        callback();
        return true
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
      >
        <FromWrap
          content={(value, onChange) => <Upload value={value} onChange={onChange} accept="image/*" dimension="1:1" size={100} code={216} />}
          right={() => {
            return (
              <dl>
                <dt>图片要求</dt>
                <dd>1.图片大小100kb以内</dd>
                <dd>2.图片比例1:1</dd>
                <dd>3.图片格式png/jpg/gif</dd>
              </dl>
            )
          }}
        />
      </Form.Item>
      {
        level === 2 &&
        <Form.Item
          label='映射后台商品分类'
          name='relCategory'
          rules={[{ required: true, message: '请选择映射后台商品分类' }]}
        >
          <AptitudeCategory
            renderExtraFooter={()=> <div style={{padding: '10px'}}>已选条件：最多可以选择30个分类</div>}
            style={{ width: 470 }}
            searchable={false}
            maxLength={30}
            height={140}
          />
        </Form.Item>
      }
    </ModalForm >
  );
};