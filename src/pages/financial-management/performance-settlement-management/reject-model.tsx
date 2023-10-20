import { Form, message } from 'antd';
import {
  ProFormText,
  ModalForm,
  ProFormTextArea,
} from '@ant-design/pro-form';
import styles from './styles.less'
import { amountTransform } from "@/utils/utils";

const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 14 }
  };

export default (props) => {
  const { visible, setVisible,msgDetail,onClose,callback,totalSum,unfreezeAmount,pendingFee,confirmedAmount,type} = props;
  const [form] = Form.useForm();
  const waitTime = (values) => {
    callback(values)
    setVisible(false)
  };
  return (
    <ModalForm
      layout="horizontal"
      title={<><span style={{ fontWeight:'bold' }}>{type == '1'?'AED':''}业绩结算审核拒绝</span> <span style={{ fontSize:'12px', color:'#929292' }}>辅助信息</span></>}
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
        label='申请结算业绩订单金额'
        fieldProps={{
          value: `￥${amountTransform(confirmedAmount,'/').toFixed(2)}`
        }}
        readonly
      />
      <ProFormText
        label='申请结算单数'
        fieldProps={{
          value: `${totalSum}单`
        }}
        readonly
      />
      <ProFormText
        label='申请结算提成金额'
        fieldProps={{
          value: `￥${amountTransform(unfreezeAmount,'/').toFixed(2)}（扣通道费${amountTransform(pendingFee,'/')}）`
        }}
        readonly
      />
      <ProFormText
        label={type == '1'?'申请结算子公司':'申请结算人账号名称'}
        fieldProps={{
          value: msgDetail?.applyName
        }}
        readonly
      />
      
      <ProFormTextArea
        label='拒绝结算原因'
        name="remark"
        fieldProps={{
          maxLength:30,
          minLength:5,
          placeholder:'请输入5-30个字符'
        }}
        rules={[{ required: true, message: '请输入拒绝结算原因' },]}
      />
    </ModalForm >
  );
};
