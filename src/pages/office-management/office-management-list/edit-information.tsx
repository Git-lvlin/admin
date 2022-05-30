import { useEffect } from 'react';
import { Form } from 'antd';
import {
  ProFormText,
  DrawerForm
} from '@ant-design/pro-form';
import { accountDetail,accountEdit,checkAccount } from "@/services/office-management/office-management-list"

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
const checkConfirm = (rule, value, callback) => {
  return new Promise(async (resolve, reject) => {
    if (value && !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)) {
      await reject('请输入正确的手机号')
    }else {
      await resolve()
    }
  })
}
const activityName = (rule, value, callback) => {
  return new Promise(async (resolve, reject) => {
    if (value&&/[%&',;=?$\x22]/.test(value)) {
      await reject('不可以含特殊字符')
    } else {
      await resolve()
    }
  })
}


export default (props) => {
  const { visible, setVisible, callback,msgDetail,onClose} = props;
  const [form] = Form.useForm();
  useEffect(()=>{
    accountDetail({accountId:msgDetail?.accountId,agencyId:msgDetail?.agencyId}).then(res=>{
      if(res.code==0){
        form.setFieldsValue({
          name:msgDetail?.name,
          ...res.data
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
        accountEdit(values).then(res=>{
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
        label="办事处名称"
        name="name"
        readonly
      />
      <ProFormText
        width={250}
        label="办事处登录账号"
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
      {/* <ProFormDependency name={['userName']}>
                {({ userName }) => { 
                    return  
              }}
      </ProFormDependency> */}
      <ProFormText
        width={250}
        label="办事处登录密码"
        name="password"
        placeholder='请输入登录密码'
        rules={[{ required: true, message: '请输入办事处登录密码' }]}
        fieldProps={{
          maxLength:18,
          minLength:6,
          visibilityToggle: false,
          autoComplete: 'new-password'
        }}
      />
      <ProFormText
        width={250}
        label="负责人"
        name="manager"
        placeholder='请输入负责人姓名'
        rules={[
          { required: true, message: '请输入负责人姓名' },
          { validator: activityName }
        ]}
        fieldProps={{
          maxLength:10
        }}
      />
      <ProFormText
        width={250}
        label="负责人手机号"
        name="managerPhone"
        placeholder='请输入负责人手机号'
        rules={[
          { required: true, message: '请输入负责人手机号' },
          {validator: checkConfirm}
        ]}
      />
    </DrawerForm >
  );
};