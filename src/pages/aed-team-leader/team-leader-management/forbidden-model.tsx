import { useEffect } from 'react';
import { Form } from 'antd';
import {
  ProFormText,
  ModalForm
} from '@ant-design/pro-form';
import { delSubsidiary, openSubsidiary } from "@/services/aed-subsidiary-corporation/subsidiary-corporation-management"
import type { CumulativeProps } from "./data"

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
      title={`确认要${msgDetail?.status?'禁用':'启用'} ${msgDetail?.phone} 的业绩状态么?`}
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
          submitText: msgDetail?.status?'禁用业绩计算':'启用业绩计算',
          resetText: msgDetail?.status?'不禁用业绩计算':'不启用业绩计算',
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
      <p><span style={{ color:'red' }}>{msgDetail?.status?'禁用':'启用'}后将不计算业绩</span>，<span style={{ color:'#B5B2B2' }}>你还要继续吗？</span></p>
    </ModalForm >
  );
};