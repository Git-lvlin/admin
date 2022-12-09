import { useEffect } from "react"
import { Form,Image } from 'antd';
import {
  ModalForm,
} from '@ant-design/pro-form';
import Upload from '@/components/upload';

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
      invoiceUrl:msgDetail?.editInfo?.invoiceUrl
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
      {
        msgDetail?.editInfo?.invoiceUrl.split("/").pop().split(".").pop() == "pdf"?
        <Form.Item name="invoiceUrl">
            <Upload multiple disabled={true}/>
        </Form.Item>
        :
        <Image src={msgDetail?.editInfo?.invoiceUrl}/>
      } 
    </ModalForm >
  );
};
