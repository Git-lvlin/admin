import { useEffect } from "react"
import { Form,message } from 'antd';
import {
  ProFormText,
  ModalForm,
  ProFormRadio
} from '@ant-design/pro-form';
import { amountTransform } from '@/utils/utils'
import { updateAdminInvoiceUrl } from "@/services/order-management/invoice-management"
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
      ...msgDetail,
      invoiceUrl:msgDetail?.editInfo?.invoiceUrl
    })
  },[])
  const waitTime = (values) => {
    return new Promise((resolve, reject) => {
        updateAdminInvoiceUrl({id:values?.id,invoiceUrl:values?.invoiceUrl,invSendEmail:values?.invSendEmail}).then((res) => {
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
      title={<><span style={{ fontWeight:'bold' }}>上传发票</span> <span style={{ fontSize:'12px', color:'#929292' }}>辅助信息</span></>}
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
        message.success('上传成功');
        return true;
      }}
      {...formItemLayout}
    >
      <ProFormText
        label='订单类型'
        name="orderTypeStr"
        readonly
      />
      <ProFormText
        label='订单号'
        name="orderNo"
        readonly
      />
      <ProFormText
        label='商品名称'
        name="goodsName"
        readonly
      />
      <ProFormText
        label='商品数量'
        name="goodsNum"
        readonly
      />
      <ProFormText
        label='订单金额'
        name="invBankName"
        fieldProps={{
          value:`${amountTransform(msgDetail?.orderAmount,'/').toFixed(2)}元`
        }}
        readonly
      />
      <Form.Item name='invoiceUrl' label='上传发票' rules={[{ required: true, message: '请上传发票' }]}>
        <Upload  multiple maxCount={1} accept="image/*" code={308} size={1 * 1024}/>
      </Form.Item>
      <ProFormRadio.Group
        name="invSendEmail"
        label="发票发送至邮箱"
        options={[
            {
                label: '发送',
                value: 1
            },
            {
                label: '不发送',
                value: 0
            },
        ]}
        rules={[{ required: true, message: '请选择' }]}
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
