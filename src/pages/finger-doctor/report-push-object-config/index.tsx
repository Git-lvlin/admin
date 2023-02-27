import { useEffect, useRef, useState } from 'react'
import ProForm, { ProFormCheckbox } from '@ant-design/pro-form'
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
      const data: string[] = []
      if(res.code === 0) {
        if(res.data.store === 1 && res.data.user === 1) {
          data.push('推给检测设备所属人', '推给检测人')
        } else if(res.data.store === 1 && res.data.user === 0) {
          data.push('推给检测设备所属人')
        } else if(res.data.store === 0 && res.data.user === 1) {
          data.push('推给检测人')
        }
      }
      form.current?.setFieldsValue({
        type: data
      })
    }).finally(()=> {
      setFlag(false)
    })
  }, [])

  const commit = (v: string | any) => {
    const data = {}
    if(v.type[0] === '推给检测设备所属人' && v.type[1] === '推给检测人') {
      data['user'] = 1,
      data['store'] = 1
    } else if(v.type[0] === '推给检测设备所属人' && v.type[1] === undefined) {
      data['store'] = 1,
      data['user'] = 0
    } else if(v.type[0] === '推给检测人' && v.type[1] === undefined) {
      data['store'] = 0,
      data['user'] = 1
    } else {
      data['store'] = 0,
      data['user'] = 0
    }
    return new Promise<void>((resolve, reject) => {
      editConfig({
        ...data
      }).then(res => {
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
            <ProFormCheckbox.Group
              label='报告推送类型'
              name='type'
              layout='vertical'
              options={['推给检测设备所属人', '推给检测人']}
            />
          </ProForm>
        </div>
      </Spin>
    </PageContainer>
  )
}

export default ReportPushObjectConfig