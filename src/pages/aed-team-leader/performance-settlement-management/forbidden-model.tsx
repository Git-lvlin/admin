import { useEffect } from "react"
import { Form, Divider } from 'antd';
import {
  ModalForm,
  ProFormTextArea,
} from '@ant-design/pro-form';
import styles from './styles.less'
import { amountTransform } from "@/utils/utils";

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

export default (props) => {
  const { visible, setVisible,msgDetail,onClose,callback,totalSum,unfreezeAmount,dataStatus} = props;
  const [form] = Form.useForm();
  useEffect(()=>{
    form.setFieldsValue({
      ...msgDetail
    })
  },[])
  const waitTime = (values) => {
    callback(values)
    setVisible(false)
  };
  return (
    <ModalForm
      layout="horizontal"
      title={<><span style={{ fontWeight:'bold' }}>AED业绩结算审核</span> <span style={{ fontSize:'12px', color:'#929292' }}>辅助信息</span></>}
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
        return true;
      }}
      {...formItemLayout}
      className={styles.forbidden_model}
    >
      <strong>待审核信息</strong>
        <p><span>提成金额：￥{amountTransform(unfreezeAmount,'/').toFixed(2)}</span><span>业绩订单数：{totalSum}单</span></p>
      <Divider />
      {dataStatus.length?
        <>
        <strong>审核通过</strong>
        <p><span>审核通过提成金额：￥{amountTransform(unfreezeAmount,'/').toFixed(2)}</span><span>审核通过单数：{totalSum}单</span></p>
        </>
        :
        <>
        <strong>审核通过</strong>
        <p><span>审核通过提成金额：￥{amountTransform(msgDetail?.reduce((sum, item) => sum + item?.unfreezeAmount, 0),'/').toFixed(2) }</span><span>审核通过单数：{msgDetail.length}单</span></p>
          <Divider />
          <strong>继续等待审核</strong>
          <p><span>待审核提成金额：￥{amountTransform(unfreezeAmount-msgDetail?.reduce((sum, item) => sum + item?.unfreezeAmount, 0),'/').toFixed(2) }</span><span>待审核单数：{totalSum-msgDetail.length}单</span></p>
        </>
      }

      <ProFormTextArea
        label='备注信息'
        name="remark"
        fieldProps={{
          maxLength:30,
          minLength:5,
          placeholder:'请输入5-30个字符'
        }}
        rules={[{ required: true, message: '请输入备注信息' },]}
      />
    </ModalForm >
  );
};
