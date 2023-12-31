import { useEffect } from 'react';
import { Form } from 'antd';
import {
  ProFormText,
  DrawerForm,
  ModalForm
} from '@ant-design/pro-form';
import { accountResetPwd } from "@/services/office-management/office-management-list"

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
      form.setFieldsValue({
        accountId:msgDetail?.accountId,
        agencyId:msgDetail?.agencyId
      })
  },[])
  return (
    <ModalForm
      title={`请确认要重置事业部：${msgDetail?.name}（账号：${msgDetail?.userName}）的登录密码？`}
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
        render: (props, defaultDoms) => {
            return [
            <span style={{display:'inline-block',marginRight:'430px',color:'#979797'}}>重置密码将同步发送给事业部</span>,
            ...defaultDoms
            ];
        },
      }}
      onFinish={async (values) => {
        accountResetPwd(values).then(res=>{
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
      <p style={{padding:'80px 0 80px 40px'}}>注意：重置密码后，新密码将立即生效，原密码无法继续使用！</p>
    </ModalForm >
  );
};