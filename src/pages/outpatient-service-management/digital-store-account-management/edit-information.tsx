import { useEffect } from 'react';
import { Form } from 'antd';
import {
  ProFormText,
  DrawerForm,
  ProFormRadio
} from '@ant-design/pro-form';
import { providerDetail,providerEdit,providerCheckAccount } from "@/services/outpatient-service-management/digital-store-account-management"
import md5 from 'blueimp-md5';

const formItemLayout = {
    labelCol: { span: 4 },
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
  const { visible, setVisible, callback,msgDetail,onClose} = props;
  const [form] = Form.useForm();
  useEffect(()=>{
    providerDetail({accountId:msgDetail?.accountId,agencyId:msgDetail?.agencyId}).then(res=>{
      if(res.code==0){
        form.setFieldsValue({
          contactPhone: msgDetail?.contactPhone,
          contactName: msgDetail?.contactName,
          ...res.data
        })
      }
    })
  },[])

  const checkConfirm = (rule: any, value: string) => {
    return new Promise<void>(async (resolve, reject) => {
      if (value && !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)) {
        await reject('请输入正确的手机号')
      }else {
        await resolve()
      }
    })
  }

  const checkConfirm2 = (rule: any, value: any ) => {
    return new Promise<void>(async (resolve, reject) => {
      providerCheckAccount({userName:value,accountId:msgDetail?.accountId}).then(async res=>{
        if (res.code==0) {
          await resolve()
        }else {
          await reject('账号已存在，请重新输入')
        }
      })
  
    })
  }

  const checkConfirm3 = (rule: any, value: string | any[] ) => {
    return new Promise<void>(async (resolve, reject) => {
      if (value && value.length<6) {
        await reject('不少于6个字符')
      }else {
        await resolve()
      }
    })
  }
  return (
    <DrawerForm
      title='基本信息'
      onVisibleChange={setVisible}
      visible={visible}
      width={1000}
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
          resetText:'取消',
          submitText:'保存'
        }
      }}
      onFinish={async (values) => {
        const params={
          ...values,
          password:values?.password&&md5(values?.password)
        }
        providerEdit(params).then(res=>{
          if(res.code==0){
            setVisible(false)
            callback(true)
          }
        })
      }}
      {...formItemLayout}
      
    >
      <ProFormText
        name="accountId"
        hidden
      />
      <ProFormText
        name="agencyId"
        hidden
      />
      <ProFormText
        width={250}
        label="名称"
        name="nickname"
        readonly
      />
      <ProFormText
        width={250}
        label="登录账号"
        name="userName"
        placeholder='请输入登录账号'
        rules={[
          { required: true, message: '请输入登录账号' },
          {validator: checkConfirm2}
        ]}
        fieldProps={{
          maxLength:18
        }}
      />
      <ProFormText.Password
        width={250}
        label="登录密码"
        name="password"
        placeholder='请输入登录密码'
        rules={[
          {validator: checkConfirm3}
        ]}
        fieldProps={{
          maxLength:18,
          minLength:6,
          visibilityToggle: false,
          autoComplete: 'new-password'
        }}
        extra={<p style={{color:'#FFB45D'}}>未填写时保持已有的密码</p>}
      />
      <ProFormText
        label="联系人"
        name="contactName"
      />
      <ProFormText
        label="联系人手机号"
        name="contactPhone"
        rules={[
         { validator: checkConfirm }
        ]}
      />
      <ProFormRadio.Group
        name="status"
        label="启用状态"
        initialValue={1}
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
    </DrawerForm >
  );
};