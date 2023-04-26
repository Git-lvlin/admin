import { useState, useRef, useEffect } from 'react'
import ProForm,{ ProFormRadio, ProFormTextArea } from '@ant-design/pro-form'
import { Button } from 'antd'

import type { dataProps } from './data'
import type { FormInstance } from 'antd'

import { detailSensitiveData, saveAedUserInfo, editSensitiveData } from '@/services/product-management/prohibited-words-management'

const GlobalProhibitedWords: React.FC = () => {
  const [data, setData] = useState<dataProps>()
  const form = useRef<FormInstance>()

  useEffect(()=> {
    detailSensitiveData({
      gcId1: 0,
      gcId2: 0
    }).then(res => {
      setData(res.data)
    })
  }, [])

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
    return new Promise<void>((resolve, reject) => {
      if(data?.id) {
        editSensitiveData({
          id: data.id,
          ...values,
          words: str
        }, {showSuccess: true})
      } else {
        saveAedUserInfo({
          gcId1: 0,
          gcId2: 0,
          ...values,
          words: str
        })
      }
    })
  }

  return (
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
          placeholder: '请输入此分类商品的违禁词，多个违禁词逗号分隔，不重复，不超过1000个字',
          maxLength: 1000,
          showCount: true
        }}
        width='lg'
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
  )
}

export default GlobalProhibitedWords