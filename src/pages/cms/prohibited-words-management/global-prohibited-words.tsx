import { useState, useRef, useEffect } from 'react'
import ProForm,{ ProFormRadio, ProFormTextArea } from '@ant-design/pro-form'
import { Button, Spin } from 'antd'

import type { dataProps } from './data'
import type { FormInstance } from 'antd'

import { detailSensitiveData, saveAedUserInfo, editSensitiveData } from '@/services/product-management/prohibited-words-management'
import { removeEmpty } from '@/utils/utils'

const GlobalProhibitedWords: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<dataProps>()
  const [change, setChange] = useState<number>(0)
  const form = useRef<FormInstance>()

  useEffect(()=> {
    setLoading(true)
    detailSensitiveData({
      gcId1: 0,
      gcId2: 0
    }).then(res => {
      setData(res.data)
      setLoading(false)
    })
  }, [change])

  useEffect(()=> {
    if(data) {
      form.current?.setFieldsValue({
        words: data.words,
        status: data.status
      })
    }
  }, [data])

  const submit = (values: any) => {
    const { words } = values
    const str = words.replaceAll('，', ',')
    const source = [...new Set(removeEmpty(str.split(',')))].join(',')
    return new Promise<void>(() => {
      if(data?.id) {
        editSensitiveData({
          id: data.id,
          ...values,
          words: source
        }, {showSuccess: true}).then(res => {
          if(res.code === 0) {
            setChange(change + 1)
          }
        })
      } else {
        saveAedUserInfo({
          gcId1: 0,
          gcId2: 0,
          ...values,
          words: source
        }).then(res => {
          if(res.code === 0) {
            setChange(change + 1)
          }
        })
      }
    })
  }

  return (
    <Spin spinning={loading}>
      <ProForm
        layout='horizontal'
        formRef={form}
        onFinish={async (values)=> {
          await submit(values)
          return true
        }}
        labelCol={{span: 9}}
        submitter={{
          render: (props) => {
            return [
              <div key="submit" style={{textAlign: 'center'}}>
                <Button type='primary' onClick={() => props.form?.submit?.()}>
                  更新
                </Button>
              </div>
            ];
          },
        }}
      >
        <ProFormTextArea
          label='违禁词'
          name='words'
          rules={[{required: true}]}
          fieldProps={{
            placeholder: '请输入此分类商品的违禁词，多个违禁词逗号分隔，不重复，不超过3000个字',
            maxLength: 3000,
            showCount: true,
            rows: 10
          }}
          extra='多个违禁词请使用逗号分隔'
          width='xl'
        />
        <ProFormRadio.Group
          label='状态'
          name='status'
          rules={[{required: true}]}
          options={[
            {label: '限制敏感词录入', value: 1},
            {label: '不限制敏感词录入', value: 0}
          ]}
          width='md'
        />
      </ProForm>
    </Spin>
  )
}

export default GlobalProhibitedWords