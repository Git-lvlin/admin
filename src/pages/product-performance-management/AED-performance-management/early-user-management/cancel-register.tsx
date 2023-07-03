import { useEffect, useRef } from 'react'
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form'

import type { FormInstance } from 'antd'
import type { cancelRegisterProps } from './data'

import { cancelSign } from '@/services/product-performance-management/early-user-management'
import styles from './styles.less'

const CancelRegister: React.FC<cancelRegisterProps> = ({visible, setVisible, data, callback}) => {
  const form = useRef<FormInstance>()

  useEffect(()=> {
    form.current?.setFieldsValue({
      state: data?.processDesc,
      userPhone: data?.memberPhone,
      buyerPhone: data?.signMemberPhone,
      operator: window.localStorage.getItem('nickname')
    })
  }, [])

  const submit = (value: any) => {
    return new Promise<void>((resolve, reject) => {
      cancelSign({...value, id: data?.signId}, { showSuccess: true }).then(res => {
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
      title='取消报名'
      width={500}
      visible={visible}
      onVisibleChange={setVisible}
      formRef={form}
      layout='horizontal'
      modalProps={{
        destroyOnClose: true
      }}
      onFinish={async (values)=> {
        await submit(values)
        return true
      }}
      labelCol={{span: 6}}
      submitter={{
        searchConfig: {
          submitText: '确定取消报名',
          resetText: '关闭'
        }
      }}
    >
      <div className={styles.cancel}>确认要取消用户的报名么？</div>
      <ProFormText
        label='状态'
        name='state'
        readonly
      />
      <ProFormText 
        label='用户手机号'
        name='userPhone'
        readonly
      />
      <ProFormText 
        label='下单人手机号'
        name='buyerPhone'
        readonly
      />
      <ProFormTextArea
        label='备注'
        name='remark'
        fieldProps={{
          placeholder: '请输入至少5-50个字符',
          maxLength: 50,
          showCount: true
        }}
        width='md'
        rules={[{
          validator: (_, value) => {
            if(value?.length < 5) {
              return Promise.reject("请输入至少5-50个字符")
            } else {
              return Promise.resolve()
            }
          }
        }]}
      />
      <ProFormText
        label='操作人'
        name='operator'
        readonly
      />
      <div>确认取消报名前，请与下单人和对应子公司沟通确认清楚，以防下单人钱款或子公司耗材及精力损失。</div>
    </ModalForm>
  )
}

export default CancelRegister