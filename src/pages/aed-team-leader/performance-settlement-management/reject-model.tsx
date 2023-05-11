import { useEffect } from "react"
import { Form, message, Divider } from 'antd';
import {
  ProFormText,
  ModalForm,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { updateAdminCancel } from "@/services/order-management/invoice-management"
import styles from './styles.less'

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
      title={<><span style={{ fontWeight:'bold' }}>AED业绩结算审核拒绝</span> <span style={{ fontSize:'12px', color:'#929292' }}>辅助信息</span></>}
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
      className={styles.forbidden_model}
    >
      <ProFormText
        label='申请结算金额'
        name="id"
        readonly
      />
      <ProFormText
        label='申请结算单数'
        name="id"
        readonly
      />
      <ProFormText
        label='申请结算子公司'
        name="id"
        readonly
      />
      
      <ProFormTextArea
        label='拒绝结算原因'
        name="cancelRemark"
        fieldProps={{
          maxLength:30,
          minLength:5,
          placeholder:'请输入5-30个字符'
        }}
        rules={[{ required: true, message: '请输入拒绝结算原因' },]}
      />
      <ProFormText
        name="id"
        hidden
      />
    </ModalForm >
  );
};
