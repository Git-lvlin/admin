import { useEffect } from 'react';
import { Form, message } from 'antd';
import {
  ProFormText,
  ModalForm,
} from '@ant-design/pro-form';
import { chatSort } from "@/services/cms/chat-recommended-products"
import type { EnteringProps } from "./data"

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };


export default (props:EnteringProps) => {
  const { visible, setVisible, callback, msgDetail, onClose } = props;
  const [form] = Form.useForm();
  useEffect(()=>{
      form.setFieldsValue({
        id:msgDetail?.id,
        sort:msgDetail?.sort
      })
  },[])
  return (
    <ModalForm
      title='排序'
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
        const { ...rest } = values
        try {
          const params={
            ...rest,
          }
          chatSort(params).then(res=>{
            if(res.code==0){
              setVisible(false)
              callback(true)
              message.success('操作成功！')
            }
          })
        } catch (error) {
          console.log('error',error)
        }
      }}
      {...formItemLayout}
    >
      <ProFormText
        width={250}
        label="排序"
        name="sort"
        placeholder='请输入'
        rules={[
          { required: true, message: '请输入' },
          { pattern: /^-?\d+$/, message: '只能输入整数' }
        ]}
      />
      <ProFormText
        name="id"
        hidden
      />
    </ModalForm >
  );
};