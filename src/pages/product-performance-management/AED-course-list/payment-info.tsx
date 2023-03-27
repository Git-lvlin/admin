import { useRef, useEffect } from 'react'
import { 
  ModalForm,
  ProFormText
} from '@ant-design/pro-form'

import type { FC } from 'react'
import type { FormInstance } from 'antd'
import type { paymentInfoProps } from './data'

const PaymentInfo: FC<paymentInfoProps> = ({visible, setVisible}) => {

  const form = useRef<FormInstance>()

  return (
    <ModalForm
      title='修改收款信息'
      layout='horizontal'
      width={500}
      submitter={{
        searchConfig: {
          submitText: '保存',
          resetText: '取消'
        }
      }}
      formRef={form}
      visible={visible}
      onVisibleChange={setVisible}
      onFinish={async (values)=> {

      }}
    >
      <ProFormText
        label='下单人手机号'
        name=''
        readonly
      />
      <ProFormText
        label='订单号'
        name=''
        readonly
      />
      <ProFormText
        label='订单支付时间'
        name=''
        readonly
      />
      <ProFormText
        label='订单状态'
        name=''
        readonly
      />
      <ProFormText
        label='收款人'
        name=''
        fieldProps={{
          placeholder: '请输入收款人姓名'
        }}
      />
      <ProFormText
         label='银行卡号'
         name=''
         fieldProps={{
           placeholder: '请输入银行卡号'
         }}
      />
      <ProFormText
         label='开户行'
         name=''
         fieldProps={{
           placeholder: '请输入开户行'
         }}
      />
      <ProFormText
         label='支行名称'
         name=''
         fieldProps={{
           placeholder: '请输入支行名称'
         }}
      />
    </ModalForm>
  )
}

export default PaymentInfo