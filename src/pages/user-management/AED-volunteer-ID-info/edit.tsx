import { useEffect, useRef, useState } from 'react'
import ProForm, { 
  DrawerForm,
  ProFormRadio, 
  ProFormText 
} from "@ant-design/pro-form"
import { Image } from "antd"

import type { FC } from 'react'
import type { FormInstance } from 'antd'
import type { editProps } from './data'

import Upload from '@/components/upload'
import { saveAedUserInfo } from '@/services/user-management/AED-volunteer-ID-info'

const FromWrap: FC<{value?: string, onChange?: ()=> void, content: (value: string, onChange: ()=> void)=> React.ReactNode, right: (value: string)=> React.ReactNode}> = ({ value = '', onChange=()=>{}, content, right }) => (
  <div style={{ display: 'flex' }}>
    <div>{content(value, onChange)}</div>
    <div style={{ flex: 1, marginLeft: 10, minWidth: 180, alignSelf: 'flex-end', marginBottom: '10px'}}>{right(value)}</div>
  </div>
)

const Edit: FC<editProps> = ({visible, setVisible, data}) => {
  const [imgVisible, setImgVisible] = useState<boolean>(false)
  const form = useRef<FormInstance>()

  const URL = 'https://dev-yeahgo.oss-cn-shenzhen.aliyuncs.com/publicMobile/training-course-examination/ic_aed_certificate.png'
  const IMG_URL = 'https://dev-yeahgo.oss-cn-shenzhen.aliyuncs.com/publicMobile/training-course-examination/image1.png'

  useEffect(()=> {
    if(data) {
      form.current?.setFieldsValue({
        memberPhone: data.memberMobile,
        orderId: data.orderId,
        name: data.name,
        gender: data.gender,
        clothSize: data.clothSize,
        certificateUrl: data.certificateUrl
      })
    }
  }, [data])

  const submit = (values: any) => {
    return new Promise<void>((resolve, reject) => {
      saveAedUserInfo(values).then(res => {
        if(res.code === 0) {
          resolve()
        } else {
          reject()
        }
      })
    })
  }

  return (
    <DrawerForm
      title='编辑志愿者证件信息'
      visible={visible}
      onVisibleChange={setVisible}
      layout='horizontal'
      onFinish={async (v)=>{
        await submit(v)
        return true
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
        name='orderId'
        hidden
      />
      <ProFormText
        label='用户姓名'
        name='name'
        rules={[{
          required: true
        }]}
        width='md'
      />
      <ProFormRadio.Group
        label='用户性别'
        name='gender'
        options={[
          {label: '男', value: 1},
          {label: '女', value: 2},
        ]}
        rules={[{
          required: true
        }]}
      />
      <ProFormRadio.Group
        label='服装尺码'
        name='clothSize'
        options={[
          {label: 'M', value: 'M'},
          {label: 'L', value: 'L'},
          {label: 'XL', value: 'XL'},
          {label: 'XXL', value: 'XXL'},
          {label: 'XXXL', value: 'XXXL'},
          {label: 'XXXXL', value: 'XXXXL'},
        ]}
        rules={[{
          required: true
        }]}
      />
      <ProForm.Item
        label='证件照片'
        name='certificateUrl'
        rules={[{
          required: true,
          message: '请上传证件照片'
        }]}
      >
        <FromWrap
          content={(value: string, onChange: ()=> void) => <Upload value={value} onChange={onChange} />}
          right={() => (
            <>
              <div style={{color: '#E18906'}}>请上传一寸蓝底照片！</div>
              <a onClick={()=> setImgVisible(true)}>查看示例</a>
            </>
          )}
        />
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
