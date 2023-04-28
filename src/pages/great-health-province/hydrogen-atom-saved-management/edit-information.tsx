import { useEffect } from 'react';
import { Form } from 'antd';
import {
  ProFormText,
  DrawerForm
} from '@ant-design/pro-form';
import { hydrogenProvinceAgentDetail,hydrogenProvinceAgentEdit,checkAccount } from "@/services/great-health-province/hydrogen-atom-saved-management"
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
    hydrogenProvinceAgentDetail({accountId:msgDetail?.accountId,agencyId:msgDetail?.agencyId}).then(res=>{
      if(res.code==0){
        form.setFieldsValue({
          name:msgDetail?.agentName,
          ...res.data
        })
      }
    })
  },[])
  const checkConfirm2 = (rule: any, value: any ) => {
    return new Promise<void>(async (resolve, reject) => {
      checkAccount({userName:value,accountId:msgDetail?.accountId}).then(async res=>{
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
        hydrogenProvinceAgentEdit(params).then(res=>{
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
        name="name"
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
          // { required: true, message: '请输入登录密码' },
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
    </DrawerForm >
  );
};