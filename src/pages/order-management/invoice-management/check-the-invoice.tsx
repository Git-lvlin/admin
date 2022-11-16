import { useEffect } from "react"
import { Form,Image } from 'antd';
import {
  ModalForm,
} from '@ant-design/pro-form';

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
  const { visible, setVisible,msgDetail,onClose} = props;
  const [form] = Form.useForm();
  useEffect(()=>{
    form.setFieldsValue({
      ...msgDetail
    })
  },[])
  return (
    <ModalForm
      title={<span style={{ fontWeight:'bold',margin:'0 auto'}}>查看开票</span>}
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
      onFinish={()=>{
        return false
      }}
      submitter={{
        render:()=>{
            return []
        }
      }}
      {...formItemLayout}
    >
      <Image src={msgDetail?.editInfo?.invoiceUrl}/>
    </ModalForm >
  );
};
