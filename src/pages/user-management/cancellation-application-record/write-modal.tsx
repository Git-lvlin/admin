import { useEffect } from 'react';
import { Form, message } from 'antd';
import {
  ProFormText,
  ModalForm,
  ProFormTextArea,
} from '@ant-design/pro-form';
import Upload from '@/components/upload';
import { CumulativeProps } from './data';
import { cancelConfirm } from '@/services/user-management/cancellation-application-record'

const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 14 }
  };

export default (props:CumulativeProps) => {
  const { visible, setVisible, msgDetail, callback } = props;
  const [form] = Form.useForm();
  const waitTime = (values: { id:string,remark:string,voucher:string}) => {
    cancelConfirm({id:msgDetail?.id,remark:values.remark,voucher:values.voucher}).then(res=>{
      if(res.code==0){
        message.success('操作成功')
        callback()
        setVisible(false)
      }
    })
  };
  useEffect(()=>{
    form.setFieldsValue(msgDetail)
  },[msgDetail])
  return (
    <ModalForm
      layout="horizontal"
      title={<><span style={{ fontWeight:'bold' }}>确认注销</span> <span style={{ fontSize:'12px', color:'#929292' }}>辅助信息</span></>}
      onVisibleChange={setVisible}
      visible={visible}
      form={form}
      modalProps={{
        forceRender: true,
        destroyOnClose: true,
        onCancel: () => {
        }
      }}
      onFinish={async (values) => {
        await waitTime(values);
        return true;
      }}
      {...formItemLayout}
    >
      <ProFormText
        label='注销申请原因'
        name="reason"
        readonly
      />
      <ProFormText
        label='注销申请时间'
        name="createTime"
        readonly
      />
      <Form.Item
        label="申请凭证"
        name="voucher"
        >
        <Upload multiple  maxCount={1} accept="image/*"/>
      </Form.Item>
      
      <ProFormTextArea
        label='备注'
        name="remark"
        fieldProps={{
          maxLength:30,
          minLength:5,
          placeholder:'请输入5-30个字符'
        }}
      />
    </ModalForm >
  );
};
