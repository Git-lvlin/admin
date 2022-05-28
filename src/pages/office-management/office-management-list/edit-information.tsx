import { useEffect } from 'react';
import { Form } from 'antd';
import {
  ProFormText,
  DrawerForm
} from '@ant-design/pro-form';
import { accountDetail,accountEdit } from "@/services/office-management/office-management-list"

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
    accountDetail({accountId:msgDetail?.accountId,agencyId:msgDetail?.agencyId}).then(res=>{
      if(res.code==0){
        form.setFieldsValue({
          name:msgDetail?.name,
          ...res.data
        })
      }
    })
  },[])
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
        rules={[{ required: true, message: '请输入办事处登录账号' }]}
      />
      <ProFormText
        width={250}
        label="办事处登录密码"
        name="password"
        placeholder='请输入登录密码'
        rules={[{ required: true, message: '请输入办事处登录密码' }]}
      />
      <ProFormText
        width={250}
        label="负责人"
        name="manager"
        placeholder='请输入负责人姓名'
        rules={[{ required: true, message: '请输入负责人姓名' }]}
      />
      <ProFormText
        width={250}
        label="负责人手机号"
        name="managerPhone"
        placeholder='请输入负责人手机号'
        rules={[{ required: true, message: '请输入负责人手机号' }]}
      />
    </DrawerForm >
  );
};