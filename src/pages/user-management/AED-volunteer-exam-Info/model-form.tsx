import { ModalForm, ProFormRadio } from '@ant-design/pro-form'

import type { modelProps } from './data'

import { editTrainingOffline } from '@/services/user-management/AED-volunteer-ID-info'


const Model: React.FC<modelProps> = ({phone, visible, setVisible, id, callback}) => {

  const submit = (v: any) => {
    return new Promise<void>((resolve, reject) => {
      editTrainingOffline({
        ...v,
        sumOrderId: id
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
      title={`请确认下单用户（${phone}）线下培训状态?`}
      visible={visible}
      onVisibleChange={setVisible}
      width={500}
      layout='horizontal'
      onFinish={async (values)=> {
        await submit(values)
        return true
      }}
      submitter={{
        searchConfig: {
          resetText: '关闭',
          submitText: '录入先培训状态'
        }
      }}
      labelCol={{span: 10}}
    >
      <ProFormRadio.Group
        label='线下培训状态'
        name='trainingStatus'
        rules={[{required: true}]}
        options={[
          {label: '已线下培训', value: 1},
          {label: '未线下培训', value: 2}
        ]}
      />
    </ModalForm>
  )
}

export default Model