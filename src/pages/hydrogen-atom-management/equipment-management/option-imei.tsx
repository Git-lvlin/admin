import { ModalForm, ProFormText, ProFormTextArea } from "@ant-design/pro-form"

import type { OptionImeiProps, OptModalProps } from "./data"

import { memberDeviceImei } from '@/services/hydrogen-atom-management/equipment-management'

const OptionImei = (props: OptionImeiProps) => {
  const { visible, setVisible, data, callback } = props

  const submit = (v: OptModalProps) => {
    return new Promise<void>((resolve, reject) => {
      memberDeviceImei({
        ...v,
        id: data?.id
      },{
        showSuccess: true
      }).then(res=> {
        if(res.code === 0) {
          callback()
          resolve()
        }else {
          reject('')
        }
      })
    })
  }

  return (
    <ModalForm
      title='更改机器ID'
      visible={visible}
      onVisibleChange={setVisible}
      onFinish={async(values: OptModalProps)=>{
        await submit(values)
        return true
      }}
      layout='horizontal'
      width={600}
      modalProps={{
        destroyOnClose: true
      }}
      labelCol={{span: 6}}
      wrapperCol={{ span: 20 }}
    >
      <ProFormText
        label='机器所属用户手机'
        initialValue={data?.memberPhone}
        name='phone'
        readonly
      />
       <ProFormText
        label='当前机器ID'
        name='imei'
        initialValue={data?.imei}
        readonly
      />
      <ProFormText
        label='请输入新ID'
        name='newImei'
        placeholder='请输入新ID，3至30个字符之间'
        rules={[
          () => ({
            validator(_, value) {
              if (value.length < 3) {
                return Promise.reject(new Error('请输入3-30个字符'))
              }
              return Promise.resolve()
            }
          }),
          {required: true}
        ]}
        fieldProps={{
          maxLength: 30
        }}
        validateFirst
        width='md'
      />
      <ProFormTextArea
        label='更改说明'
        name='remark'
        rules={[
          () => ({
            validator(_, value) {
              if (value.length < 5) {
                return Promise.reject(new Error('请输入至少5个字符'))
              }
              return Promise.resolve()
            }
          }),
          {required: true}
        ]}
        placeholder='请输入至少5个字符'
        fieldProps={{
          showCount: true,
          minLength: 5,
        }}
        validateFirst
        width='md'
      />
    </ModalForm>
  )
}

export default OptionImei
