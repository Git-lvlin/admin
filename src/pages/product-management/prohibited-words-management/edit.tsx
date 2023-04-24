import { useState, useRef, useEffect } from 'react'
import { DrawerForm, ProFormRadio, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form'

import type { editProps } from './data'
import type { FormInstance } from 'antd'

const Edit: React.FC<editProps> = ({visible, setVisible, id, callback}) => {
  const form = useRef<FormInstance>()

  useEffect(()=> {
    if(id) {
      form.current?.setFieldsValue({

      })
    }
  }, [id])

  const submit = () => {
    return new Promise<void>((resolve, reject) => {
      
    })
  }

  return (
    <DrawerForm
      title={`${id ? '编辑' : '新增'}违禁词`}
      layout='horizontal'
      visible={visible}
      formRef={form}
      onVisibleChange={setVisible}
      width={1000}
      onFinish={async ()=> {
        await submit()
        return true
      }}
      labelCol={{span: 7}}
      submitter={{
        searchConfig: {
          submitText: '提交',
          resetText: '返回'
        }
      }}
    >
      {
        
        <ProFormSelect
          label='一级分类'
          name=''
          rules={[{required: true}]}
          readonly={id ? true : false}
          width='md'
        />
      }
      <ProFormTextArea
        label='违禁词'
        name=''
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
        name=''
        rules={[{required: true}]}
        options={[
          {label: '限制敏感词录入', value: 1},
          {label: '不限制敏感词录入', value: 2}
        ]}
        width='md'
      />
    </DrawerForm>
  )
}

export default Edit