import { useEffect, useRef, useState } from 'react'
import ProForm, { ModalForm, ProFormText } from '@ant-design/pro-form'
import { Spin } from 'antd'

import type { FormInstance } from 'antd'

import Upload from '@/components/upload'
import { voucherDetail, uploadVoucher } from '@/services/outpatient-service-management/county-service-providers-management'

type Props = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  id?: any
  callback: () => void
}

const PaymentVoucher: React.FC<Props> = ({visible, setVisible, id, callback}) => {
  const [data, setData] = useState<any>()
  const [loading, setloading] = useState(false)

  const form = useRef<FormInstance>()
  const name = window.localStorage.getItem('nickname')

  useEffect(()=> {
    setloading(true)
    if(id) {
      voucherDetail({subOrderSn: id}).then (res => {
        if(res.code === 0) {
          setData(res.data)
        }
      }).finally(()=> {
        setloading(false)
      })
    }
  }, [id])

  useEffect(()=> {
    if(data) {
      form.current?.setFieldsValue({
        bankAcct: data?.bankAcct,
        bankNo: data?.bankNo,
        bankName: data?.bankName,
        voucher: data?.voucher,
        operator: name
      })
    }
  }, [data])

  const submit = (v: any) => {
    return new Promise<void>((resolve, reject) => {
      uploadVoucher({
        subOrderSn: id,
        voucher: v.voucher
      },{
        showSuccess: true
      }).then(res=> {
        if(res.code === 0) {
          resolve()
        } else {
          reject()
        }
      })
    })
  }

  return (
    <ModalForm
      title='上传付款凭证'
      layout='horizontal'
      labelCol={{span: 10}}
      visible={visible}
      onVisibleChange={setVisible}
      width={500}
      formRef={form}
      onFinish={async (v)=> {
        await submit(v)
        callback()
        return true
      }}
      modalProps={{
        destroyOnClose: true
      }}
    >
      <Spin
        spinning={loading}
      >
        <div
          style={{
            maxHeight: '500px',
            overflowX: 'auto'
          }}
        >
          <ProFormText
            label='账户名称'
            name='bankAcct'
            readonly
          />
          <ProFormText
            label='账户号码'
            name='bankNo'
            readonly
          />
          <ProFormText 
            label='开户银行'
            name='bankName'
            readonly
          />
          <ProForm.Item
            label='上传付款凭证'
            name='voucher'
            rules={[{required: true}]}
            extra='请上传付款成功的界面截图图片，最多30张'
          >
            <Upload maxCount={30} multiple accept='.png, .jpg, .jpeg'/>
          </ProForm.Item>
          <ProFormText 
            label='操作人'
            name='operator'
            readonly
          />
        </div>
      </Spin>
    </ModalForm>
  )
}

export default PaymentVoucher