import React, { useEffect } from 'react';
import { Form,message } from 'antd';
import ProForm, {
  ProFormTextArea,
  ProFormRadio,
  ModalForm,
  ProFormText
} from '@ant-design/pro-form';
import { cancelReasonUpdate} from '@/services/intensive-store-management/cancel-reason';


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
  const { visible, setVisible, callback,onClose,formDetail} = props;
  const [form] = Form.useForm()
  useEffect(() => {
    if(formDetail?.id){
      form.setFieldsValue({
        ...formDetail,
      })
    }
  }, [])
  return (
    <ModalForm
      title='禁用操作'
      onVisibleChange={setVisible}
      visible={visible}
      width={1000}
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
            cancelReasonUpdate({status:formDetail?.status?.code==1?2:1,...values}).then(res=>{
              if(res.code==0){
                message.success('操作成功')
                setVisible(false)
                callback(true)
              }
            })

        }}
      {...formItemLayout}
    >
        <p>{formDetail?.status?.code==1?'确定禁用吗！！！':'确定启用吗！！！'}</p>
        <ProFormText 
          width="md"
          name="id"
          label="id"
          hidden
        />
    </ModalForm >
  );
};