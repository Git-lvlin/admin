import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import {
  ModalForm,
  ProFormRadio,
  ProFormTextArea,
  ProFormDependency,
  ProFormText,
  ProFormCheckbox,
  ProFormDateRangePicker
} from '@ant-design/pro-form';
import { openSubscribe, closeSubscribe, getSubscribeList } from '@/services/intensive-store-management/store-list';
import md5 from 'blueimp-md5'
import { amountTransform } from '@/utils/utils'
import moment from 'moment'

const codeName = ['预约系统', '健康档案', '充值系统']
export default (props) => {
  const { visible, setVisible, callback, data } = props;
  const [hasAccount, setHasAccount] = useState(false);
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

  useEffect(() => {
    getSubscribeList({ storeNo: data.storeNo })
      .then(res => {
        if (res.code === 0) {
          if (res.data.length) {
            setHasAccount(res.data)
            const d1 = res.data.find(item => item.actionId === 10001);
            const d2 = res.data.find(item => item.actionId === 10002);
            const d3 = res.data.find(item => item.actionId === 10003);
            form.setFieldsValue({
              account: res.data[0].account,
              subscribeList: [
                {
                  checked: d1.statusAccount === 1,
                  actionId: 10001,
                  name: '预约系统',
                  useful: d1 ? [d1.usefulStart * 1000, d1.usefulEnd * 1000] : '',
                  payment: d1 ? amountTransform(d1.payment, '/') : '',
                },
                {
                  checked: d2.statusAccount === 1,
                  actionId: 10002,
                  name: '健康档案',
                  useful: d2 ? [d2?.usefulStart * 1000, d2?.usefulEnd * 1000] : '',
                  payment: d2 ? amountTransform(d2.payment, '/') : '',
                },
                {
                  checked: d3.statusAccount === 1,
                  actionId: 10003,
                  name: '充值系统',
                  useful: d3 ? [d3?.usefulStart * 1000, d3?.usefulEnd * 1000] : '',
                  payment: d3 ? amountTransform(d3.payment, '/') : '',
                }
              ]
            })
          }
        }
      })
  }, [])

  const submit = (values) => {
    const { subscribeList, password, statusAction, aaa, ...rest } = values;
    const obj = {}
    if (password) {
      obj.password = md5(password)
    }
    obj.subscribeList = subscribeList.map(item => ({ ...item, usefulStart: moment(item?.useful?.[0]).format('YYYY-MM-DD'), usefulEnd: moment(item?.useful?.[1]).format('YYYY-MM-DD'), payment: amountTransform(item.payment) })).filter(item => item.checked)
    return new Promise((resolve, reject) => {
      const apiMethod = statusAction === 1 ? openSubscribe : closeSubscribe
      apiMethod({
        storeNo: data.storeNo,
        statusAction,
        ...obj,
        ...rest,
      }, { showSuccess: true }).then(res => {
        if (res.code === 0) {
          resolve()
        } else {
          reject()
        }
      })
    });
  }

  return (
    <ModalForm
      title={`操作店主PC后台`}
      onVisibleChange={setVisible}
      visible={visible}
      width={750}
      form={form}
      onFinish={async (values) => {
        try {
          await submit(values);
          callback();
          return true;
        } catch (error) {
          console.log('error', error)
        }
      }}
      modalProps={{
        forceRender: true,
        destroyOnClose: true,
        onCancel: () => {
          setVisible(false)
        }
      }}
      initialValues={{
        aaa: 1,
        statusAction: 1,
        statusSystem: 1,
        subscribeList: [
          {
            checked: false,
            actionId: 10001,
            name: '预约系统'
          },
          {
            checked: false,
            actionId: 10002,
            name: '健康档案'
          },
          {
            checked: false,
            actionId: 10003,
            name: '充值系统'
          }
        ]
      }}
      {...formItemLayout}
    >
      <ProFormRadio.Group
        name="statusAction"
        label="操作类型"
        rules={[{ required: true }]}
        options={[
          {
            label: '开通',
            value: 1,
          },
          {
            label: '注销(店主端和用户端隐藏对应系统)',
            value: 2,
          }
        ]}
        fieldProps={{
          onChange: (e) => {
            if (hasAccount) {
              const { value } = e.target
              const d1 = hasAccount.find(item => item.actionId === 10001);
              const d2 = hasAccount.find(item => item.actionId === 10002);
              const d3 = hasAccount.find(item => item.actionId === 10003);
              form.setFieldsValue({
                subscribeList: [
                  {
                    checked: d1.statusAccount === value,
                    actionId: 10001,
                    name: '预约系统',
                    useful: d1 ? [d1.usefulStart * 1000, d1.usefulEnd * 1000] : '',
                    payment: d1 ? amountTransform(d1.payment, '/') : '',
                  },
                  {
                    checked: d2.statusAccount === value,
                    actionId: 10002,
                    name: '健康档案',
                    useful: d2 ? [d2?.usefulStart * 1000, d2?.usefulEnd * 1000] : '',
                    payment: d2 ? amountTransform(d2.payment, '/') : '',
                  },
                  {
                    checked: d3.statusAccount === value,
                    actionId: 10003,
                    name: '充值系统',
                    useful: d3 ? [d3?.usefulStart * 1000, d3?.usefulEnd * 1000] : '',
                    payment: d3 ? amountTransform(d3.payment, '/') : '',
                  }
                ]
              })
            }
          }
        }}
      />
      <ProFormDependency name={['statusAction', 'subscribeList']}>
        {({ statusAction, subscribeList }) => {
          return (
            <>
              <Form.Item
                label="操作对象"
                rules={[{ required: true }]}
                name="aaa"
              >
                <Form.List name="subscribeList">
                  {(fields) => (
                    <>
                      {fields.map(({ name }) => {
                        return (
                          <div>
                            <ProFormCheckbox name={[name, 'checked']}>{codeName[name]}</ProFormCheckbox>
                            <ProFormDateRangePicker
                              disabled={statusAction === 2}
                              name={[name, 'useful']}
                              label="开通时段"
                              width="100%"
                              fieldProps={{
                                disabledDate: (currentDate) => { return +currentDate < +new Date() && new Date(+currentDate).getDate() !== new Date().getDate() },
                              }}
                              rules={[{ required: subscribeList[name].checked, message: '请选择开通时段' }]}
                            />
                            <ProFormText
                              name={[name, 'actionId']}
                              hidden
                            />
                            {statusAction === 1 && <ProFormText
                              name={[name, 'payment']}
                              label="已缴费用"
                              fieldProps={{
                                placeholder: '请输入开通费用,可输0.00至999999.99',
                                addonAfter: '元'
                              }}
                              rules={[
                                { required: subscribeList[name].checked, message: '请输入开通费用' },
                                () => ({
                                  required: subscribeList[name].checked,
                                  validator(_, v) {
                                    if (`${v}`?.split?.('.')?.[1]?.length > 2 && v !== '' && v !== undefined) {
                                      return Promise.reject(new Error('只能保留两位小数'));
                                    }
                                    return Promise.resolve();
                                  },
                                })
                              ]}
                            />}
                          </div>
                        )
                      })}
                    </>
                  )}
                </Form.List>
              </Form.Item>
              {statusAction === 1 && <>
                <ProFormText
                  label="登录账号"
                  name="account"
                  fieldProps={{
                    placeholder: '请输入店主PC端后台的登录账号',
                    autoComplete: 'new-password'
                  }}
                  rules={[
                    { required: true, message: '登录账号应不少于5个字符，不超过20个字符', min: 5, max: 20 }
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  label="登录密码"
                  fieldProps={{
                    placeholder: '请输入店主PC端后台的登录密码',
                    autoComplete: 'new-password'
                  }}
                  rules={[
                    { required: !hasAccount, message: '密码应不少于8个字符，不超过20个字符', min: 8, max: 20 }
                  ]}
                />
                {/* <ProFormRadio.Group
                  name="statusSystem"
                  label="PC后台状态"
                  rules={[{ required: true, message: '请选择操作' }]}
                  options={[
                    {
                      label: '开启全部权限',
                      value: 1,
                    },
                    {
                      label: '关闭编辑权限(含店主端和用户端)',
                      value: 2,
                    }
                  ]}
                /> */}
              </>}

            </>
          )
        }}
      </ProFormDependency>

      <ProFormTextArea
        name="explain"
        label="操作说明"
        placeholder="请输入至少5至30个字符"
        // rules={[
        //   { required: true, message: '请输入操作说明' },
        // ]}
        fieldProps={{
          maxLength: 30,
        }}
      />

    </ModalForm >
  );
};