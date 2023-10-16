import { ModalForm, ProFormRadio } from '@ant-design/pro-form'

import { mainSwitch } from '@/services/cms/ads-management'

type props = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  callback: () => void
}

const MainSwitch: React.FC<props> = ({visible, setVisible, callback}) => {

  const submit = (v: any) => {
    return new Promise<void>((resolve, reject) => {
      mainSwitch(v, { showSuccess: true }).then (res => {
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
      visible={visible}
      onVisibleChange={setVisible}
      title='总开关设置'
      onFinish={async (v)=> {
        await submit(v)
        callback()
        return true
      }}
      width={500}
      labelCol={{span: 8}}
      wrapperCol={{span: 16}}
      layout='horizontal'
    >
      <ProFormRadio.Group
        label='总开关'
        name='switch'
        options={[
          {label: '关闭所有广告', value: 2},
          {label: '按各广告位展示状态显示所有广告', value: 1}
        ]}
      />
    </ModalForm>
  )
}

export default MainSwitch