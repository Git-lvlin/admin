import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Form, message } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormSwitch,
  ProFormDependency,
  ProFormRadio,
} from '@ant-design/pro-form';
// import { amountTransform } from '@/utils/utils'
import { EditableProTable } from '@ant-design/pro-table';
import debounce from 'lodash/debounce';
import * as api from '@/services/product-management/product-category'
import Upload from '@/components/upload'
import styles from './form.less'
import Big from 'big.js';
import  ReactQuill,{ Quill }  from 'react-quill';
import QuillEmoji from 'quill-emoji'
import 'react-quill/dist/quill.snow.css';

Big.RM = 0;

Quill.register({
  'modules/emoji-toolbar': QuillEmoji.ToolbarEmoji,
  'modules/emoji-shortname': QuillEmoji.ShortNameEmoji
})


const FromWrap = ({ value, onChange, content, right }) => (
  <div style={{ display: 'flex' }}>
    <div>{content(value, onChange)}</div>
    <div style={{ flex: 1, marginLeft: 10, minWidth: 180 }}>{right(value)}</div>
  </div>
)

const freshType = {
  0: '非生鲜类目',
  1: '精装生鲜类目',
  2: '散装生鲜类目'
}

export default (props) => {
  const { visible, setVisible, callback, data, id, type, selectItem, parentId } = props;
  const [form] = Form.useForm();
  const [formRef] = Form.useForm();
  const ref = useRef();
  const [dataSource, setDataSource] = useState([
    { name: '五星店主', level: 5, shopCommission: 75, operateCommission: 23, referrerCommission: 2, platForm: 0 },
    { name: '四星店主', level: 4, shopCommission: 75, operateCommission: 23, referrerCommission: 2, platForm: 0 },
    { name: '三星店主', level: 3, shopCommission: 75, operateCommission: 23, referrerCommission: 2, platForm: 0 },
    { name: '二星店主', level: 2, shopCommission: 75, operateCommission: 23, referrerCommission: 2, platForm: 0 },
    { name: '一星店主', level: 1, shopCommission: 75, operateCommission: 23, referrerCommission: 2, platForm: 0 },
  ])
  const [dataSource2] = useState([
    { name: '一星店主', level: 6, operateCommission: 45, referrerCommission: 3, platForm: 52 },
  ])
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

  const columns = [
    {
      title: '社区店等级',
      dataIndex: 'name',
      valueType: 'text',
      editable: false,
    },
    {
      title: '社区店提成',
      dataIndex: 'shopCommission',
      valueType: 'text',
      fieldProps: {
        addonAfter: '%',
      },
      formItemProps: (_, record) => {
        return {
          rules: [
            {
              required: true,
              whitespace: true,
              message: '社区店提成是必填项',
              transform: (v) => `${v}`
            },
            {
              pattern: /^((0)|([1-9][0-9]*))$/,
              message: '社区店提成只能正整数',
              transform: (v) => `${v}`
            },
            {
              message: '本行数据之和不能大于100%',
              transform: (v) => `${v}`,
              validator() {
                if (record.entry.platForm >= 0) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error());
              },
            }
          ],
        }
      },
    },
    {
      title: '运营中心提成',
      dataIndex: 'operateCommission',
      valueType: 'text',
      fieldProps: {
        addonAfter: '%',
      },
      formItemProps: (_, record) => {
        return {
          rules: [
            {
              required: true,
              whitespace: true,
              message: '运营中心提成是必填项',
              type: 'string',
              transform: (v) => `${v}`
            },
            {
              pattern: /^((0)|([1-9][0-9]*))$/,
              message: '运营中心提成只能正整数',
              type: 'string',
              transform: (v) => `${v}`
            },
            {
              message: '本行数据之和不能大于100%',
              type: 'string',
              validator() {
                if (record.entry.platForm >= 0) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error());
              },
              transform: (v) => `${v}`
            }
          ],
        }
      },
    },
    {
      title: '推荐人提成',
      dataIndex: 'referrerCommission',
      valueType: 'text',
      fieldProps: {
        addonAfter: '%',
      },
      formItemProps: (_, record) => {
        return {
          rules: [
            {
              required: true,
              whitespace: true,
              message: '推荐人提成是必填项',
              type: 'string',
              transform: (v) => `${v}`
            },
            {
              pattern: /^((0)|([1-9][0-9]*))$/,
              message: '推荐人提成只能正整数',
              type: 'string',
              transform: (v) => `${v}`
            },
            {
              message: '本行数据之和不能大于100%',
              type: 'string',
              validator() {
                if (record.entry.platForm >= 0) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error());
              },
              transform: (v) => `${v}`
            }
          ],
        }
      },
    },
    {
      title: '平台额外收益',
      dataIndex: 'platForm',
      valueType: 'text',
      render: (_) => `${_}%`,
      editable: false,
    },
  ]

  const columns2 = [
    {
      title: '运营中心提成',
      dataIndex: 'operateCommission',
      valueType: 'text',
      fieldProps: {
        addonAfter: '%',
      },
      formItemProps: (_, record) => {
        return {
          rules: [
            {
              required: true,
              whitespace: true,
              message: '运营中心提成是必填项',
              type: 'string',
              transform: (v) => `${v}`
            },
            {
              pattern: /^((0)|([1-9][0-9]*))$/,
              message: '运营中心提成只能正整数',
              type: 'string',
              transform: (v) => `${v}`
            },
            {
              message: '平台额外收益必须大于0',
              type: 'string',
              validator() {
                if (record.entry.platForm > 0) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error());
              },
              transform: (v) => `${v}`
            }
          ],
        }
      },
    },
    {
      title: '推荐人提成',
      dataIndex: 'referrerCommission',
      valueType: 'text',
      fieldProps: {
        addonAfter: '%',
      },
      formItemProps: (_, record) => {
        return {
          rules: [
            {
              required: true,
              whitespace: true,
              message: '推荐人提成是必填项',
              type: 'string',
              transform: (v) => `${v}`
            },
            {
              pattern: /^((0)|([1-9][0-9]*))$/,
              message: '推荐人提成只能正整数',
              type: 'string',
              transform: (v) => `${v}`
            },
            {
              message: '平台额外收益必须大于0',
              type: 'string',
              validator() {
                if (record.entry.platForm > 0) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error());
              },
              transform: (v) => `${v}`
            }
          ],
        }
      },
    },
    {
      title: '平台额外收益',
      dataIndex: 'platForm',
      valueType: 'text',
      render: (_) => `${_}%`,
      editable: false,
    },
  ]

  const submit = (values) => {
    return new Promise((resolve, reject) => {
      formRef.validateFields()
        .then(_ => {   
          const apiMethod = type === 'add' ? api.categoryAdd : api.categoryEdit;
          const { gcShow, shopValue,gcRemark, ...rest } = values;
          const convertedContent = gcRemark&&gcRemark.replace(/<(\w+)\s+[^>]*class="([^"]+)"[^>]*>/g, (match, p1, p2) => {
            let newTag = `<${p1} style="`;
            const styles = p2.split(' ');
            styles.forEach(style => {
              // 根据需要将class转换为相应的inline-style
              if (style === 'ql-align-right') {
                newTag += 'text-align:right;';
              }else if(style === 'ql-align-center'){
                newTag += 'text-align:center;';
              }
              // 还可以添加其他的class到inline-style的转换
            });
            newTag += '">';
            return newTag;
        });
        
          const params = {
            ...rest,
            gcShow: gcShow ? 1 : 0,
            gcRemark:convertedContent&&`<!DOCTYPE html><html lang="en"><head><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" /></head><body>${convertedContent}</body></html>`
          }

          if (type === 'add') {
            params.gcParentId = id
            // params.comPercent = comPercent
            // params.innerPercent = innerPercent
          } else {
            params.id = id;
            params.fresh = data.fresh;
          }

          if (parentId !== 0) {
            params.fresh = selectItem.fresh;
          }

          if (params.fresh === 2) {
            params.commission = shopValue[0]
          } else {
            params.shopValue = shopValue;
          }

          apiMethod({
            ...params,
          }, { showSuccess: true, showError: true }).then(res => {
            if (res.code === 0) {
              setVisible(false)
              resolve();
            } else {
              reject();
            }
          })
        })
        .catch(_ => {
          message.error(_.errorFields[0].errors[0])
          reject();
        })

    });
  }

  const debounceValidate = useMemo(() => {
    const validate = () => {
      formRef.validateFields()
    };
    return debounce(validate, 1000);
  }, []);

  const modules={
    toolbar:{
      container:[
        [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ 'font': [] }],
        [{ 'header': 1 }, { 'header': 2 }],        // custom button values
        ['bold', 'italic', 'underline', 'strike'],    // toggled buttons
        [{'align': ['', 'center', 'right', 'justify']}],
        [{ 'indent': '-1' }, { 'indent': '+1' }],     // outdent/indent
        [{ 'direction': 'rtl' }],             // text direction
        [{ 'script': 'sub' }, { 'script': 'super' }],   // superscript/subscript
        ['blockquote', 'code-block'],
      
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'color': [] }, { 'background': [] }],
        ['emoji', 'link'],
      
        ['clean']
      ],
    },
    'emoji-toolbar': true,
    'emoji-shortname': true,
  }

  useEffect(() => {
    if (data) {
      form?.setFieldsValue({
        ...data,
        shopValue: data.fresh === 1 ? data.shopValue : [{ ...data.commission, level: 6 }],
        // shopValue: data.shopValue.map(item => {
        //   return {
        //     ...item,
        //     shopCommission: +item.shopCommission,
        //     operateCommission: +item.operateCommission,
        //     referrerCommission: +item.referrerCommission,
        //     platForm: +item.platForm,
        //   }
        // }),
        gcShow: data.gcShow ? 1 : 0
      })
    } else {
      if (selectItem?.fresh === 2) {
        form?.setFieldsValue({
          shopValue: dataSource2
        })
      } else {
        form?.setFieldsValue({
          shopValue: dataSource
        })
      }
    }
    // console.log('json',json)
  }, [form, data])

  return (
    <ModalForm
      title={type === 'edit' ? '编辑分类' : `添加${id === 0 ? '一' : '二'}级分类`}
      modalProps={{
      }}
      onVisibleChange={setVisible}
      visible={visible}
      width={1050}
      form={form}
      onFinish={async (values) => {
        await submit(values);
        callback();
      }}
      onChange={() => {
        // form.validateFields()
      }}
      initialValues={{
        gcShow: true,
        fresh: 0,
        // shopValue: dataSource,
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
      <Form.Item
        label="分类商品说明"
        name="gcRemark"
        placeholder='请输入分类商品的说明，最多可输入1000个字！'
        rules={[
          {
            max: 1000,
            message: "最多只能输入1000个字符"
          }
        ]}
      >
        <ReactQuill modules={modules} ref={ref}/>
      </Form.Item>
    </ModalForm >
  );
};