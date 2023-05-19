import { useEffect } from "react"
import { Form, Divider, Image } from 'antd';
import {
  ProFormText,
  ModalForm,
  ProFormTextArea,
} from '@ant-design/pro-form';
import styles from './styles.less'
import { amountTransform } from "@/utils/utils";
import moment from "moment";

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

export default (props) => {
  const { visible, setVisible,msgDetail,onClose,callback,orderArr} = props;
  const [form] = Form.useForm();
  useEffect(()=>{
    form.setFieldsValue({
      ...msgDetail
    })
  },[])
  const waitTime = (values) => {
    callback(values);
  };
  return (
    <ModalForm
      layout="horizontal"
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
        return true;
      }}
      {...formItemLayout}
      className={styles.forbidden_model}
    >
      <strong>确认业绩信息</strong>
      {
        msgDetail?.status?<>
          <p><span>业绩订单金额：￥{amountTransform(msgDetail?.orderArr.reduce((sum, item) => sum + item?.payAmount, 0),'/').toFixed(2) }</span><span>业绩订单数：{msgDetail.status?parseInt(msgDetail?.allOrder)-msgDetail?.hasRemitOrder:msgDetail?.orderArr?.length}单</span></p>
          <p><span>业绩分账金额：￥{amountTransform(msgDetail?.orderArr.reduce((sum, item) => sum + item.amount, 0),'/').toFixed(2) }</span><span>扣除通道费金额：￥{amountTransform(msgDetail?.orderArr.reduce((sum, item) => sum + item.fee, 0),'/').toFixed(2)}</span></p>
          <p><span>提成金额：￥{amountTransform(msgDetail?.orderArr.reduce((sum, item) => sum + item?.unfreezeAmount, 0),'/').toFixed(2)}</span></p>
        </>:
        <>
          <p><span>业绩订单金额：￥{amountTransform(orderArr?.reduce((sum, item) => sum + item?.payAmount, 0),'/').toFixed(2) }</span><span>业绩订单数：{orderArr.length}单</span></p>
          <p><span>业绩分账金额：￥{amountTransform(orderArr?.reduce((sum, item) => sum + item.amount, 0),'/').toFixed(2) }</span><span>扣除通道费金额：￥{amountTransform(orderArr?.reduce((sum, item) => sum + item.fee, 0),'/').toFixed(2)}</span></p>
          <p><span>提成金额：￥{amountTransform(orderArr?.reduce((sum, item) => sum + item?.unfreezeAmount, 0),'/').toFixed(2)}</span></p>
        </>
      }
        
      <Divider />
      <strong>确认汇款信息</strong>
        <p><span>实际汇款金额：￥{msgDetail?.remitAmount}</span><span>汇款时间：{moment(msgDetail?.remitTime).format('YYYY-MM-DD HH:mm:ss')}</span></p>
        <p>
          <span>汇款凭证：{msgDetail?.urlArr?.map(item=><Image src={item} style={{ marginBottom: '20px' }}/>)}</span>
          <span>收款账号：{msgDetail?.bankNo}</span>
        </p>
      
      <ProFormTextArea
        label='备注'
        name="remark"
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
