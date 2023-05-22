import { useEffect, useState } from 'react';
import { Button, Form, message } from 'antd';
import ProForm, {
  ProFormText,
  ModalForm,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { modifyPhoneNumber, getAuthCodePhone } from "@/services/user-management/user-list"
import type { CumulativeProps } from "./data"
import Upload from '@/components/upload'


const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

export default (props:CumulativeProps) => {
  const { visible, setVisible, callback,msgDetail,onClose} = props;
  const [form] = Form.useForm();
  const [codeMsg, setCodeMsg] = useState('');
  const [verification, setVerification] = useState('')
  useEffect(()=>{
      form.setFieldsValue({
        memberId: msgDetail?.id,
        phone: msgDetail?.phoneNumber
      })
  },[])

  const checkConfirm= (rule: any, value: string) => {
    setCodeMsg('')
    return new Promise<void>(async (resolve, reject) => {
      if (value && !/^1\d{10}$/.test(value)) {
        await reject('请输入正确的手机号')
      }else {
        await resolve()
      }
    })
  }

const checkConfirm2 = (rule: any, value: string) => {
  setVerification('')
  return new Promise<void>(async (resolve, reject) => {
    if (value && !/^[0-9]*[1-9][0-9]*$/.test(value)) {
      await reject('只能输入正整数')
    }else {
      await resolve()
    }
  })
}
  
  const handleGetCode = async () => {
    // 调用接口获取验证码
    getAuthCodePhone({ phoneNumber: form?.getFieldValue().phoneNumber })?.then(res=>{
      if(res.code==0){
        // 将验证码保存在状态中
        setCodeMsg(res.data);
        message.success('获取成功')
      }
    })
  };
  return (
    <ModalForm
      layout="horizontal"
      title="修改手机号"
      onVisibleChange={setVisible}
      visible={visible}
      form={form}
      modalProps={{
        forceRender: true,
        destroyOnClose: true,
        onCancel: () => {
          onClose();
        }
      }}
      submitter={{
        searchConfig: {
          submitText: '提交',
          resetText: '取消',
        },
      }}
      onFinish={async (values) => {
        try {
          const res = await modifyPhoneNumber(values);
          if (res.code === 0) {
            setVerification(res.data.errMsg)
            if(!res.data.errMsg){
              callback(true);
              setVisible(false);
              message.success('修改成功')
            }
          }
        } catch (error) {
          console.error(error);
        }
      }}
      {...formItemLayout}
    >
      <ProFormText
        name="memberId"
        hidden
      />
      <ProFormText
        label='原手机号'
        name="phone"
        readonly
      />
      <div style={{ position: "relative" }}>
        <ProFormText
          width={200}
          label='新手机号'
          name="phoneNumber"
          rules={[
            { required: true, message: '请输入新手机号' },
            { validator: checkConfirm}
          ]}
          extra={codeMsg?.errMsg&&<span style={{ color:'red' }}>提示：{codeMsg?.errMsg}</span>}
        />
        <Button style={{ position: "absolute", left: 330, top: 0 }} onClick={handleGetCode}>获取验证码</Button>
      </div>
      <ProFormText 
        width={310} 
        label='验证码' 
        name="code"  
        rules={[
          { required: true, message: '请输入验证码' },
          { validator: checkConfirm2}
        ]} 
        extra={verification&&<span style={{ color:'red' }}>提示：{verification}</span>}
      />
      <ProFormTextArea
        width={310}
        name="remark"
        label="修改说明"
        rules={[
          { required: true, message: '请输入修改说明' }
        ]}
        fieldProps={{
          maxLength: 50,
          placeholder: '最多可输入50字'
        }}
      />
      <ProForm.Item
        name="voucher"
        label="修改凭证"
        rules={[{ required: true, message: '请上传修改凭证' }]}
      >
        <Upload
          multiple maxCount={2}
          accept="image/*"
          code={219}
        />
      </ProForm.Item>
      <p style={{ color:'red' }}>提示：请务必让用户提供充足的账号所属凭证，例如账号的实名认证信息和新手机号所属人信息一致；请谨慎操作！</p>
    </ModalForm >
  );
};