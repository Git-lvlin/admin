import { useEffect } from "react"
import { Form,message } from 'antd';
import {
  ProFormText,
  ModalForm,
  ProFormTextArea,
  ProFormRadio
} from '@ant-design/pro-form';
import { updateAdminPayInfo } from "@/services/order-management/invoice-management"
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
      ...msgDetail
    })
  },[])
  const waitTime = (values) => {
    return new Promise((resolve, reject) => {
        updateAdminPayInfo(values).then((res) => {
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
      title={<><span style={{ fontWeight:'bold' }}>确认支付</span> <span style={{ fontSize:'12px', color:'#929292' }}>辅助信息</span></>}
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
        message.success('提交成功');
        return true;
      }}
      {...formItemLayout}
    >
      <ProFormRadio.Group
        name="payStatus"
        label="支付状态"
        options={[
            {
                label: '已支付',
                value: 1
            },
            {
                label: '无需支付',
                value: 0
            },
        ]}
        initialValue={1}
      />
      <ProFormText
        label='支付金额'
        name="payAmount"
      />
      <Form.Item name='payUrl' label='支付凭证图片'>
        <Upload  multiple maxCount={1} accept="image/*" code={308} size={1 * 1024}/>
      </Form.Item>
      <ProFormTextArea
        label='备注'
        name="payRemark"
        fieldProps={{
          minLength:5,
          placeholder:'请输入至少5个字符'
        }}
      />
      <ProFormText
        name="id"
        hidden
      />
    </ModalForm >
  );
};
