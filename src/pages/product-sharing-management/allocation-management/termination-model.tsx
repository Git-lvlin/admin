import { useEffect } from 'react';
import { Form } from 'antd';
import {
  ProFormText,
  ModalForm
} from '@ant-design/pro-form';
import { updateConfigStatusById } from "@/services/product-management/transaction-sharing-management"
import type { CumulativeProps } from "./data"
import { ExclamationCircleFilled } from '@ant-design/icons';

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

export default (props:CumulativeProps) => {
  const { visible, setVisible, callback, msgDetail } = props;
  const [form] = Form.useForm();
  useEffect(()=>{
      form.setFieldsValue({
        id:msgDetail?.id,
      })
  },[])
  return (
    <ModalForm
      layout="horizontal"
      title={<p><ExclamationCircleFilled style={{color:"#FAAD14"}}/> 确定要终止业务分账么？</p>}
      onVisibleChange={setVisible}
      visible={visible}
      form={form}
      modalProps={{
        forceRender: true,
        destroyOnClose: true,
        onCancel: () => {
        }
      }}
      submitter={{
        searchConfig: {
          submitText: '确定终止',
          resetText: '不终止',
        },
      }}
      onFinish={async (values) => {
        updateConfigStatusById({...values,status:0}).then(res=>{
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
      <p><span style={{ color:'red' }}>终止后将无法自动分账</span>，<span style={{ color:'#B5B2B2' }}>你还要继续吗？</span></p>
    </ModalForm >
  );
};