import { useEffect } from "react"
import { Form,message } from 'antd';
import {
  ProFormText,
  ModalForm,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { updateAdminCancel } from "@/services/order-management/invoice-management"

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
const checkConfirm = (rule, value, callback) => {
    return new Promise(async (resolve, reject) => {
      console.log('valkue',value)
    if (value&&value.length<5) {
      reject('最少输入5个字符')
    }else {
      resolve('error')
    }
    })
  }

export default (props) => {
  const { visible, setVisible,msgDetail,onClose} = props;
  const [form] = Form.useForm();
  useEffect(()=>{
    form.setFieldsValue({
      ...msgDetail
    })
  },[])
  const waitTime = (values) => {
    return new Promise((resolve, reject) => {
        updateAdminCancel({id:values?.id,cancelRemark:values?.cancelRemark}).then((res) => {
        if (res.code === 0) {
          resolve(true);
          onClose();
        } else {
          reject(false);
        }
      })

    });
  };
  return (
    <ModalForm
      title={<><span style={{ fontWeight:'bold' }}>发票作废</span> <span style={{ fontSize:'12px', color:'#929292' }}>辅助信息</span></>}
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
      onFinish={async (values) => {
        await waitTime(values);
        message.success('操作成功');
        return true;
      }}
      {...formItemLayout}
    >
      <ProFormTextArea
        label='作废原因'
        name="cancelRemark"
        fieldProps={{
          maxLength:20,
          placeholder:'请输入5-20个字符'
        }}
        rules={[
          { required: true, message: '请输入作废原因' },
          { validator: checkConfirm}
        ]}
      />
      <ProFormText
        label='操作人'
        name="lastEditor"
        readonly
      />
      <ProFormText
        name="id"
        hidden
      />
    </ModalForm >
  );
};
