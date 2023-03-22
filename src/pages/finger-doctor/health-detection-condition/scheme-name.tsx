import { useState, useEffect, useRef } from 'react'
import { 
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormCheckbox,
  ProFormDigit,
} from '@ant-design/pro-form'

import type { FC } from 'react'
import type {  FormInstance } from 'antd'
import type { schemeNameProps } from './data'

import styles from './styles.less'

const SchemeName: FC<schemeNameProps> = ({visible, setVisible, title}) => {
  const [msgVisible, setMsgVisible] = useState<boolean>(false)
  const form = useRef<FormInstance>()

  useEffect(()=> {
    form.current?.setFieldsValue({
      title
    })
  }, [title])

  return (
    <ModalForm
      title='配置推送通知'
      layout='horizontal'
      width={500}
      formRef={form}
      visible={visible}
      onVisibleChange={setVisible}
      modalProps={{
        destroyOnClose: true
      }}
      onFinish={async ()=> {

      }}
      className={styles.scheme}
    >
      <ProFormText
        label='推送消息标题'
        name='title'
        width='md'
        readonly
      />
      <ProFormTextArea
        label='推送消息文案'
        name='content'
        width='md'
      />
      <ProFormCheckbox.Group
        label='是否要短信推送'
        name='isPush'
        options={[{label:'需要推送短信通知', value: true}]}
        fieldProps={{
          onChange: (e) => setMsgVisible(e[0] as boolean)
        }}
      />
      {
        msgVisible &&
        <ProFormTextArea
          rules={[
            () => ({
              validator(_, value) {
                if (value&&value.length < 8) {
                  return Promise.reject(new Error('不少于8个字符'))
                }
                return Promise.resolve()
              }
            })
          ]}
          label='短信内容'
          name=''
          fieldProps={{
            maxLength: 50,
            minLength: 8,
            placeholder: '请输入8-50个字'
          }}
        />
      }
      <ProFormDigit
        label='推送消息时间'
        name='time'
        fieldProps={{
          addonBefore:'检测报告生成后',
          addonAfter:"分钟推送",
          controls: false
        }}
      />
    </ModalForm>
  )
}

export default SchemeName