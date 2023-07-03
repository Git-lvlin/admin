import { useEffect } from 'react';
import { Form } from 'antd';
import {
  ProFormText,
  DrawerForm
} from '@ant-design/pro-form';
import { accountCityDetail,accountCityEdit,checkAccount } from "@/services/aed-team-leader/team-leader-management"
import Address from '@/pages/supplier-management/after-sale-address/address';
import md5 from 'blueimp-md5';
import type { CumulativeProps } from "./data"

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
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


export default (props: CumulativeProps) => {
  const { visible, setVisible, callback,msgDetail,onClose} = props;
  const [form] = Form.useForm();
  useEffect(()=>{
    accountCityDetail({accountId:msgDetail?.accountId,agencyId:msgDetail?.id}).then(res=>{
      if(res.code==0){
        form.setFieldsValue({
          name:msgDetail?.name,
          ...res.data,
          address: {
            provinceId: res.data.provinceId,
            cityId: res.data.cityId,
            areaId: res.data.areaId,
            info: res.data.address,
          }
        })
      }
    })
  },[])
  const checkConfirm2 = (rule: any, value: any) => {
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

  const checkConfirm3 = (rule: any, value: string | any[]) => {
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
      layout="horizontal"
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
        const { address } = values
        const { province, city, area, info } = address;
        const params={
          ...values,
          password:values?.password&&md5(values?.password),
          provinceId: province.id,
          cityId: city.id,
          areaId: area.id,
          provinceName: province.name,
          cityName: city.name,
          areaName: area.name,
          address: info,
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
        label="子公司名称"
        name="name"
        readonly
      />
      <ProFormText
        width={250}
        label="登录账号"
        name="userName"
        placeholder='请输入登录账号'
        rules={[
          { required: true, message: '请输入办事处登录账号' },
          { validator: checkConfirm2 }
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
          { validator: checkConfirm3 }
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
        label="负责人"
        name="manager"
        rules={[{ required: true, message: '请输入负责人' },]}
      />
      <ProFormText
        label="负责人手机号"
        name="managerPhone"
        rules={[
         { required: true, message: '请输入负责人手机号' },
         { validator: checkConfirm }
        ]}
      />
      <Form.Item
        name="address"
        label="地址"
        validateFirst
        rules={[{ required: true,message:'请填写地址' },
        () => ({
          validator(_, value = {}) {
            const { province, city, area, info } = value;
            if (!province || !city || !area || !info) {
              return Promise.reject(new Error('请填写地址'));
            }
            return Promise.resolve();
          },
        })]}
      >
        <Address />
      </Form.Item>
    </DrawerForm >
  );
};