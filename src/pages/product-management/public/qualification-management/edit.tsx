import { useEffect, useRef, useState } from 'react'
import ProForm, { DrawerForm, ProFormText, ProFormRadio, ProFormTextArea } from '@ant-design/pro-form'
import { Spin } from 'antd'

import type { editProps } from './data'
import type { FormInstance } from 'antd'

import { goodsQlfDetail, modifyGoodsGlf } from '@/services/product-management/qualification-management'
import { categoryAll } from '@/services/common'
import Upload from '@/components/upload'
import AptitudeCategory from '@/components/aptitude-category'
import { arrayToTree } from '@/utils/utils'

const Edit: React.FC<editProps> = ({id, visible, setVisible, callback}) => {
  const [category, setCategory] = useState([])
  const [originData, setOriginData] = useState([])
  const [flag, setFlag] = useState<boolean>(false)
  const formRef = useRef<FormInstance>()

  useEffect(()=> {
    if(id) {
      goodsQlfDetail({id}).then(res => {
        if(res.code === 0) {
          formRef.current?.setFieldsValue({
            name: res.data.name,
            category: res.data.category.map((item: any) => item.gcId3),
            intro: res.data.intro,
            qlfImg: res.data.qlfImg,
            type: res.data.type,
            status: res.data.status
          })
        }
      })
    }
  }, [id])

  const getAreaDatas = (v) => {
    const arr = [];
    let str = JSON.stringify(originData)
    str = str.replace(/gcParentId/g, 'pid')
    const data = arrayToTree(JSON.parse(str))
    console.log('data', data);
    v?.forEach?.(item => {
      let node = data.find(it => it.id === item);
      if(node.children) {
        const toTreeData = (data) => {
          data?.forEach(item => {
            if (item.level === 3) {
              arr.push(item.id)
            }
            if (item.children) {
              toTreeData(item.children)
            }
            
          })
        }
        toTreeData(node?.children)
      } else {
        arr.push(node.id)
      }
    })
    return arr;
  }

  useEffect(()=> {
    setFlag(true)
    categoryAll()?.then(res => {
      if(res.code === 0) {
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
          pid: item.gcParentId
        }))
        const arr = arrayToTree(data || [], 0)
        let str = JSON.stringify(arr)
        str = str.replace(/gcName/g, 'label').replace(/id/g, 'value')
        const newArr = JSON.parse(str)
        setOriginData(data)
        setCategory(newArr)
      }
    }).finally(()=> {
      setFlag(false)
    })
  }, [])

  const submit = (values: any) => {
    return new Promise<void>((resolve, reject) => {
      
      try {
        console.log('values', getAreaDatas(values.category));
      } catch (error) {
        console.log('error',error);
      }
      // modifyGoodsGlf({
      //   ...values,
      //   id,
      //   operateType: id ? 'edit' : 'add'
      // }, {showSuccess: true}).then(res => {
      //   if(res.code === 0) {
      //     callback()
      //     resolve()
      //   } else {
      //     reject()
      //   }
      // })
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
        <AptitudeCategory 
          maxLength={Number.MAX_SAFE_INTEGER} 
          data={category} 
          uncheckableItemValues={[]}
          searchable={false}
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