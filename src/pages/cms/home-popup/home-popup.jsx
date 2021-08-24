import React, { useRef, useEffect, useState } from 'react';
import { Button, Form, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import Upload from '@/components/upload';
import ProForm, { ProFormText, ProFormDateTimeRangePicker, ProFormRadio } from '@ant-design/pro-form';
import { getAppPopup, homePopupUpdate } from '@/services/cms/member/member';

const HomePopup = () => {
  const [form] = Form.useForm();
  const formRef = useRef();
  const [popupInfo, setPopupInfo] = useState(false);

  useEffect(() => {
    if (!popupInfo) {
      getAppPopup().then((res) => {
        if (res.code === 0 && res.data) {
          const {img, link, status, endTime, startTime, id} = res.data
          form.setFieldsValue({
            timeReg: [startTime, endTime],
            img,
            link,
            status,
            id,
          })
        }
      })
    }
  }, [])
  
  const submit = (param) => {
    homePopupUpdate(param).then(res=> {
      if (res.code === 0) {
        message.success('保存成功');
      }
    })
  }
  return (
    <PageContainer
      header={{
        title: 'APP弹窗',
        ghost: true,
      }}
      footer={[
        <Button key="1" type="primary" onClick={form.submit}>
          保存
        </Button>,
      ]}
    >
      <ProForm
        formRef={formRef}
        form={form}
        onFinish={
          (res) => {
            const { id, img, link, status, timeReg } = res
            const param = {
              id,
              img,
              link,
              status,
              startTime: timeReg[0],
              endTime: timeReg[1],
            }
            submit(param)
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
                  <dd>尺寸-375*445</dd>
                  <dd>大小-2MB以内</dd>
                  <dd>格式-png/jpg/gif</dd>
                </dl>
              }
            >
              <Upload multiple maxCount={1} size={2048} proportion={{width: 375,height: 445,}} />
              {/* <Upload multiple maxCount={1} /> */}
            </Form.Item>
          </ProCard>

          <ProCard layout="" bordered>
            <ProForm.Group>
              <ProFormDateTimeRangePicker rules={[{ required: true, message: '请选择有效时间' }]} name="timeReg" label="日期时间区间" />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText
                name="link"
                label="跳转链接"
                placeholder="请输入点击弹窗跳转的链接地址，不超过80个字符"
              />
            </ProForm.Group>
            <ProFormRadio.Group
              name="status"
              label="状态"
              initialValue={0}
              rules={[{ required: true, message: '请选择状态' }]}
              options={[
                {
                  label: '开启',
                  value: 1,
                },
                {
                  label: '关闭',
                  value: 2,
                },
              ]}
            />

            <ProForm.Group>
              开启后才会在用户端显示
            </ProForm.Group>
            <ProFormText
              name="id"
              label="id"
              hidden
            />
          </ProCard>
        </ProCard>
      </ProCard>
      </ProForm>

    </PageContainer>
  )
}

export default HomePopup
