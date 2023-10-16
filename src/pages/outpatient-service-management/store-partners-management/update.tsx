import { useEffect, useRef } from 'react'
import { ModalForm, ProFormRadio, ProFormText } from '@ant-design/pro-form'

import type { FormInstance } from 'antd'

import { shopPartnerChange } from '@/services/outpatient-service-management/store-partners-management'

type Props = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  callback: () => void
  data: any
}

const Update:React.FC<Props> = ({visible, setVisible, callback, data}) => {
  const form = useRef<FormInstance>()

  useEffect(()=> {
    if(data) {
      form.current?.setFieldsValue({
        houseFullName: data?.houseFullName,
        area: data?.area,
        trainingStatus: data?.trainingStatus
      })
    }
  }, [data])

  const submit = (v: any) => {
    return new Promise<void>((resolve, reject) => {
      shopPartnerChange(v).then(res => {
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
      title='更新培训状态'
      width={500}
      visible={visible}
      onVisibleChange={setVisible}
      formRef={form}
      onFinish={async (v)=> {
        await submit(v)
        callback()
        return true
      }}
      layout='horizontal'
      labelCol={{span: 10}}
    >
      <ProFormText
        label='合作商编号'
        name='houseFullName'
        readonly
      />
      <ProFormText
        label='所在地'
        name='area'
        readonly
      />
      <ProFormRadio.Group
        label='培训状态'
        name='trainingStatus'
        options={[
          {label: '已培训', value: 1},
          {label: '未培训', value: 2}
        ]}
      />
    </ModalForm>
  )
}

export default Update