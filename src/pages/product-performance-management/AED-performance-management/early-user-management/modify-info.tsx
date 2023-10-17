import { useEffect, useRef } from 'react'
import { ModalForm, ProFormText } from '@ant-design/pro-form'

import type { FormInstance } from 'antd'

import { updateUserInfo } from '@/services/product-performance-management/early-user-management'

type props = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  data: any
  callback: ()=> void
}

const ModifyInfo:React.FC<props> = ({visible, setVisible, data, callback}) => {
  const form = useRef<FormInstance>()

  const operator = window.localStorage.getItem('nickname')

  useEffect(()=> {
    form.current?.setFieldsValue({
      signCode: data?.signCode,
      gender: data?.senderDesc,
      name: data?.signUser,
      phone: data?.signMemberPhone,
      cardNo: data?.idcard,
      operator
    })
  }, [data])

  const submit = (v: any) => {
    return new Promise<void>((resolve, reject) => {
      updateUserInfo({
        ...v,
        subOrderSn: data.subOrderSn
      }, {
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
      title='修改早筛人信息'
      visible={visible}
      onVisibleChange={setVisible}
      layout='horizontal'
      labelCol={{span: 8}}
      width={600}
      onFinish={async (v)=> {
        await submit(v)
        callback()
        return true
      }}
      formRef={form}
    >
      <ProFormText
        label='早筛码'
        name='signCode'
        readonly
      />
      <ProFormText
        label='早筛人性别'
        name='gender'
        readonly
      />
      <ProFormText
        label='早筛人姓名'
        name='name'
        width='md'
      />
      <ProFormText
        label='早筛人手机号'
        name='phone'
        width='md'
      />
      <ProFormText
        label='早筛人身份证号'
        name='cardNo'
        width='md'
      />
      <ProFormText
        label='操作人'
        name='operator'
        readonly
      />
    </ModalForm>
  )
}

export default ModifyInfo