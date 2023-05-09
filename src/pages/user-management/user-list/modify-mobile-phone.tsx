import { useEffect } from 'react';
import { Button, Form } from 'antd';
import ProForm, {
  ProFormText,
  ModalForm,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { delSubsidiary, openSubsidiary } from "@/services/aed-team-leader/team-leader-management"
import type { CumulativeProps } from "./data"
import Upload from '@/components/upload'

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

export default (props:CumulativeProps) => {
  const { visible, setVisible, callback,msgDetail,onClose} = props;
  const [form] = Form.useForm();
  useEffect(()=>{
      form.setFieldsValue({
        id:msgDetail?.id,
      })
  },[])
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
        const api=msgDetail?.status?delSubsidiary: openSubsidiary
        api(values).then(res=>{
          if(res.code==0){
            setVisible(false)
            callback(true)
          }
        })
      }}
      {...formItemLayout}
    >
      <ProFormText
        name="id"
        hidden
      />
      <ProFormText
        label='原手机号'
        name="id"
        readonly
      />
      <div style={{ position: "relative" }}>
        <ProFormText
          width={200}
          label='新手机号'
          name="phone"
          rules={[{ required: true, message: '请输入新手机号' }]}
        />
        <Button style={{ position: "absolute", left: 330, top: 0 }}>获取验证码</Button>
      </div>
      <ProFormText width={310} label='验证码' name="code" rules={[{ required: true, message: '请输入验证码' }]}/>
      <ProFormTextArea
        width={310}
        name="storeStory"
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
        name="platformEvidenceImg"
        label="修改凭证"
        rules={[{ required: true, message: '请上传修改凭证' }]}
      >
        <Upload
          multiple maxCount={3}
          accept="image/*"
          size={1 * 1024} 
          code={219}
        />
      </ProForm.Item>
      <p style={{ color:'red' }}>提示：请务必让用户提供充足的账号所属凭证，例如账号的实名认证信息和新手机号所属人信息一致；请谨慎操作！</p>
    </ModalForm >
  );
};