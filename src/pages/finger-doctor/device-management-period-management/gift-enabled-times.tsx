import React, { useEffect } from 'react';
import { Form, Divider, Space } from 'antd';
import { getUser } from "@/services/finger-doctor/user-health-data-management"
import type {  DetailProps, DataType } from './data'
import ProForm,{
  ProFormText,
  DrawerForm
} from '@ant-design/pro-form';
import Upload from '@/components/upload';

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 }
  };

const checkConfirm = (rule: any, value: string) => {
    return new Promise<void>(async (resolve, reject) => {
      if (value && !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)) {
        await reject('请输入正确的手机号')
      }else {
        await resolve()
      }
    })
}

const CheckReportConfiguration: React.FC<DetailProps> = (props) => {
  const { visible, setVisible, datailMsg, onClose } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    (getUser({
      imei:datailMsg?.imei
    }) as Promise<{ data: DataType, code: number }>).then(res => {
      if (res.code === 0) {
        form.setFieldsValue({
          memberPhone: datailMsg?.memberPhone,
          ...res.data,
          imei:datailMsg?.imei
        })
      }
    }).finally(() => {

    })
  }, [datailMsg])

  return (
    <DrawerForm
      layout="horizontal"
      title="赠送启用服务次数"
      onVisibleChange={setVisible}
      visible={visible}
      width={1200}
      form={form}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
          onClose();
        }
      }}
      submitter={{
        searchConfig:{
          resetText:'返回',
          submitText:'提交'
        }
      }}
      onFinish={async (values) => {
        // const params={
        //   ...values,
        //   password:values?.password&&md5(values?.password)
        // }
        // accountEdit(params).then(res=>{
        //   if(res.code==0){
        //     setVisible(false)
        //     callback(true)
        //   }
        // })
      }}
      {...formItemLayout}
    >
    <p style={{ marginBottom: -10, color:'#8D8D8D' }}>用户手机号：{datailMsg?.memberPhone}  &nbsp; 设备编号：{datailMsg?.imei}    &nbsp; 当前剩余管理期{datailMsg?.remainManageDayStr}天</p>
      <Divider />
      <ProFormText
       label='设备所属人手机号'
       name=''
       readonly 
      />
      <ProFormText
       label='设备编号'
       name=''
       readonly 
      />
      <ProFormText
       label='设备所属人店铺名称'
       name=''
       readonly 
      />
      <ProFormText
       label='赠送手指医生启用服务的用户手机'
       name=''
       rules={[
        { required: true, message: '请输入用户手机号' },
        { validator: checkConfirm }
       ]}
       labelCol={{ span: 6 }}
       width={400}
      />
      <Space>
        <ProFormText
         label='赠送手指医生启用服务次数'
         name=''
         fieldProps={{
            addonAfter: '次'
         }}
         rules={[{ required: true, message: '请输入启用服务次数' }]}
         width={400}
         labelCol={{ span: 6 }}
        />
        <ProFormText
         label='有效期'
         name=''
         fieldProps={{
            placeholder: '年/月/日',
            addonAfter: '前可用'
         }}
         rules={[{ required: true, message: '请输入有效期' }]}
         width={400}
        />
      </Space>
      <ProForm.Item
        name='area'
        label='上传申请调整启用次数凭证'
      >
        <Upload multiple maxCount={1} accept="image/*" dimension="1:1" size={500} />
      </ProForm.Item>
    </DrawerForm>
  )
}

export default CheckReportConfiguration;
