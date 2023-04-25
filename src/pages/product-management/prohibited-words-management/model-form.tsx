import { ModalForm } from '@ant-design/pro-form'

import type { modelFormProps } from './data'

import { changeSensitiveStatus } from '@/services/product-management/prohibited-words-management'

const ModelForm: React.FC<modelFormProps> = ({visible, setVisible, callback, id, type}) => {

  const submit = () => {
    return new Promise<void>((resolve, reject) => {
      changeSensitiveStatus({
        id,
        status: Number(type)
      },{
        showSuccess: true
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
      visible={visible}
      onVisibleChange={setVisible}
      title={`请确认${type === '0' ? '不限制' : '限制'}类目敏感词么？`}
      width={300}
      onFinish={async()=> {
        await submit()
        return true
      }}
      submitter={{
        searchConfig: {
          submitText: `确认${type === '0' ? '不限制' : '限制'}敏感词`,
          resetText: '取消'
        }
      }}
      modalProps={{
        destroyOnClose: true
      }}
    >

    </ModalForm>
  )
}
export default ModelForm