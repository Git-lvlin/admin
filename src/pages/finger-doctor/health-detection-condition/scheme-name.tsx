import { useEffect, useRef } from 'react'
import { 
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormCheckbox,
  ProFormDigit,
  ProFormDependency,
} from '@ant-design/pro-form'

import type { FC } from 'react'
import type {  FormInstance } from 'antd'
import type { schemeNameProps } from './data'

import styles from './styles.less'

const SchemeName: FC<schemeNameProps> = ({visible, setVisible, title, index, formRef, type}) => {
  const form = useRef<FormInstance>()
  const multipleList = formRef?.current?.getFieldsValue()[`multipleList${type}`]

  useEffect(()=> {
    if(multipleList[index].sms) {
      form.current?.setFieldsValue({
        title: multipleList[index].sms.title,
        content: multipleList[index].sms.content,
        isSms: [Boolean(multipleList[index].sms.isSms)],
        smsContent: multipleList[index].sms.smsContent,
        time: multipleList[index].sms.time
      })
    }
  }, [])

  useEffect(()=> {
    form.current?.setFieldsValue({
      schemeName: title
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
      onFinish={async (v)=> {
        const dataSource = JSON.parse(JSON.stringify(v))
        dataSource['isSms'] = v.isSms ? Number(!!v.isSms[0]) : 0
        delete dataSource['schemeName']
        multipleList[index].sms = dataSource
        formRef.current?.setFieldsValue({
          [`multipleList${type}`]: multipleList
        })
        return true
      }}
      className={styles.schemeForm}
    >
      <ProFormText
        label='调理方案名称'
        name='schemeName'
        width='md'
        readonly
      />
      <ProFormText
        label='推送消息标题'
        name='title'
        width='md'
        fieldProps={{
          maxLength: 30,
          minLength: 5,
          placeholder: '请输入5-30个字'
        }}
        rules={[
          () => ({
            validator(_, value) {
              if (value&&value.length < 5) {
                return Promise.reject(new Error('不少于5个字符'))
              }
              return Promise.resolve()
            }
          })
        ]}
      />
      <ProFormTextArea
        label='推送消息文案'
        name='content'
        fieldProps={{
          maxLength: 50,
          minLength: 8,
          placeholder: '请输入8-50个字'
        }}
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
        width='md'
      />
      <ProFormCheckbox.Group
        label='是否要短信推送'
        name='isSms'
        options={[{label:'需要推送短信通知', value: true}]}
      />
      <ProFormDependency name={['isSms']}>
        {
          ({isSms})=> {
            if(isSms && isSms[0]) {
              return (
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
                  name='smsContent'
                  fieldProps={{
                    maxLength: 50,
                    minLength: 8,
                    placeholder: '请输入8-50个字'
                  }}
                />
              )
            } else {
              return
            }
          }
        }
      </ProFormDependency>
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