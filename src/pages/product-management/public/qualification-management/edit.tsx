import React, { useEffect, useRef, useState } from 'react'
import ProForm, { DrawerForm, ProFormText, ProFormRadio, ProFormTextArea } from '@ant-design/pro-form'
import { Tree, Spin } from 'antd';

import type { editProps } from './data'
import type { FormInstance } from 'antd'
import type { DataNode } from 'antd/es/tree';

import { goodsQlfDetail, modifyGoodsGlf } from '@/services/product-management/qualification-management'
import { categoryAll } from '@/services/common'
import Upload from '@/components/upload'
import { arrayToTree } from '@/utils/utils'

const CTree = (props: any) => {
  const { keys, onChange, treeData, ...rest } = props;
  const [selectKeys, setSelectKeys] = useState<React.Key[]>([])
  
  const onCheck = (checkedKeys: React.Key[]) => {
    setSelectKeys(checkedKeys)
    onChange(checkedKeys)
  }

  useEffect(() => {
    onChange(keys)
    setSelectKeys(keys)
  }, [keys])

  return (
    <div style={{ flex: 1 }}>
      <Tree
        treeData={treeData}
        onCheck={onCheck}
        checkedKeys={selectKeys}
        {...rest}
      />
    </div>

  )
}

const Edit: React.FC<editProps> = ({id, visible, setVisible, callback}) => {
  const [category, setCategory] = useState<DataNode[]>([])
  const [flag, setFlag] = useState<boolean>(false)
  const formRef = useRef<FormInstance>()
  const [gcInfo, setGcInfo] = useState<React.Key[]>([])
  const originData = useRef([])

  useEffect(()=> {
    setFlag(true)
    categoryAll()?.then(res => {
      if(res.code === 0) {
        originData.current = res.data.records
        const arr1: any[] = []
        const arr2: any[] = []
        const arr3: any[] = []
        
        res.data.records.forEach((item: any) => {
          if(item.level === 3) {
            arr1.push(item)
          }
        })
        arr1.forEach(item => {
          arr2.push(res.data.records.find((it: any) => item.gcParentId === it.id))
        })
        arr2.forEach(item => {
          arr3.push(res.data.records.find((it: any) => item.gcParentId === it.id))
        })
        const data = Array.from(new Set([...arr1, ...arr2, ...arr3])).map(item => ({
          ...item,
          pid: item.gcParentId,
          title: item.gcName,
          key: item.id,
          value: item.id,
          selectable: false
        }))
        const arr = arrayToTree(data || [], 0)
        let str = JSON.stringify(arr)
        const newArr = JSON.parse(str)
        setCategory(newArr)
      }
    }).finally(()=> {
      setFlag(false)
    })
  }, [])

  useEffect(()=> {
    if(id) {
      const arr: number[] = []
      goodsQlfDetail({id}).then(res => {
        if(res.code === 0) {
          res.data.category.map((item: any) => {
            arr.push(item.gcId3)
          })
          formRef.current?.setFieldsValue({
            name: res.data.name,
            intro: res.data.intro,
            qlfImg: res.data.qlfImg,
            type: res.data.type,
            status: res.data.status
          })
          setGcInfo(arr)
        }
      })
    }
  }, [id])

  const submit = (values: any) => {
    const arr: React.Key[] = []
    originData.current.map((it: any) => {
      values.category.map((res: any) => {
        if(it.level === 3 && it.id === res) {
          arr.push(res)
        }
      })
    })

    return new Promise<void>((resolve, reject) => {
      modifyGoodsGlf({
        ...values,
        id,
        category: arr,
        operateType: id ? 'edit' : 'add'
      }, {showSuccess: true}).then(res => {
        if(res.code === 0) {
          setGcInfo([])
          setCategory([])
          callback()
          resolve()
        } else {
          reject()
        }
      })
    })
  }

  return (
    <DrawerForm
      title={`${id ? '编辑' : '添加'}商品资质`}
      drawerProps={{
        destroyOnClose: true
      }}
      width={800}
      layout='horizontal'
      visible={visible}
      onVisibleChange={setVisible}
      onFinish={async (values)=> {
        await submit(values)
        return true
      }}
      formRef={formRef}
      submitter={{
        searchConfig: {
          submitText: '提交',
          resetText: '关闭'
        }
      }}
      labelCol={{span: 10}}
    >
      <Spin spinning={flag}>
        <ProFormText
          label='资质名称'
          name='name' 
          width='md'
          fieldProps={{
            placeholder: '请填写资质名称'
          }}
          rules={[{required: true}]}
        />
        <ProForm.Item
          label='选择需要资质的分类'
          name='category'
          rules={[{required: true}]}
        >
          <CTree
            treeData={category}
            checkable
            virtual={false}
            keys={gcInfo}
          />
        </ProForm.Item>
        <ProFormTextArea
          label='上传说明'
          name='intro'
          width='md'
          fieldProps={{
            placeholder: '请填写上传说明，6-60个字',
            maxLength: 60,
            showCount: true
          }}
          rules={[
            {required: true},
            {
              validator: (_, value)=> {
                if(value.length < 6) {
                  return Promise.reject('请填写上传说明，6-60个字')
                } else {
                  return Promise.resolve()
                }
              }
            }
          ]}
        />
        <ProForm.Item
          label='示例图'
          name='qlfImg'
          rules={[{required: true}]}
        >
          <Upload/>
        </ProForm.Item>
        <ProFormRadio.Group
          label='资质类型'
          name='type'
          rules={[{required: true}]}
          options={[
            {label: '必要资质', value: 1},
            {label: '可选资质', value: 2},
          ]}
        />
        <ProFormRadio.Group
          label='状态'
          name='status'
          rules={[{required: true}]}
          options={[
            {label: '开启', value: 1},
            {label: '暂不开启', value: 2},
          ]}
        />
      </Spin>
    </DrawerForm>
  )
}

export default Edit