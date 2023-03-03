import { useRef } from 'react';
import { Form } from 'antd';
import {
  ModalForm,
} from '@ant-design/pro-form';
import { ExclamationCircleFilled } from '@ant-design/icons'

export default ( props: { visible: boolean; setVisible: any; callback: any; phone: string; } ) => {
  const { visible, setVisible, callback,phone} = props;
  const [form] = Form.useForm();
  const ref=useRef()
  return (
    <ModalForm
      title={<p><ExclamationCircleFilled style={{color:"#FAAD14"}}/> 确认给{phone}修改每日可启用次数么？</p>}
      onVisibleChange={setVisible}
      visible={visible}
      form={form}
      width={400}
      modalProps={{
        forceRender: true,
        destroyOnClose: true,
        onCancel: () => {
        }
      }}
      formRef={ref}
      submitter={{
        searchConfig: {
          submitText: '继续',
          resetText: '取消',
        },
      }}
      onFinish={async (values) => {
        setVisible(false)
        callback(true)
      }}
    >
     <p><span style={{ color:'red' }}>确认后无法取消</span>，你还要继续吗？</p>
    </ModalForm >
  );
};