import { useEffect, useState } from "react"
import { Form, Image } from 'antd';
import {
  ProFormText,
  ModalForm,
} from '@ant-design/pro-form';
import { getRemitDetailById } from "@/services/aed-team-leader/performance-settlement-management"
import styles from './styles.less'
import { amountTransform } from "@/utils/utils";
import moment from "moment";

const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 14 }
  };

export default (props) => {
  const { visible, setVisible,id,onClose,type} = props;
  const [form] = Form.useForm();
  const [dataDatil, setDataDatil] = useState([])
  useEffect(()=>{
    getRemitDetailById({id:id}).then(res=>{
      if(res.code==0){
        setDataDatil(res.data)
        const orderArrValues = [];
        for (let item in res.data.orderArr) {
            orderArrValues.push(res.data.orderArr[item])
        }
        form.setFieldsValue({
          ...res.data,
          orderCount: `${res.data.orderCount}单`,
          unfreezeAmount: `${amountTransform(res.data.unfreezeAmount,'/').toFixed(2)}元`,
          fee: `${amountTransform(res.data.fee,'/').toFixed(2)}`,
          remitAmount: `${amountTransform(res.data.remitAmount,'/').toFixed(2)}`,
          orderNo:  orderArrValues.toString(),
          remitTime: moment(res.data.remitTime*1000).format('YYYY-MM-DD HH:mm:ss')
        })
      }
    })
  },[])
  return (
    <ModalForm
      layout="horizontal"
      title={<span style={{ fontWeight:'bold' }}>业绩结算汇款凭证 （已确认）</span>}
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
      {...formItemLayout}
      submitter={{
        render: ({ form }) => {
          return []
        }
      }}
      className={styles.forbidden_model}
    >
      <ProFormText
        label={type=='1'?'收款子公司名称':'收款账号名称'}
        name="applyName"
        disabled
      />
      <ProFormText
        label='结算汇款单数'
        name="orderCount"
        disabled
      />
      <ProFormText
        label='结算汇款单号'
        name="orderNo"
        disabled
      />
      <ProFormText
        label='结算分账金额'
        name="unfreezeAmount"
        disabled
      />
      <ProFormText
        label='扣除通道费'
        name="fee"
        disabled
        extra='交易通道费为第三方支付渠道收取；'
      />
      <ProFormText
        label='实际汇款金额'
        name="remitAmount"
        disabled
      />
      <ProFormText
        label='实际汇款时间'
        name="remitTime"
        disabled
      />
      {
        dataDatil?.urlArr?.map(item=><Image src={item} style={{ marginBottom: '20px' }}/>)
      }
       <ProFormText
        label='备注'
        name="remark"
        fieldProps={{
          placeholder: ''
        }}
        disabled
        />
      <ProFormText
        label='汇款操作人'
        name="operateName"
        disabled
       />
    </ModalForm >
  );
};
