import { useState, useEffect, useRef } from 'react'
import ProForm, { ModalForm, ProFormDependency, ProFormRadio, ProFormText, ProFormTextArea } from '@ant-design/pro-form'
import { Space } from "antd"

import type { FC } from 'react'
import type { ImageDetailProps, DataProps } from './data'
import { FormInstance, Image } from 'antd'

import { detail, delImg } from "@/services/health-package-activities/promotion-activity-management"
import Upload from "@/components/upload"

const ImageDetail: FC<ImageDetailProps> = ({visible, handleCancel, storeNo, callback}) => {
  const [data, setData] = useState<DataProps>()
  const [flag, setFlag] = useState<boolean>(false)
  const form = useRef<FormInstance>()

  useEffect(()=> {
    detail({storeNo}).then(res => {
      if(res.success) {
        setData(res.data)
      }
    })
  }, [])

  useEffect(()=>{
    form.current?.setFieldsValue({
      storeName: data?.storeName,
      address: data?.address,
      type: flag,
      img: data?.img
    })
  }, [data])

  const submit = (values: DataProps) => {
    return new Promise<void>((resolve, reject) => {
      if(flag) {
        delImg(
          {
            storeNo,
            ...values
          },
          {
            showSuccess: true
          }
        ).then(res => {
          if(res.code === 0) {
            resolve()
            callback()
          } else {
            reject()
          }
        })
      } else {
        resolve()
        callback()
      }
    })
  }

  return (
    <ModalForm
      title='店铺门店图片'
      visible={visible}
      modalProps={{
        destroyOnClose: true
      }}
      width={500}
      layout='horizontal'
      onVisibleChange={handleCancel}
      onFinish={async (v: DataProps)=> {
        await submit(v)
        return true
      }}
      formRef={form}
    >
      <ProFormText
        label='店铺名称'
        name='storeName'
        readonly
      />
      <ProFormText
        label='店铺地址'
        name='address'
        readonly
      />
      <ProFormRadio.Group
        name="type"
        label="操作类型"
        fieldProps={{
          onChange: (e) => setFlag(e.target.value)
        }}
        options={[
          {
            label: '查看',
            value: false,
          },
          {
            label: '删除门店图片',
            value: true,
          }
        ]}
      />
      <ProFormDependency name={['type']}>
        {
          ({ type }) => {
            if(type) {
              return (
                <>
                  <ProForm.Item
                    label='门店图片'
                    name='img'
                  >
                    <Upload maxCount={data?.img.length}/>
                  </ProForm.Item>
                  <ProFormTextArea
                    label='删除原因'
                    name='reason'
                    placeholder="请输入删除原因"
                    validateFirst
                    rules={[
                      () => ({
                        validator(_, value) {
                          if (value && value.length < 3) {
                            return Promise.reject(new Error('请输入删除原因，3-100个字符'))
                          }
                          return Promise.resolve()
                        }
                      }),
                      { required: true }
                    ]}
                    fieldProps={{
                      maxLength: 100,
                      showCount: true
                    }}
                  />
                </>
              )
            } else {
              return (
                <ProForm.Item
                  label='门店图片'
                  name='img'
                >
                  <Space size={20}>
                    {
                      data?.img.map((res, idx)=> (
                        <Image
                          key={idx}
                          src={res}
                          width={80}
                          height={80}
                        />
                      ))
                    }
                  </Space>
                </ProForm.Item>
              )
            }
          }
        }
      </ProFormDependency>
      <div style={{color: '#E66B07'}}>备注：删除图片将会通知店主</div>
    </ModalForm>
  )
}

export default ImageDetail