import { ModalForm } from '@ant-design/pro-form'

import { modelFormProps } from './data'

const ModelForm: React.FC<modelFormProps> = ({visible, setVisible, callback, id}) => {
  return (
    <ModalForm
      visible={visible}
      onVisibleChange={setVisible}
      title='请确认不限制类目敏感词么？'
      width={300}
      onFinish={async()=> {

      }}
      submitter={{
        searchConfig: {
          submitText: '确认不限制敏感词',
          resetText: '限制敏感词'
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