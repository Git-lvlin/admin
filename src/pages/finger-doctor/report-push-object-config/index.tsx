import { useEffect, useRef, useState } from 'react'
import ProForm, { ProFormCheckbox, ProFormRadio } from '@ant-design/pro-form'
import { PageContainer } from '@ant-design/pro-layout'
import { Button, message, Spin } from 'antd'

import type { FormInstance } from '@ant-design/pro-form'

import { getConfig, editConfig } from '@/services/finger-doctor/report-push-object-config'
import styles from './styles.less'

const ReportPushObjectConfig = () => {
  const [flag, setFlag] = useState<boolean>(false)
  const form = useRef<FormInstance>()

  useEffect(()=> {
    setFlag(true)
    getConfig().then(res=> {
     
      if(res.code === 0) {
        form.current?.setFieldsValue({
          pushUser: res.data?.pushUser
        })
      }
     
    }).finally(()=> {
      setFlag(false)
    })
  }, [])

  const commit = (v: string | any) => {
    return new Promise<void>((resolve, reject) => {
      editConfig({ ...v }).then(res => {
        if(res.code === 0) {
          message.success('提交成功')
          resolve()
        } else {
          reject()
        }
      })
    })
  }

  return (
    <PageContainer title={false}>
      <Spin spinning={flag}>
        <div className={styles.config}>
          <ProForm
            formRef={form}
            layout='horizontal'
            onFinish={async (values) => {
              await commit(values)
            }}
            submitter={{
              render: (props) => (
                <Button 
                  type='primary'
                  onClick={()=> {props.submit()}}
                >
                  保存
                </Button>
              )
            }}
          >
            <ProFormRadio.Group
              label='报告推送类型'
              name='pushUser'
              initialValue={1}
              layout='vertical'
              options={[
                {
                  label: '所属人',
                  value: 1,
                },
                {
                  label: '检测人和所属人',
                  value: 2,
                }
              ]}
            />
          </ProForm>
        </div>
      </Spin>
    </PageContainer>
  )
}

export default ReportPushObjectConfig