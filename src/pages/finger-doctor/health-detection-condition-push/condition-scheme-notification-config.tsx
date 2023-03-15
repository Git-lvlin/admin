import { useState, useEffect, useRef } from 'react'
import { DrawerForm, ProFormText, ProFormDigit } from '@ant-design/pro-form'
import { message } from 'antd'

import type { FC } from 'react'
import type { FormInstance } from 'antd'
import type { NotificationConfigProps, dataProps } from './data'

import styles from './styles.less'
import { solutionsPushConfig, getSolutionsPushConfig } from '@/services/finger-doctor/health-detection-condition-push'

const ConditionSchemeNotificationConfig: FC<NotificationConfigProps> = ({visible, setVisible, callback}) => {
  const [data, setData] = useState<dataProps>()
  const form = useRef<FormInstance>()


  useEffect(()=> {
    getSolutionsPushConfig({}).then(res => {
      if(res.code === 0) {
        setData(res.data)
      }
    })
  }, [])

  useEffect(()=>{
    if(data) {
      form.current?.setFieldsValue({
        title: data.title,
        content: data.content,
        time: data.time
      })
    }
  }, [data])

  const submit = (v: any) => {
    return new Promise<void>((resolve, reject) => {
      solutionsPushConfig(v, {showSuccess: true}).then(res => {
        if(res.code === 0) {
          resolve()
          callback()
        } else {
          message.error('操作失败')
          reject()
        }
      })
    })
  }

  return (
    <DrawerForm
      title='调理方案通知配置'
      width={800}
      formRef={form}
      layout='horizontal'
      onFinish={async (v)=> {
        await submit(v)
      }}
      drawerProps={{
        destroyOnClose: true
      }}
      labelCol={{span: 10}}
      visible={visible}
      onVisibleChange={setVisible}
      className={styles.drawer}
      submitter={{
        searchConfig: {
          submitText: '保存',
          resetText: '返回'
        }
      }}
    >
      <ProFormText
        label='推送消息标题'
        name='title'
        width='md'
      />
      <ProFormText
        label='推送消息文案'
        name='content'
        width='md'
      />
      <ProFormDigit
        label='推送消息时间'
        name='time'
        fieldProps={{
          addonBefore:'调整方案设置完成后',
          addonAfter:"小时推送",
          controls: false
        }}
      />
    </DrawerForm>
  )
}

export default ConditionSchemeNotificationConfig
