import { useEffect } from 'react'
import ProForm, { DrawerForm, ProFormText, ProFormRadio } from '@ant-design/pro-form'

import { editProps } from './data'

const Edit: React.FC<editProps> = ({id, visible, setVisible}) => {

  const submit = () => {
    return new Promise<void>((resolve, reject) => {
      
    })
  }

  return (
    <DrawerForm
      title={`${id ? '编辑' : '添加'}商品资质`}
      drawerProps={{
        destroyOnClose: true,
      }}
      width={1200}
      layout='horizontal'
      visible={visible}
      onVisibleChange={setVisible}
      onFinish={async (values)=> {
        await submit(values)
        return true
      }}
      submitter={{
        searchConfig: {
          submitText: '提交'
        }
      }}
    >
      <ProFormText
        label='资质名称'
        name=''
        fieldProps={{
          placeholder: '请填写资质名称'
        }}
        rules={[{required: true}]}
      />
      <ProForm.Item
        label='选择需要资质的分类'
        name=''
        rules={[{required: true}]}
      >

      </ProForm.Item>
      <ProFormText
        label='上传说明'
        name=''
        fieldProps={{
          placeholder: '请填写上传说明'
        }}
        rules={[{required: true}]}
      />
      <ProForm.Item
        label='示例图'
        name=''
        rules={[{required: true}]}
      >

      </ProForm.Item>
      <ProFormRadio.Group
        label='资质类型'
        name=''
        options={[
          {label: '必要资质', value: ''},
          {label: '可选资质', value: ''},
        ]}
      />
      <ProFormRadio.Group
        label='状态'
        name=''
        options={[
          {label: '开启', value: ''},
          {label: '暂不开启', value: ''},
        ]}
      />
    </DrawerForm>
  )
}

export default Edit