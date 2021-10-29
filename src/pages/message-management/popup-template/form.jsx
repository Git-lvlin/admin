import React, { useEffect, useState } from 'react'
import ProForm,{
  ModalForm,
  ProFormRadio,
  ProFormText,
  ProFormSelect,
  ProFormDatePicker
} from '@ant-design/pro-form'
import { Form, message } from 'antd'

import { popupBizTypeList, popupAdd, popupUpdate } from '@/services/message-management/message-template-config'

import Upload from '@/components/upload'
import styles from './style.less'

export default (props) => {
  const { 
    visible,
    setVisible,
    callback,
    onClose,
    data,
    title,
    change,
    setChange
  } = props

  const [selectItem, setSelectItem] = useState([])
  const [form] = Form.useForm()
  const [show, setShow] = useState(false)

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
    if(data) {
      popupUpdate({
        id: data.id,
        ...values
      }).then(res=>{
        if(res.success) message.success("APP弹窗模板修改成功")
        callback(),
        onClose(),
        setChange(change+1)
      })
    } else {
      popupAdd({
        ...values
      }).then(res=>{
        if(res.success) message.success("APP弹窗模板新建成功")
        callback(),
        onClose(),
        setChange(change+1)
      })
    }
  }

  const selectType = e => {
    e === 1 ? setShow(false) : setShow(true)
  }

  useEffect(() => {
    popupBizTypeList().then(res=> {
      setSelectItem(res.data.map(item => ({label: item.name, value: item.type})))
    })
    return () => {
      setSelectItem([])
    }
  }, [])

  useEffect(() => {
    data && form.setFieldsValue({
      name: data.name,
      backgroundImageUrl: data.backgroundImageUrl,
      backgroundImageWidth: data.backgroundImageWidth,
      backgroundImageHeight: data.backgroundImageHeight,
      type: data.type,
      bizType: data.bizType,
      url: data.url,
      contentViewLeft: data.contentViewLeft,
      contentViewRight: data.contentViewRight,
      contentViewTop: data.contentViewTop,
      contentViewBottom: data.contentViewBottom,
      link: data.link,
      expireType: data.expireType,
      expireTime: data.expireTime,
      cancelBtnText: data.cancelBtnText,
      confirmBtnText: data.confirmBtnText,
      cancelImageUrl: data.cancelImageUrl,
      confirmImageUrl: data.confirmImageUrl
    })
    data?.expireType === 2 && setShow(true)
    return undefined
  }, [data, form, selectItem])

  return (
    <ModalForm
      title={title}
      modalProps={{
        onCancel: () => onClose(),
        destroyOnClose: true
      }}
      
      onVisibleChange={setVisible}
      visible={visible}
      width={750}
      onFinish={async (values) => {
        await submit(values)
        callback()
        return true
      }}
      form={form}
      labelAlign="right"
      {...formItemLayout}
    >
      <div className={styles.timelineWarp}>
        <ProFormText
          name="name"
          label="模板名称"
          width="md"
          rules={[{ required: true, message: '请输入模板名称' }]}
          placeholder="请输入模板名称"
        />
        <ProForm.Item
          label="模板背景"
          name="backgroundImageUrl"
          rules={[{message: '请上传模板背景', required: true}]}
        >
          <Upload
            code={222}
            multiple
            maxCount={1}
            accept="image/*"
          />
        </ProForm.Item>
        <ProFormText
          name="backgroundImageWidth"
          label="模板背景宽"
          width="md"
          rules={[{ required: true, message: '请输入模板背景宽' }]}
          placeholder="请输入模板背景宽"
        />
        <ProFormText
          name="backgroundImageHeight"
          label="模板背景高"
          width="md"
          rules={[{ required: true, message: '请输入模板背景高' }]}
          placeholder="请输入模板背景高"
        />
        <ProFormRadio.Group
          name="type"
          label="模板类型"
          rules={[{ required: true, message: '请选择模板类型'}]}
          width="md"
          options={[
            {
              label: '原生',
              value: 1
            },
            {
              label: 'H5',
              value: 2
            }
          ]}
        />
        <ProFormText
          name="contentViewLeft"
          label="内容相对位置-左"
          width="md"
          rules={[{ required: true, message: '请输入内容相对位置-左' }]}
          placeholder="请输入内容相对位置-左"
        />
        <ProFormText
          name="contentViewRight"
          label="内容相对位置-右"
          width="md"
          rules={[{ required: true, message: '请输入内容相对位置-右' }]}
          placeholder="请输入内容相对位置-右"
        />
        <ProFormText
          name="contentViewTop"
          label="内容相对位置-上"
          width="md"
          rules={[{ required: true, message: '请输入内容相对位置-上' }]}
          placeholder="请输入内容相对位置-上"
        />
        <ProFormText
          name="contentViewBottom"
          label="内容相对位置-下"
          width="md"
          rules={[{ required: true, message: '请输入内容相对位置-下' }]}
          placeholder="请输入内容相对位置-下"
        />
        <ProFormSelect
          name="bizType"
          label="业务类型"
          options={selectItem}
          rules={[{ required: true, message: '请选择业务类型' }]}
        />
        <ProFormSelect
          name="expireType"
          label="有效期类型"
          rules={[{ required: true, message: '请选择有效期类型'}]}
          fieldProps={{
            onChange: e => { selectType(e) }
          }}
          options={[
            {
              label: '长期有效',
              value: 1
            },
            {
              label: '指定日期内有效',
              value: 2
            }
          ]}
        />
        {
          show&&
          <ProFormDatePicker
            label="有效期"
            name="expireTime"
            rules={[{ required: true, message: '请选择一个日期' }]}
          />
        }
        <ProFormText
          name="cancelBtnText"
          label="取消按钮文本"
          rules={[{ required: true, message: '请输入取消按钮文本' }]}
          placeholder="请输入取消按钮文本"
        />
        <ProForm.Item
          label="取消按钮背景"
          name="cancelImageUrl"
        >
          <Upload
            code={222}
            multiple
            maxCount={1}
            accept="image/*"
          />
        </ProForm.Item>
        <ProFormText
          name="confirmBtnText"
          label="确认按钮文本"
          rules={[{ required: true, message: '请输入确认按钮文本' }]}
          placeholder="请输入确认按钮文本"
        />
        <ProForm.Item
          label="确认按钮背景"
          name="confirmImageUrl"
        >
          <Upload
            code={222}
            multiple
            maxCount={1}
            accept="image/*"
          />
        </ProForm.Item>
        <ProFormText
          name="link"
          label="消息模板链接"
          rules={[{ required: true, message: '请输入消息模板链接' }]}
          placeholder="请输入消息模板链接"
        />
        <ProFormText
          name="url"
          label="H5模板url"
          rules={[{ required: true, message: '请输入H5模板url' }]}
          placeholder="请输入H5模板url"
        />
      </div>
    </ModalForm>
  )
}