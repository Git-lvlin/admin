import { useEffect } from 'react';
import {
    ModalForm,
    ProFormText,
    ProFormTextArea
  } from '@ant-design/pro-form';
  import { Form } from 'antd';
  import { closeLimitPay } from "@/services/finger-doctor/device-management-period-management"
  import type {  DetailProps } from './data'
  import { ExclamationCircleFilled } from '@ant-design/icons';

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 14 }
  };
  
  
  const PaymentModal: React.FC<DetailProps> = (props) => {
    const { visible, setVisible, callback,onClose, datailMsg} = props;
    const [form] = Form.useForm();

    useEffect(() => {
      form.setFieldsValue({
        ...datailMsg
      })
    }, [])
    return (
      <ModalForm
        layout="horizontal"
        title={`确认提示（设备编号:${datailMsg?.imei}）`}
        onVisibleChange={setVisible}
        visible={visible}
        width={550}
        form={form}
        modalProps={{
            forceRender: true,
            destroyOnClose: true,
            onCancel: () => {
              onClose();
            }
          }}
        onFinish={(values) => {
          const params={
            id:values?.id,
            remark:values?.remark
          }
            closeLimitPay(params).then(res=>{
            if(res.code==0){
              setVisible(false)
              callback()
            }
          })
        }}
        labelAlign="right"
        {...formItemLayout}
      >
        <strong style={{ marginBottom:'10px',display:'block' }}><ExclamationCircleFilled style={{color:'#FBC550'}}/> 是否开启设备缴费入口</strong>
        <ProFormTextArea
         label='开启说明'
         name='remark'
         fieldProps={{
            placeholder:"请输入开启机器缴费的信息，5-50个字符",
         }}
         rules={[ { required: true, message: '请输入开启说明' }, { pattern: /^.{5,50}$/, message: '必须是5-50个字符' } ]}
        />
        <ProFormText
         label='租期状态'
         name='leaseStatusStr'
         readonly 
        />
        <ProFormText
         label='当前租期截止日'
         name='leaseDeadline'
         readonly 
        />
        <ProFormText
         name='id'
         hidden 
        />
      </ModalForm>
    );
  };

 export default PaymentModal