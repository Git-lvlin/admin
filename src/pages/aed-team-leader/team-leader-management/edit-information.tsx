import { useEffect } from 'react';
import { Form } from 'antd';
import {
  ProFormText,
  DrawerForm
} from '@ant-design/pro-form';
import { accountCityDetail,accountCityEdit,checkAccount } from "@/services/city-office-management/city-office-management-list"
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
    accountCityDetail({accountId:msgDetail?.accountId,agencyId:msgDetail?.id}).then(res=>{
      if(res.code==0){
        form.setFieldsValue({
          ...res.data,
          name:msgDetail?.name,
          managerPhone:msgDetail?.phone,
          userName:msgDetail?.accountName
        })
      }
    })
  },[])
  const checkConfirm2 = (rule, value, callback) => {
    return new Promise(async (resolve, reject) => {
      checkAccount({userName:value,accountId:msgDetail?.accountId}).then(async res=>{
        if (res.code==0) {
          await resolve()
        }else {
          await reject('账号已存在，请重新输入')
        }
      })
  
    })
  }

  const checkConfirm3 = (rule, value, callback) => {
    return new Promise(async (resolve, reject) => {
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
        accountCityEdit(params).then(res=>{
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
        label="团长姓名"
        name="name"
        readonly
      />
      <ProFormText
        label="手机号"
        name="managerPhone"
        readonly
      />
      <ProFormText
        width={250}
        label="登录账号"
        name="userName"
        placeholder='请输入登录账号'
        rules={[
          { required: true, message: '请输入办事处登录账号' },
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
    </DrawerForm >
  );
};