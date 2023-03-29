import { useEffect } from 'react';
import { Form } from 'antd';
import {
  ProFormText,
  ModalForm
} from '@ant-design/pro-form';
import { addSubsidiary } from "@/services/aed-subsidiary-corporation/subsidiary-corporation-management"

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

const checkConfirm = (rule: any, value: string) => {
  return new Promise<void>(async (resolve, reject) => {
    if (value && !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)) {
      await reject('请输入正确的手机号')
    }else {
      await resolve()
    }
  })
}

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
      title={<p><strong>录入子公司</strong> <span style={{ color:'#B5B2B2',fontSize:'10px' }}>辅助信息</span></p>}
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
            ...defaultDoms
            ];
        },
      }}
      onFinish={async (values) => {
        addSubsidiary(values).then(res=>{
          if(res.code==0){
            setVisible(false)
            callback(true)
          }
        })
      }}
      {...formItemLayout}
    >
      <ProFormText
        width={250}
        label="子公司手机号"
        name="phone"
        placeholder='请输入子公司手机号'
        rules={[
          { required: true, message: '请输入子公司手机号' },
          {validator: checkConfirm}
        ]}
        fieldProps={{
          maxLength:18
        }}
      />
      <ProFormText
        width={250}
        label="子公司名称"
        name="name"
      />
    </ModalForm >
  );
};