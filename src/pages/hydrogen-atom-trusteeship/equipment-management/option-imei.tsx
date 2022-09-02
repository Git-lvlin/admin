import { ModalForm, ProFormText, ProFormTextArea } from "@ant-design/pro-form"

import type { FC } from "react"
import type { OptionImeiProps } from "./data"

import { modifyImei } from '@/services/hydrogen-atom-trusteeship/equipment-management'

const OptionImei: FC<OptionImeiProps> = (props) => {
  const { visible, setVisible, data, callback } = props

  const submit = (v: { newImei: string, optContent: string }) => {
    return new Promise<void>((resolve, reject) => {
      modifyImei({
        orderId: data?.orderId,
        ...v
      },{
        showSuccess: true
      }).then(res=> {
        if(res.code === 0) {
          callback()
          resolve()
        }else {
          reject()
        }
      })
    })
  }

  return (
    <ModalForm
      title='更改机器ID'
      visible={visible}
      onVisibleChange={setVisible}
      onFinish={async(values: {newImei: string, optContent: string})=>{
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
        label='机器所属运营商手机'
        initialValue={data?.storePhone}
        name='phone'
        readonly
      />
       <ProFormText
        label='当前机器ID'
        name='nowImei'
        initialValue={data?.imei}
        readonly
      />
      <ProFormText
        label='请输入新ID'
        name='imei'
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
        name='optContent'
        rules={[
          () => ({
            validator(_, value) {
              if (value.length < 5) {
                return Promise.reject(new Error('请输入5-50个字符'))
              }
              return Promise.resolve()
            }
          }),
          {required: true}
        ]}
        placeholder='请输入5-50个字符'
        fieldProps={{
          showCount: true,
          maxLength: 50,
        }}
        validateFirst
        width='md'
      />
    </ModalForm>
  )
}

export default OptionImei
