import React,{ useEffect } from 'react'
import ProForm, {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-form'

import { modifyAddress } from '@/services/order-management/supplier-order';
import AddressCascader from '@/components/address-cascader'
import { Form, Typography } from 'antd'
const { Title } = Typography;

const checkConfirm = (rule, value, callback) => {
  return new Promise(async (resolve, reject) => {
    if (value && !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)) {
      await reject('请输入正确的手机号')
    }else {
      await resolve()
    }
  })
}

const EditAddress = ({
  subOrderId,
  primaryAddress,
  visible,
  setVisible,
  setChange,
  change
}) => {

const [form] = Form.useForm();
const submitAddress = (v) => {
  return new Promise((resolve, reject)=>{
    modifyAddress(
      {
        orderId:subOrderId,
        receiptUser: v.receiptUser,
        receiptPhone: v.receiptPhone,
        receiptAddress: `${v.area?.[0].label} ${v.area?.[1].label} ${v.area?.[2].label} ${v.receiptAddress}`,
        provinceId: v.area?.[0].value,
        cityId: v.area?.[1].value,
        areaId: v.area?.[2].value
      },
      {
        showSuccess: true,
        showError: true
      }).then(res => {
        if(res.success) {
          setChange(change+1)
          resolve()
        } else {
          reject()
        }
    })
  })
}

useEffect(()=>{
  form.setFieldsValue({
    rawConsignee:primaryAddress?.receivingInfo?.receiptUser,
    rawPhone:primaryAddress?.receivingInfo?.receiptPhone,
    rawAddress:primaryAddress?.receivingInfo?.receiptAddress
  })
  document.body.style.overflow = 'hidden'
  return () => {
    document.body.style.overflow = 'auto'
  }
}, [])

  return (
    <ModalForm
      title="修改收货地址"
      visible={visible}
      onVisibleChange={setVisible}
      modalProps={{
        destroyOnClose: true,
        onCancel: ()=>{setVisible(false)}
      }}
      onFinish={async (values) => {
        await submitAddress(values)
        return true
      }}
      layout='horizontal'
      form={form}
    >
      <Title level={5}>原收货信息</Title>
      <ProFormText
        name='rawConsignee'
        label='收货人'
        readonly
      />
      <ProFormText
        name='rawPhone'
        label='电话'
        readonly
      />
      <ProFormText
        name='rawAddress'
        label='地址'
        readonly
      />


      <ProFormText
        name='receiptUser'
        label='收货人'
        rules={[{required: true, message: '请输入收货人'}]}
      />
      <ProFormText
        name='receiptPhone'
        label='电话'
        rules={[
          {required: true, message: '请输入电话'},
          {validator: checkConfirm}
        ]}
      />
      <ProForm.Item
        name='area'
        label='所在地区'
        rules={[{required: true, message: '请选择所在地区'}]}
      >
        <AddressCascader/>
      </ProForm.Item>
      <ProFormText
        name='receiptAddress'
        label='详细地址'
        rules={[{required: true, message: '请输入详细地址'}]}
      />
    </ModalForm>
  )
}

export default EditAddress
