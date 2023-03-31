import { useState, useEffect, useRef } from 'react'
import { 
  DrawerForm,
  ProFormText, 
  ProFormDigit, 
  ProFormTextArea,
  ProFormCheckbox
} from '@ant-design/pro-form'

import type { FC } from 'react'
import type { FormInstance } from 'antd'
import type { NotificationConfigProps, dataProps } from './data'

import styles from './styles.less'
import { solutionsPushConfig, getSolutionsPushConfig } from '@/services/finger-doctor/health-detection-condition-push'
import SubmitModal from './submit-modal'

const ConditionSchemeNotificationConfig: FC<NotificationConfigProps> = ({visible, setVisible, callback}) => {
  const [submitVisible, setSubmitVisible] = useState<boolean>(false)
  const [data, setData] = useState<dataProps>()
  const [dataSoure, setDataSoure] = useState<dataProps>()
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
        isSms: data.isSms,
        smsContent: data.smsContent,
        time: data.time
      })
    }
  }, [data])

  const submit = (v: any) => {
    setSubmitVisible(true)
    const dataSource = JSON.parse(JSON.stringify(v))
    dataSource['isSms'] = v.isSms ? Number(!!v.isSms[0]) : 0
    setDataSoure(dataSource)
  }

  return (
    <>
      <DrawerForm
        title='调理方案通知配置'
        width={800}
        formRef={form}
        layout='horizontal'
        onFinish={async (v)=> {
          submit(v)
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
        <ProFormTextArea
          label='推送消息文案'
          name='content'
          width='md'
        />
        <ProFormDigit
          label='推送消息时间'
          name='time'
          fieldProps={{
            addonBefore:'检测报告生成后',
            addonAfter:"分钟推送",
            controls: false
          }}
        />
      </DrawerForm>
      {
        submitVisible &&
        <SubmitModal
          visible={submitVisible}
          setVisible={setSubmitVisible}
          title="请确认要修改推送通知么？"
          data={dataSoure}
          callback={callback}
          api={solutionsPushConfig}
        />
      }
    </>
  )
}

export default ConditionSchemeNotificationConfig
