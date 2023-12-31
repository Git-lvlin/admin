import { useRef, useEffect, useState } from 'react'
import { 
  ModalForm,
  ProFormText,
  ProFormSelect
} from '@ant-design/pro-form'

import type { FC } from 'react'
import type { FormInstance } from 'antd'
import type { paymentInfoProps, dataProps } from './data'

import { bankCardInfoModify } from '@/services/product-performance-management/AED-course-list'
import { getBanks } from '@/services/supplier-management/supplier-list'

const PaymentInfo: FC<paymentInfoProps> = ({visible, setVisible, data, callback}) => {
  const [bankList, setBankList] = useState([])
  const [code, setCode] = useState<string>()
  const form = useRef<FormInstance>()
  const user = window.localStorage.getItem('user') as string
  const id = JSON.parse(user).id
  const name = JSON.parse(user).username

  useEffect(()=> {
    if(data) {
      form.current?.setFieldsValue({
        mobile: data.mobile,
        buyerMobile: data.buyerMobile,
        orderNo: data.orderSn,
        payTime: data.payTime,
        orderStatus: data.orderStatusDesc
      })
    }
  }, [data])

  useEffect(()=>{
    const obj: {value: string, bankName: string}[] = bankList.filter((res: {label: string}) => res.label === data?.bankName)
    form.current?.setFieldsValue({
      realName: data?.realName,
      cardNo: data?.cardNo,
      bankCode: obj[0]?.value,
      bankName: data?.bankName,
      bankBranchName: data?.bankBranchName
    })
  }, [bankList])

  useEffect(()=> {
    const obj: {label: string}[] = bankList.filter((res: {value: string}) => res.value === code)
    form.current?.setFieldsValue({
      bankName: obj[0]?.label
    })
  }, [code]) 

  useEffect(()=> {
    getBanks().then(res=> {
      setBankList(res)
    })
    return ()=> {
      setBankList([])
    }
  },[])

  const submit = (v: dataProps) => {
    return new Promise<void>((resolve, reject) => {
      bankCardInfoModify({
        ...v,
        operateId: id,
        operator: name
      },{
        showSuccess: true
      }).then(res => {
        if(res.code === 0) {
          resolve()
        } else {
          reject()
        }
      })
    })
  }

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
      labelCol={{span: 6}}
      formRef={form}
      visible={visible}
      onVisibleChange={setVisible}
      onFinish={async (values: dataProps)=> {
        await submit(values)
        callback()
        return true
      }}
    >
      <ProFormText
        label='下单人手机号'
        name='buyerMobile'
        readonly
      />
      <ProFormText
        label='订单号'
        name='orderNo'
        readonly
      />
      <ProFormText
        label='订单支付时间'
        name='payTime'
        readonly
      />
      <ProFormText
        label='订单状态'
        name='orderStatus'
        readonly
      />
      <ProFormText
        label='收款人'
        name='realName'
        width='md'
        fieldProps={{
          placeholder: '请输入收款人姓名'
        }}
      />
      <ProFormText
         label='银行卡号'
         name='cardNo'
         width='md'
         fieldProps={{
           placeholder: '请输入银行卡号'
         }}
      />
      <ProFormSelect
        width="md"
        label="开户银行"
        name="bankCode"
        options={bankList}
        fieldProps={{
          placeholder: '请选择开户行',
          onSelect: (e: string) => setCode(e)
        }}
      />
      <ProFormText
        name='bankName'
        hidden
      />
      <ProFormText
         label='支行名称'
         width='md'
         name='bankBranchName'
         fieldProps={{
           placeholder: '请输入支行名称'
         }}
      />
      <ProFormText
         label='手机号码'
         width='md'
         name='mobile'
         fieldProps={{
           placeholder: '请输入手机号码'
         }}
      />
    </ModalForm>
  )
}

export default PaymentInfo