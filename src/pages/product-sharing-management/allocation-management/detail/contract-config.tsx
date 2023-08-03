import { ModalForm, ProFormTextArea } from '@ant-design/pro-form'
import { useEffect, useRef } from 'react'

import type { FormInstance } from 'antd'

type contractConfigProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  callback: (e: any) => void
  flag: React.Dispatch<React.SetStateAction<boolean>>
  data?: string
}

const ContractConfig: React.FC<contractConfigProps> = ({visible, setVisible, callback, flag, data}) => {
  const form = useRef<FormInstance>()

  useEffect(()=> {
    if(data) {
      form.current?.setFieldsValue({
        contractCode: data
      })
    }
  }, [data])

  const submit = (v: any) => {
    return new Promise<void>((resolve) => {
      callback(v)
      flag(true)
      resolve()
    })
  }

  return (
    <ModalForm
      title='法大大电子合同配置'
      visible={visible}
      onVisibleChange={setVisible}
      width={600}
      formRef={form}
      onFinish={async (v) => {
        await submit(v.contractCode)
        return true
      }}
      modalProps={{
        destroyOnClose: true
      }}
      layout='horizontal'
      labelCol={{
        span: 6
      }}
    >
      <ProFormTextArea
        label='合同配置'
        name='contractCode'
        placeholder='请输入5-200个字符'
      />
    </ModalForm>
  )
}

export default ContractConfig