import { ModalForm } from '@ant-design/pro-form'

import type { FC } from 'react'
import { submitModalProps } from './data'

const SubmitModal: FC<submitModalProps> = ({visible, setVisible, title, api, data, callback}) => {

  const submit = () => {
    return new Promise<void>((resolve, reject) => {
      api?.(data, {showSuccess: true}).then((res: any) => {
        if(res.code === 0) {
          resolve()
          callback()
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
      title={title}
      width={400}
      onFinish={async ()=> {
        await submit()
      }}
      submitter={{
        searchConfig: {
          submitText: '确认修改',
          resetText: '取消修改'
        }
      }}
    >
      <div style={{color: '#FF0000'}}>确认后立即生效且无法取消！</div>
      <div>你还要继续吗？</div>
    </ModalForm>
  )
}

export default SubmitModal
