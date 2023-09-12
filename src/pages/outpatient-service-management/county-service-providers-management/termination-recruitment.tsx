import { useState, useEffect, useRef } from 'react'
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form'
import { Spin } from 'antd'

import type { FormInstance } from 'antd'

import { getProviderOrderDetail, cancelProvider } from '@/services/outpatient-service-management/county-service-providers-management'
import { amountTransform } from '@/utils/utils'

type props = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  meta?: any
  callback: () => void
}

const TerminationRecruitment:React.FC<props> = ({visible, setVisible, meta, callback}) => {
  const [data, setdata] = useState<any>()
  const [loading, setLoading] = useState(false)
  const form = useRef<FormInstance>()

  useEffect(()=> {
    if(meta) {
      setLoading(true)
      getProviderOrderDetail({
        subOrderSn: meta?.subOrderSn
      }).then(res => {
        if(res.code === 0) {
          setdata(res.data)
        }
      }).finally(()=> {
        setLoading(false)
      })
    }
  }, [meta])
  
  useEffect(()=> {
    if(data) {
      form.current?.setFieldsValue({
        houseNumber: data?.houseName,
        area: data?.provinceName + data?.cityName + data?.areaName,
        payAmount: `${amountTransform(meta?.payAmount, '/').toFixed(2)}元`,
        offlineAmount: `${amountTransform(meta?.offlineAmount, '/').toFixed(2)}元`,
        contractId: meta?.contractId,
        optName: window.localStorage.getItem('nickname')
      })
    }
  }, [data])

  const submit = (v:any) => {
    return new Promise<void>((resolve, reject) => {
      cancelProvider({
        ...v,
        subOrderSn: meta?.subOrderSn
      }, {
        showSuccess: true
      }).then(res => {
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
      title='区县服务商终止招募'
      width={600}
      layout='horizontal'
      labelCol={{span: 10}}
      onFinish={async (v) => {
        await submit(v)
        callback()
        return true
      }}
      visible={visible}
      onVisibleChange={setVisible}
      formRef={form}
    >
      <Spin spinning={loading}>
        <ProFormText 
          label='服务商编号'
          name='houseNumber'
          readonly
        />
        <ProFormText 
          label='服务区域'
          name='area'
          readonly
        />
        <ProFormText 
          label='合同费金额'
          name='payAmount'
          readonly
        />
        <ProFormText 
          label='定金金额'
          name='offlineAmount'
          readonly
        />
        <ProFormText 
          label='法大大合同ID'
          name='contractId'
          readonly
        />
        <ProFormText 
          label='付款凭证图片'
          name='voucher'
          readonly
        />
        <ProFormTextArea
          label='终止原因'
          name='reason'
          placeholder='请输入5-30个字'
          fieldProps={{
            showCount: true,
            maxLength: 30
          }}
          rules={[
            {required: true},
            {validator: (_, value)=> {
              if(value?.length < 5) {
                return Promise.reject('请输入5-30个字')
              } else {
                return Promise.resolve()
              }
            }}
          ]}
        />
        <ProFormText
          label='操作人'
          name='optName'
          readonly
        />
      </Spin>
    </ModalForm>
  )
}

export default TerminationRecruitment