import React, { useState, useEffect,useRef } from 'react';
import { Form, message, Button, Space,Spin} from 'antd';
import { updateSigninConfig,querySigninConfig } from '@/services/sign-activity-management/show-configuration';
import { PageContainer } from '@/components/PageContainer';
import ProForm, { ProFormRadio, ProFormText} from '@ant-design/pro-form';
import styles from './style.less'


const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 14 },
  layout: {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 14,
    },
  }
};

export default (props) => {
  const [form] = Form.useForm()
  const ref=useRef()
  const onsubmit = (values) => {
    updateSigninConfig(values).then(res=>{
      if(res.code==0){
        message.success('配置成功')
      }
    })
  }
  useEffect(()=>{
    querySigninConfig({}).then(res=>{
      form.setFieldsValue(res.data)
    })
  },[])
  return (
    <PageContainer>
      <ProForm
        form={form}
        {...formItemLayout}
        formRef={ref}
        submitter={
          {
            render: (props, defaultDoms) => {
              return [
                <Space className={styles.submit}>
                    <Button type="primary" key="submit" onClick={() => {
                      props.form?.submit?.()
                      }}>
                      保存
                    </Button>
                </Space>
              ];
            }
          }
        }
        onFinish={async (values) => {
            await onsubmit(values);
            return true;
        }
        }
        className={styles.switch_setting}
      >
        <ProFormRadio.Group
                name="value"
                label={<span className={styles.blod}>是否显示签到信息</span>}
                options={[
                    {
                        label:'不显示',
                        value: '0',
                    },
                    {
                        label: '显示',
                        value: '1',
                    },
                ]}
            />
        <ProFormText
          name="id"
          hidden
        />
      </ProForm >
      </PageContainer>
  );
};
