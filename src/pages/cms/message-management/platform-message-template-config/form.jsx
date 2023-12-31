import React, { useEffect, useState } from 'react'
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormCheckbox
} from '@ant-design/pro-form'
import { Form } from 'antd'
import * as api from '@/services/message-management/message-template-config'

export default (props) => {
  const { visible, setVisible, callback, onClose, data } = props
  const [form] = Form.useForm()
  const [targetRole, setTargetRole] = useState([])
  const [popupSelect, setPopupSelect] = useState([])

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
    layout: {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 14
      },
    }
  }
  const submit = (values) => {
    const pushType = values.pushType.join(',')
    const targetRole = values.targetRole.join(',')
    const obj = {toType:4, ...values, pushType, targetRole}
    api.updeTemplate(obj, { showSuccess: true })
    return true
  }

  useEffect(() => {
    api.popupConfigAll().then(res=>{
      setPopupSelect(res.data.map(item => ({label: item.name, value: item.id})))
    })
    return ()=> {
      setPopupSelect([])
    }
  }, [])
  

  useEffect(() => {
    data && form.setFieldsValue({
      name: data.name,
      templateTitle: data.templateTitle,
      templateCopywritingContent: data.templateCopywritingContent,
      pushType: data.pushType,
      type: data.type,
      targetRole: data.targetRole.join(','),
      popupConfigId: data.popupConfigId
    })
    return undefined
  }, [data, form])

  useEffect(()=>{
    api.platformRoleList().then(res => {
      if(Object.keys(res).length) {
        const data = res.map(data => ({
          label: data.title,
          value: data.id
        }))
        setTargetRole(data)
      }
    })
    return ()=> {
      setTargetRole([])
    }
  },[])
  return (
    <ModalForm
      title="消息模板配置"
      modalProps={{
        onCancel: () => onClose(),
        destroyOnClose: true
      }}
      onVisibleChange={setVisible}
      visible={visible}
      width={550}
      onFinish={async (values) => {
        await submit(values)
        callback()
        return true
      }}
      form={form}
      labelAlign="right"
      {...formItemLayout}
      initialValues={{
        status: 1
      }}
    >
      <ProFormText
        name="name"
        label="消息名称"
        readonly
        width="md"
      />
      <ProFormText
        name="type"
        label="消息类型"
        readonly
        hidden
        width="md"
      />
      
      <ProFormText
        key="templateTitle"
        name="templateTitle"
        label="消息标题"
        width="md"
        rules={[
          {
            required: true,
            message: '请输入5-18个字符',
          },
        ]}
      />

      <ProFormTextArea
        key='templateCopywritingContent'
        name="templateCopywritingContent"
        label="消息内容"
        placeholder=""
        width="md"
        rules={[
          {
            required: true,
            message: '请输入至少6个字符',
          },
        ]}
        fieldProps={{
          showCount: true,
          maxLength: 84,
          minLength:6
        }}
      />
      <ProFormCheckbox.Group
        label='推送角色'
        name="targetRole"
        valueType='checkbox'
        options={targetRole}
        rules={[
          {
            required: true,
            message: '请至少选中一名角色',
          },
        ]}
      />
      <ProFormSelect
        name="pushType"
        label="推送渠道"
        width="md"
        valueType="select"
        valueEnum={{
          1: '站内信',
          2: '推送消息',
          3: '短信',
          4: '小程序'
        }}
        readonly
      />
    </ModalForm>
  )
}