import { useEffect } from "react"
import { Form } from 'antd';
import {
  ProFormText,
  ProFormSelect,
  ModalForm
} from '@ant-design/pro-form';
import { amountTransform } from '@/utils/utils'

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
      title={<span style={{ fontWeight:'bold' }}>开票信息</span>}
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
        render:()=>{
            return []
        }
      }}
      onFinish={()=>{
        return false
      }}
      {...formItemLayout}
    >
      <ProFormText
        label='税费'
        name="payAmount"
        fieldProps={{
          value:`￥${amountTransform(msgDetail?.editInfo?.payAmount,'/').toFixed(2)}（${msgDetail?.editInfo?.payStatus==1?'已支付':'无需支付'}）`
        }}
        readonly
      />
      <ProFormSelect
        label='发票类型'
        name="invType"
        options={[
          {
            value: 1,
            label: '普通发票',
          },
          {
            value: 2,
            label: '专用发票',
          }
        ]}
        readonly
      />
      <ProFormSelect
        label='抬头类型'
        name="invTitleType"
        options={[
          {
            value: 1,
            label: '个人',
          },
          {
            value: 2,
            label: '单位',
          }
        ]}
        readonly
      />
      <ProFormText
        label='抬头名称'
        name="invTitleName"
        readonly
      />
      <ProFormText
        label='单位税号'
        name="invNumber"
        readonly
      />
      <ProFormText
        label='开户银行'
        name="invBankName"
        readonly
      />
      <ProFormText
        label='银行账号'
        name="invBankNo"
        readonly
      />
      <ProFormText
        label='单位地址'
        name="invAddress"
        readonly
      />
      <ProFormText
        label='单位电话'
        name="invPhone"
        readonly
      />
      <ProFormText
        label='接收邮箱'
        name="invEmail"
        readonly
      />
      <ProFormSelect
        label='发过邮箱'
        name="invSendEmail"
        options={[
          {
            value: 0,
            label: '否',
          },
          {
            value: 1,
            label: '是',
          }
        ]}
        readonly
      />
    </ModalForm >
  );
};
