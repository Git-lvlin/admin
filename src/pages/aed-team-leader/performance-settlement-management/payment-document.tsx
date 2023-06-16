import { useEffect, useState } from "react"
import { Form, Image } from 'antd';
import ProForm,{
  ProFormText,
  ModalForm,
} from '@ant-design/pro-form';
import { getRemitListByAuditSumId } from "@/services/aed-team-leader/performance-settlement-management"
import ProCard from "@ant-design/pro-card"
import styles from './styles.less'
import { amountTransform } from "@/utils/utils";
import moment from "moment";
import type { CumulativeProps } from "../../supplier-management/supplier-list/qualification-audit-list/data"

const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 14 }
  };

  const StoreInformation = (props) => {
    const { msgDetail } = props;
    const [form] = Form.useForm()
    useEffect(()=>{
      form.setFieldsValue({
        ...msgDetail,
        fee: amountTransform(msgDetail?.fee,'/').toFixed(2),
        remitAmount: amountTransform(msgDetail?.remitAmount,'/').toFixed(2),
        SingularAmount:`${msgDetail?.orderCount}单 共${amountTransform(msgDetail?.amount,'/').toFixed(2)} 元 `,
        remitTime: moment(msgDetail?.remitTime).format('YYYY-MM-DD HH:mm:ss')
      })
    },[])
    return (
      <ProForm
        layout="horizontal"
        form={form}
        submitter={{
          render: ({ form }) => {
            return []
          }
        }}
        {...formItemLayout}
      >
        <ProFormText
          label='结算单数及分账金额'
          name="SingularAmount"
          disabled
        />
        <ProFormText
          label='扣除通道费'
          name="fee"
          disabled
        />
        <ProFormText
          label='实际汇款金额'
          name="remitAmount"
          disabled
        />
        {
          msgDetail?.urlArr?.map(item=><Image src={item} style={{ marginBottom: '20px' }}/>)
        }
        <ProFormText
          label='备注'
          name="remark"
          disabled
        />
        <ProFormText
          label='实际汇款时间'
          name="remitTime"
          disabled
        />
        <ProFormText
          label='汇款操作人'
          name="operateName"
          disabled
        />
        <ProFormText
          label='记录时间'
          name="createTime"
          disabled
        />
      </ProForm>
    );
  };

export default (props:CumulativeProps) => {
  const { visible, setVisible,msgDetail,onClose} = props;
  const [form] = Form.useForm();
  const [dataDatil, setDataDatil] = useState([])
  const [activeKey, setActiveKey] = useState<string>('1')
  useEffect(()=>{
    getRemitListByAuditSumId({auditSumId:msgDetail?.settlementId}).then(res=>{
      if(res.code==0){
        setDataDatil(res.data)
        form.setFieldsValue({
          ...res.data,
          applyName: msgDetail?.applyName,
          singularAmount: `${amountTransform(res.data.reduce((sum, item) => sum + item?.amount, 0),'/').toFixed(2)} 元 （${res.data.reduce((sum, item) => sum + item?.orderCount, 0)}单）`,
          totalAmount:`${amountTransform(res.data.reduce((sum, item) => sum + item?.remitAmount, 0),'/').toFixed(2)} 元 （已扣除通道费${amountTransform(res.data.reduce((sum, item) => sum + item?.fee, 0),'/').toFixed(2)}元）`
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
        label='收款子公司名称'
        name="applyName"
        disabled
      />
      <ProFormText
        label='已结算总分账金额'
        name="singularAmount"
        disabled
      />
      <ProFormText
        label='实际已汇款总金额'
        name="totalAmount"
        disabled
      />
      <ProCard
        tabs={{
          type: 'card',
          activeKey,
          onChange: setActiveKey
        }}
      >
        {
          dataDatil?.map((ele,index)=> 
            <ProCard.TabPane key={index+1} tab={`第${index+1}笔汇款`}>
             <StoreInformation msgDetail={ele} activeKey={activeKey}/>
            </ProCard.TabPane>
        )
        }
      </ProCard>
    </ModalForm >
  );
};
