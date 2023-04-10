import { useEffect, useRef, useState } from 'react'
import ProForm, { 
  DrawerForm,
  ProFormRadio, 
  ProFormText 
} from "@ant-design/pro-form"
import { Image, Space } from "antd"

import type { FC } from 'react'
import type { FormInstance } from 'antd'
import type { editProps } from './data'

import Upload from '@/components/upload'

const Edit: FC<editProps> = ({visible, setVisible, phone}) => {
  const [imgVisible, setImgVisible] = useState<boolean>(false)
  const form = useRef<FormInstance>()

  useEffect(()=> {
    if(phone) {
      form.current?.setFieldsValue({
        memberPhone: phone
      })
    }
  }, [phone])

  const URL = 'https://dev-yeahgo.oss-cn-shenzhen.aliyuncs.com/publicMobile/training-course-examination/ic_aed_certificate.png'
  const IMG_URL = 'https://dev-yeahgo.oss-cn-shenzhen.aliyuncs.com/publicMobile/training-course-examination/image1.png'

  return (
    <DrawerForm
      title='编辑志愿者证件信息'
      visible={visible}
      onVisibleChange={setVisible}
      layout='horizontal'
      onFinish={async (v)=>{
        console.log(v);
        
      }}
      width={800}
      labelCol={{span: 6}}
      formRef={form}
    >
      <ProFormText
        label='用户手机'
        name='memberPhone'
        readonly
      />
      <ProFormText
        label='用户姓名'
        name=''
        rules={[{
          required: true
        }]}
        width='md'
      />
      <ProFormRadio.Group
        label='用户性别'
        name=''
        options={[
          {label: '男', value: '1'},
          {label: '女', value: '2'},
        ]}
        rules={[{
          required: true
        }]}
      />
      <ProFormRadio.Group
        label='服装尺码'
        name=''
        options={[
          {label: 'M', value: '1'},
          {label: 'L', value: '2'},
          {label: 'XL', value: '3'},
          {label: 'XXL', value: '4'},
          {label: 'XXXL', value: '5'},
          {label: 'XXXXL', value: '6'},
        ]}
        rules={[{
          required: true
        }]}
      />
      <ProForm.Item
        label='证件照片'
        name=''
        rules={[{
          required: true,
          message: '请上传证件照片'
        }]}
      >
        <Space size='small'>
          <Upload/>
          <div>
            <div style={{color: '#E18906'}}>请上传一寸蓝底照片！</div>
            <a onClick={()=> setImgVisible(true)}>查看示例</a>
          </div>
        </Space>
      </ProForm.Item>
      <ProForm.Item
        label='证件示例'
        name='test'
      >
        <Image
          src={URL}
        />
      </ProForm.Item>
      {
        imgVisible &&
        <Image
          width={200}
          style={{ display: 'none' }}
          src={IMG_URL}
          preview={{
            visible,
            src: IMG_URL,
            onVisibleChange: (value) => {
              setImgVisible(value)
            }
          }}
        />
      }
    </DrawerForm>
  )
}

export default Edit
