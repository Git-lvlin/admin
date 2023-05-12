import { useEffect } from "react"
import { Form, message, Divider, Image } from 'antd';
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
  const { visible, setVisible,msgDetail,onClose,callback} = props;
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
      title={<><span style={{ fontWeight:'bold' }}>确认AED业绩结算汇款信息</span> <span style={{ fontSize:'12px', color:'#929292' }}>辅助信息</span></>}
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
        searchConfig: {
          submitText: '确认已完成线下汇款操作',
          resetText: '取消'
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
      <strong>确认业绩信息</strong>
        <p><span>结算业绩金额：￥86000</span><span>结算业绩单数：20单</span></p>
        <p><span>结算提成金额：￥86000</span><span>结算扣除税费金额：20单</span></p>
        <p><span>应结算到账金额：￥86000</span></p>
      <Divider />
      <strong>确认汇款信息</strong>
        <p><span>实际汇款金额：￥86000</span><span>汇款时间：2023-05-05 14:09:12</span></p>
        <p><span>汇款凭证：<Image src=""/></span><span>收款账号：622623779723234377</span></p>
      
      <ProFormTextArea
        label='备注'
        name="cancelRemark"
        fieldProps={{
          maxLength:30,
          minLength:5,
          placeholder:'请输入5-30个字符'
        }}
      />
      <ProFormText
        name="id"
        hidden
      />
    </ModalForm >
  );
};
