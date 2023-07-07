import { useEffect,useRef } from 'react';
import { Form, message, Button, Space } from 'antd';
import { editConfig, getConfig } from '@/services/product-performance-management/early-screening-service-configuration';
import { PageContainer } from '@/components/PageContainer';
import ProForm, { ProFormText  } from '@ant-design/pro-form';
import styles from './style.less'

export default () => {
  const [form] = Form.useForm()
  const ref=useRef()
  const onsubmit = (values) => {
    editConfig(values).then(res=>{
      if(res.code==0){
        message.success('配置成功')
      }
    })
  }
  useEffect(()=>{
    getConfig({}).then(res=>{
      form.setFieldsValue(res.data)
    })
  },[])
  const validateLadderConfig = (rule, value) => {
    return new Promise<void>(async (resolve, reject) => {
      if (value&&value<30||value>180) {
          await reject('30-180之间整数')
      }else if (value&&value.length>0&&!/^[0-9]*[1-9][0-9]*$/.test(value)&&value!=0) {
          await reject('只能输入整数')
      }else {
          await resolve()
      }
      })
  };
  return (
    <PageContainer>
      <ProForm
        form={form}
        layout='horizontal'
        formRef={ref}
        submitter={
          {
            render: (props, defaultDoms) => {
              return [
                <Space className={styles.submit}>
                    <Button type="primary" key="submit" onClick={() => {
                      props.form?.submit?.()
                      }}>
                      提交
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
        className={styles.early_screening_service_configuration}
      >
        <ProFormText
          name="expireDay"
          width={400}
          label='早筛订单服务早筛码有效期'
          fieldProps={{
            placeholder: '请输入30-180的有效天数',
            addonAfter:'天'
          }}
          rules={[  {
            validator: validateLadderConfig,
          }]}
        />
      </ProForm >
      </PageContainer>
  );
};
