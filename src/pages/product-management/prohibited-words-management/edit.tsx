import { useState, useRef, useEffect } from 'react'
import { DrawerForm, ProFormRadio, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form'

import type { editProps, dataProps } from './data'
import type { FormInstance } from 'antd'

import { category } from '@/services/product-management/product-category'
import { 
  saveAedUserInfo,
  editSensitiveData,
  detailSensitiveData,
  appendSensitiveData,
  getEditedCategoryList
} from '@/services/product-management/prohibited-words-management'

const Edit: React.FC<editProps> = ({visible, setVisible, id1, id2, callback, type}) => {
  const [list, setList] = useState([])
  const [data, setData] = useState<dataProps>()
  const form = useRef<FormInstance>()

  useEffect(()=> {
    if(id1) {
      detailSensitiveData({
        gcId1: id1,
        gcId2: id2
      }).then(res => {
        setData(res.data)
      })
    }
  }, [id1])

  useEffect(()=> {
    if(data) {
      form.current?.setFieldsValue({
        gcId1: data.gcId1Name,
        gcId2: data.gcId2Name,
        words: data.words,
        status: data.status
      })
    }
  }, [data])

  useEffect(()=> {
    if(!id1) {
      if(type === 'add') {
        category({gcParentId: 0}).then(res => {
          if(res.code === 0) {
            setList(res.data.records.map((item: {gcName: string, id: number}) => ({
              label: item.gcName,
              value: item.id
            })))
          }
        })
      } else {
        getEditedCategoryList().then(res => {
          if(res.code === 0) {
            setList(res.data.map((item: {gcIdName: string, id: number}) => ({
              label: item.gcIdName,
              value: item.id
            })))
          }
        })
      }
    }
  },[id1])

  const submit = (values: any) => {
    const { words } = values
    const str = words.replaceAll('，', ',')
    const actStr = type === 'push' ? 1 : 2 
    return new Promise<void>((resolve, reject) => {
      if(type === 'add') {
        saveAedUserInfo({...values, words: str, gcId2: 0}, {showSuccess: true}).then(res => {
          if(res.code === 0) {
            callback()
            resolve()
          } else {
            reject()
          }
        })
      } else if(type === 'edit'){
        editSensitiveData({
          id: data?.id,
          ...values,
          words: str
        },
        {
          showSuccess: true
        }).then(res => {
          if(res.code === 0) {
            callback()
            resolve()
          } else {
            reject()
          }
        })
      } else {
        appendSensitiveData({
          actType: actStr,
          ...values,
          words: str
        },{
          showSuccess: true
        }).then(res => {
          if(res.code === 0) {
            callback()
            resolve()
          } else {
            reject()
          }
        })
      }
    })
  }

  const title = {
    'add': '新建',
    'edit': '编辑',
    'push': '追加',
    'delete': '删除'
  }[type]

  return (
    <DrawerForm
      title={`${title}违禁词`}
      layout='horizontal'
      visible={visible}
      formRef={form}
      onVisibleChange={setVisible}
      width={1000}
      onFinish={async (values)=> {
        await submit(values)
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
        type !== 'all' &&
        <ProFormSelect
          label='一级分类'
          name='gcId1'
          rules={[{required: true}]}
          readonly={id1 ? true : false}
          width='md'
          options={list}
        />
      }
      {
        type === 'edit' &&
        <ProFormSelect
          label='二级分类'
          name='gcId2'
          rules={[{required: true}]}
          readonly={id1 ? true : false}
          width='md'
          options={list}
        />
      }
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
      {
        (type === 'add' || type === 'edit') &&
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
      }
    </DrawerForm>
  )
}

export default Edit