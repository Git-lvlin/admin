import { useEffect, useRef } from 'react'
import { ModalForm, ProFormText } from '@ant-design/pro-form'

import type { FormInstance } from 'antd'

import { saveOrderType } from '@/services/resource'

type props = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  callback: () => void
  id?: any
}

const Edit:React.FC<props> = ({ visible, setVisible, callback, id }) => {
  const form = useRef<FormInstance>()

  useEffect(()=> {
    if(id) {
      form.current?.setFieldsValue({
        subCode: id.subCode,
        subMsg: id.subMsg
      })
    }
  }, [id])

  const submit = (v: any) => {
    return new Promise<void>((resolve, reject) => {
      saveOrderType(
        {
          ...v,
          id: id && id.id
        },
        { showSuccess: true }).then(res => {
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
      title={id ? '编辑' : '新建'}
      visible={visible}
      onVisibleChange={setVisible}
      width={500}
      formRef={form}
      labelCol={{span: 8}}
      layout='horizontal'
      onFinish={async (v)=> {
        await submit(v)
        callback()
        return true
      }}
    >
      <ProFormText
        label='子订单code'
        name='subCode'
        width='sm'
        placeholder='请输入子订单code'
      />
      <ProFormText
        label='子订单名称'
        name='subMsg'
        width='sm'
        placeholder='请输入子订单名称'
      />
    </ModalForm>
  )
}

export default Edit