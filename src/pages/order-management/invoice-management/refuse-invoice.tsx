import { useEffect } from "react"
import { Form,message } from 'antd';
import {
  ProFormText,
  ModalForm,
  ProFormTextArea
} from '@ant-design/pro-form';
import { amountTransform } from '@/utils/utils'
import { updateAdminReject } from "@/services/order-management/invoice-management"

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
      goodsName:msgDetail?.goodsInfo?.goodsName
    })
  },[])
  const waitTime = (values) => {
    return new Promise((resolve, reject) => {
        updateAdminReject(values).then((res) => {
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
      title={<><span style={{ fontWeight:'bold' }}>拒绝开票</span> <span style={{ fontSize:'12px', color:'#929292' }}>辅助信息</span></>}
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
      <ProFormTextArea
        label='拒绝原因'
        name="rejectRemark"
        rules={[{ required: true, message: '请输入拒绝原因' }]}
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
