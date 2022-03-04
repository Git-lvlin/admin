import React, { useEffect, useState, useMemo } from 'react';
import { Form, message } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormSwitch,
  ProFormDependency,
} from '@ant-design/pro-form';
// import { amountTransform } from '@/utils/utils'
import { EditableProTable } from '@ant-design/pro-table';
import debounce from 'lodash/debounce';
import * as api from '@/services/product-management/product-category'
import Upload from '@/components/upload'
import styles from './form.less'

const FromWrap = ({ value, onChange, content, right }) => (
  <div style={{ display: 'flex' }}>
    <div>{content(value, onChange)}</div>
    <div style={{ flex: 1, marginLeft: 10, minWidth: 180 }}>{right(value)}</div>
  </div>
)

export default (props) => {
  const { visible, setVisible, callback, data, id, type, selectItem, parentId } = props;
  const [form] = Form.useForm();
  const [formRef] = Form.useForm();
  const [dataSource] = useState([
    { name: '五星店主', level: 5, shopCommission: 60, operateCommission: 15, referrerCommission: 5, platForm: 20 },
    { name: '四星店主', level: 4, shopCommission: 60, operateCommission: 15, referrerCommission: 5, platForm: 20 },
    { name: '三星店主', level: 3, shopCommission: 60, operateCommission: 15, referrerCommission: 5, platForm: 20 },
    { name: '二星店主', level: 2, shopCommission: 60, operateCommission: 15, referrerCommission: 5, platForm: 20 },
    { name: '一星店主', level: 1, shopCommission: 60, operateCommission: 15, referrerCommission: 5, platForm: 20 },
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
              pattern: /^((0)|([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
              message: '社区店提成只能是数字，并且最多保留两位小数',
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
              pattern: /^((0)|([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
              message: '运营中心提成只能是数字，并且最多保留两位小数',
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
              pattern: /^((0)|([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
              message: '推荐人提成只能是数字，并且最多保留两位小数',
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

  const submit = (values) => {
    return new Promise((resolve, reject) => {
      formRef.validateFields()
        .then(_ => {
          const apiMethod = type === 'add' ? api.categoryAdd : api.categoryEdit;
          const { fresh, gcShow, ...rest } = values;
          const params = {
            ...rest,
            gcShow: gcShow ? 1 : 0,
            fresh: fresh ? 1 : 0,
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

          apiMethod({
            ...params,
          }, { showSuccess: true, showError: true }).then(res => {
            if (res.code === 0) {
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

  useEffect(() => {
    if (data) {
      form?.setFieldsValue({
        ...data,
        // shopValue: data.shopValue.map(item => {
        //   return {
        //     ...item,
        //     shopCommission: amountTransform(item.shopCommission),
        //     operateCommission: amountTransform(item.operateCommission),
        //     referrerCommission: amountTransform(item.referrerCommission),
        //     platForm: amountTransform(item.platForm),
        //   }
        // }),
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
      width={1050}
      form={form}
      onFinish={async (values) => {
        await submit(values);
        callback();
        return true;
      }}
      onChange={() => {
        // form.validateFields()
      }}
      initialValues={{
        gcShow: true,
        shopValue: dataSource,
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
        parentId !== 0
          ?
          <Form.Item
            label='是否为生鲜类目'
            colon={false}
          >
            {selectItem.fresh === 1 ? '是' : '否'}
          </Form.Item>
          :
          <>
            {type === 'add'
              ? <ProFormSwitch
                checkedChildren="是"
                unCheckedChildren="否"
                name="fresh"
                label="是否为生鲜类目"
                extra={<span style={{ color: 'red' }}>一经提交成功，后续不可修改</span>}
              />
              : <Form.Item
                label='是否为生鲜类目'
                colon={false}
              >
                {data.fresh === 1 ? '是' : '否'}
              </Form.Item>
            }
          </>
      }
      <ProFormDependency name={['fresh']}>
        {({ fresh }) => {
          return (
            (fresh || (parentId !== 0 && selectItem.fresh === 1))
              ? <div className={styles.shopValue}>
                <Form.Item
                  label='生鲜商品集约各方的分佣比例'
                  name="shopValue"
                  rules={[{ required: true }]}
                >
                  <EditableProTable
                    columns={columns}
                    rowKey="level"
                    value={dataSource}
                    search={false}
                    editable={{
                      form: formRef,
                      editableKeys: [1, 2, 3, 4, 5],
                      onValuesChange: (record, recordList) => {
                        form.setFieldsValue({
                          shopValue: recordList.map(item => ({ ...item, platForm: 100 - item.shopCommission - item.operateCommission - item.referrerCommission }))
                        })
                        debounceValidate();
                      }
                    }}
                    bordered
                    recordCreatorProps={false}
                    tableAlertRender={false}
                  />
                </Form.Item>
                {type ==='edit'&&<Form.Item
                  label='生鲜分类商品总分佣比例'
                >
                  {data?.freshCommission}%
                </Form.Item>}
              </div>
              :
              <>
                {type === 'add' && <Form.Item
                  label=' '
                  colon={false}
                >
                  非生鲜分类的商品按集约店铺等级的佣金配置进行各方的提成分佣
                </Form.Item>}
              </>
          )
        }}
      </ProFormDependency>




      {/* <ProFormDigit
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
        max={100}
        disabled={!!data}
        fieldProps={{
          formatter: value => value ? +new Big(value).toFixed(2) : value
        }}
        step
        rules={[{ required: true, message: '请输入内部店佣金抽成' }]}
        extra={<><span style={{ color: 'red' }}>录入后固定不可编辑修改，谨慎操作</span><span style={{ position: 'absolute', right: 30, top: 5 }}>%</span></>}
      /> */}
      <Form.Item
        label="基础销量取值范围"
      >
        <ProFormDependency name={['virtualStart', 'virtualEnd']}>
          {
            ({ virtualStart, virtualEnd }) => (
              <div style={{ display: 'flex' }}>
                <ProFormText
                  name="virtualStart"
                  fieldProps={{ style: { width: 135 }, maxLength: 6 }}
                  dependencies={['virtualEnd']}
                  rules={[
                    () => ({
                      validator(_, value) {
                        if (!/^\d{1,6}$/.test(value)) {
                          return Promise.reject(new Error('请输入大于0小于999999的数字'));
                        }
                        if (+value >= +virtualEnd && virtualEnd) {
                          return Promise.reject(new Error('销量取值范围不合理，请重填'));
                        }
                        return Promise.resolve();
                      },
                    })
                  ]}
                />
                <span style={{ position: 'relative', top: 3 }}>&nbsp;到&nbsp;</span>
                <ProFormText
                  name="virtualEnd"
                  dependencies={['virtualStart']}
                  fieldProps={{ style: { width: 135 }, maxLength: 6 }}
                  rules={[
                    () => ({
                      validator(_, value) {

                        if (!/^\d{1,6}$/.test(value)) {
                          return Promise.reject(new Error('请输入大于0小于999999的数字'));
                        }
                        if (+value <= +virtualStart && virtualStart) {
                          return Promise.reject(new Error('销量取值范围不合理，请重填'));
                        }
                        return Promise.resolve();
                      },
                    })
                  ]}
                />
              </div>
            )
          }
        </ProFormDependency>

      </Form.Item>
      <ProFormSwitch checkedChildren="开" unCheckedChildren="关" name="gcShow" label="开启状态" />
    </ModalForm >
  );
};