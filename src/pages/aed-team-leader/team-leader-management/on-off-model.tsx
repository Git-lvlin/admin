import { useEffect } from 'react';
import { Form } from 'antd';
import {
  ProFormText,
  ModalForm
} from '@ant-design/pro-form';
import { accountSwitch,subCompanySwitch } from "@/services/aed-team-leader/team-leader-management"
import type { EnteringProps } from "./data"

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

export default (props:EnteringProps) => {
  const { visible, setVisible, callback,msgDetail,onClose,type} = props;
  const [form] = Form.useForm();
  useEffect(()=>{
      form.setFieldsValue({
        ...msgDetail,
        agencyId: msgDetail?.id
      })
  },[])
  return (
    <ModalForm
      layout="horizontal"
      title={`确认要${msgDetail?.loginStatus?'禁用':'启用'} ${msgDetail?.managerPhone} 的登录状态么?`}
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
          submitText: msgDetail?.loginStatus?'禁用登录':'启用登录',
          resetText: msgDetail?.loginStatus?'不禁用':'不启用',
        },
      }}
      onFinish={async (values) => {
        const api=type==1?subCompanySwitch:accountSwitch
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
        name="accountId"
        hidden
      />
      <ProFormText
        name="agencyId"
        hidden
      />
      <p><span style={{ color:'red' }}>{msgDetail?.loginStatus?'禁用':'启用'}后此用户即可登录</span>，<span style={{ color:'#B5B2B2' }}>你还要继续吗？</span></p>
    </ModalForm >
  );
};