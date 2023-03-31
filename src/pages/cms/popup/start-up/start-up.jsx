import { useRef, useEffect, useState } from 'react';
import { Button, Form, message, Drawer } from 'antd';
import ProCard from '@ant-design/pro-card';
import Upload from '@/components/upload';
import ProForm, { ProFormText, ProFormDigit, ProFormRadio, ProFormDateTimePicker } from '@ant-design/pro-form';
import { adimgUpdate,adimgAdd } from '@/services/cms/member/member';
import moment from 'moment';

const HomePopup = ({visible, setVisible, callback, msgDatail}) => {
  const [form] = Form.useForm();
  const formRef = useRef();

  useEffect(() => {
    if(msgDatail?.id){
      form.setFieldsValue({
        ...msgDatail
      })
    }
  }, [])

  const submit = (param) => {
    const api=msgDatail?.id?adimgUpdate:adimgAdd
    api({...param,type:1}).then(res => {
      if (res.code === 0) {
        message.success(msgDatail?.id?'修改成功':'保存成功');
        setVisible(false)
        callback()
      }
    })
  }
  const disabledDate=(current)=>{
    return current && current < moment().startOf('day');
  }
  return (
     <Drawer
      placement="right"
      width={1200}
      onClose={() => setVisible(false)}
      visible={visible}
      footer={false}
      >
      <ProForm
        formRef={formRef}
        form={form}
        onFinish={
          (res) => {
            submit(res)
          }
        }
        submitter={{
          resetButtonProps: {
            style: {
              display: 'none',
            },
          },
          submitButtonProps: {
            style: {
              display: 'none',
            },
          },
        }}
      >
        <ProCard direction="column" ghost gutter={[0, 16]}>
          <ProCard style={{ marginTop: 8 }} gutter={8} title="">
            <ProCard
              colSpan={{
                xs: '50px',
                sm: '100px',
                md: '200px',
                lg: '300px',
                xl: '400px',
              }}
              layout="center"
              bordered
            >
              <Form.Item
                label="添加图片"
                name="img"
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
                    <dd>尺寸-375*812</dd>
                    <dd>大小-5MB以内</dd>
                    <dd>格式-png/jpg/gif</dd>
                  </dl>
                }
              >
                <Upload multiple maxCount={1} size={5120} proportion={{ width: 375, height: 812, }} />
                {/* <Upload multiple maxCount={1} /> */}
              </Form.Item>
            </ProCard>

            <ProCard layout="" bordered>
              <ProFormDigit
                name="stayTime"
                width={350}
                label="停留时间(秒)"
                rules={[{ 
                  required: true, 
                  message: '请输入1-15之间的停留秒数 整数',
                  pattern: /^[1-9]$|^1[0-5]$/,
                }]}
                placeholder="请输入1-15之间的停留秒数 整数"
              />
              <ProFormText
                width={350}
                name="link"
                label="跳转链接"
                placeholder="请输入点击弹窗跳转的链接地址，不超过80个字符"
                rules={[
                  () => ({
                    required: false,
                    validator(_, value) {
                      if (/\s/g.test(value)) {
                        return Promise.reject(new Error('链接不能包含空格'));
                      }
                      return Promise.resolve();
                    },
                  })
                ]}
                fieldProps={{
                  maxLength: 80
                }}
              />
              <ProFormText
                name="name"
                width={350}
                label="名称"
                placeholder="输入名称，最多可输入8个字"
                rules={[{ required: true, message: '请输入名称' }]}
                fieldProps={{
                  maxLength: 8
                }}
              />
              <ProFormDateTimePicker
                label='开始时间'
                rules={[{ required: true, message: '请选择限领时间' }]}
                name="startTime"
                width={350}
                fieldProps={{
                  disabledDate:(current)=>disabledDate(current)
                }}
              />
              <ProFormDateTimePicker
                label='结束时间'
                rules={[{ required: true, message: '请选择限领时间' }]}
                name="endTime"
                width={350}
                fieldProps={{
                  disabledDate:(current)=>disabledDate(current)
                }}
              />
              <ProFormRadio.Group
                name="status"
                label="状态"
                initialValue={0}
                rules={[{ required: true, message: '请选择状态' }]}
                options={[
                  {
                    label: '启用',
                    value: 1,
                  },
                  {
                    label: '关闭',
                    value: 2,
                  },
                ]}
              />

              <ProForm.Group>
                要设置启用状态才会在指定的时间内生效
              </ProForm.Group>
              <ProFormText
                name="id"
                label="id"
                hidden
              />
              <Button key="1" type="primary" onClick={form.submit} style={{ marginTop:'20px' }}>
                保存
              </Button>
            </ProCard>
          </ProCard>
        </ProCard>
      </ProForm>
    </Drawer>
  )
}

export default HomePopup
