import { useRef, useEffect } from 'react'
import ProForm, { ModalForm, ProFormRadio, ProFormText, ProFormTextArea } from '@ant-design/pro-form'

import type { FormInstance } from 'antd'
import type { refundRequestRemarksProps } from './data'

import Upload from '@/components/upload'
import { refund } from '@/services/product-performance-management/early-user-management'

const RefundRequestRemarks:React.FC<refundRequestRemarksProps> = ({visible, setVisible, id, callback, type, data}) => {
  const form = useRef<FormInstance>()

  const obj = data && JSON.parse(data)

  const submit = (value: any) => {
    return new Promise<void>((resolve, reject) => {
      refund({
        ...value,
        subOrderSn: id
      }, {
        showSuccess: true
      }).then(res => {
        if(res.code === 0) {
          callback()
          resolve()
        } else {
          reject()
        }
      })
    })
  }

  useEffect(()=> {
    form.current?.setFieldsValue({
      operator: window.localStorage.getItem('nickname')
    })
  }, [])

  useEffect(()=> {
    if(type) {
      form.current?.setFieldsValue({
        reason: obj?.reason,
        channel: obj?.channel,
        refundImg: obj?.refundImg
      })
    }
  }, [type])

  return (
    <ModalForm
      title='退款申请备注'
      width={500}
      visible={visible}
      onVisibleChange={setVisible}
      onFinish={async (values)=> {
        try {
          await submit(values)
        } catch (error) {
          console.log(error)
        }
        return true
      }}
      labelCol={{span: 5}}
      formRef={form}
      submitter={{
        searchConfig: {
          resetText: '取消',
          submitText: '确定'
        }
      }}
      layout='horizontal'
    >
      <ProFormTextArea
        label='退款原因'
        name='reason'
        fieldProps={{
          placeholder: '请输入5-50个字符',
          maxLength: 50,
          showCount: true
        }}
        readonly={type}
        rules={[
          {
            required: true
          },{validator: (_, value)=> {
          if(value?.length < 5) {
            return Promise.reject('请输入5-50个字符')
          } else {
            return Promise.resolve()
          }
        }}]}
      />
      <ProFormRadio.Group
        label='退款渠道'
        name='channel'
        options={[
          {label: '企业微信申请退款', value: '企业微信申请退款'},
          {label: '电子邮件申请退款', value: '电子邮件申请退款'},
          {label: '纸质申请', value: '纸质申请'},
          {label: '老板批示退款', value: '老板批示退款'},
          {label: '其他渠道', value: '其他渠道'}
        ]}
        readonly={type}
      />
      <ProForm.Item
        label='附件'
        name='refundImg'
      >
        <Upload/>
      </ProForm.Item>
      <ProFormText
        label='操作人'
        name='operator'
        readonly
      />
    </ModalForm>
  )
}

export default RefundRequestRemarks