import { useEffect, useRef, useState } from 'react'
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form'

import type { FormInstance } from 'antd'
import type { noticeProps } from './data'

import { ship } from '@/services/product-performance-management/early-user-management'
import { getExpressList } from '@/services/common'

const Sampling: React.FC<noticeProps> = ({ visible, setVisible, data, callback}) => {
  const [companyList, setCompanyList] = useState()
  const form = useRef<FormInstance>()

  useEffect(()=> {
    if(data) {      
      form.current?.setFieldsValue({
        name: data?.signUser,
        phone: data?.signMemberPhone,
        consigneePhone: data?.consigneePhone
      })
    }
  }, [data])

  useEffect(()=> {
    getExpressList().then(res=> {
      if(res?.code === 0) {
        setCompanyList(res.data?.companyList.map((res: any) => ({label: res.expressName, value: res.id})))
      }
    })
  }, [])

  const submit = (e: any) => {
    return new Promise<void>((resolve, reject) => {
      ship({
        ...e,
        subOrderSn: data?.subOrderSn
      }, {
        showSuccess: true
      }).then(res => {
        if(res.code === 0) {
          callback()
          resolve()
        } else {
          reject()
        }
      })
    })
  }

  return (
    <ModalForm
      visible={visible}
      onVisibleChange={setVisible}
      title='样本发货'
      layout='horizontal'
      onFinish={async(v)=> {
        await submit(v)
        return true
      }}
      width={500}
      labelCol={{span: 6}}
      formRef={form}
    >
      <ProFormText
        label='早筛人姓名'
        name='name'
        readonly
      />
      <ProFormText
        label='早筛人手机'
        name='phone'
        readonly
      />
      <ProFormText
        label='液体活检编号'
        name='detectionNo'
        width='md'
      />
      <ProFormSelect
        label='物流公司名称'
        name='expressId'
        options={companyList}
        width='md'
      />
      <ProFormText
        label='物流运单编号'
        name='shippingCode'
        width='md'
      />
      <ProFormText
        label='收件人手机号'
        name='consigneePhone'
        width='md'
      />
    </ModalForm>
  )
}

export default Sampling