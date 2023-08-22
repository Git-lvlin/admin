import { useEffect, useRef, useState } from 'react'
import { ModalForm, ProFormText } from '@ant-design/pro-form'
import { Spin } from 'antd'

import type { FormInstance } from 'antd'

import { countShowPre, ipoApply } from '@/services/product-performance-management/early-screening-sales-bonus'

type props = {
  type: string
  id?: React.Key[]
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  callback: () => void
}

const Apply: React.FC<props> = ({type, id, visible, setVisible, callback}) => {
  const [loading, setLoading] = useState(false)
  const form = useRef<FormInstance>()

  useEffect(()=> {
    setLoading(true)
    countShowPre({type, ids: id}).then(res => {
      if(res.code === 0) {
        form.current?.setFieldsValue({
          num: `${res.data?.applyUser} 人`,
          months: `${res.data?.totalMonths} 个月`
        })
      }
    }).finally(()=> {
      setLoading(false)
    })
  }, [id])

  const submit = () => {
    return new Promise<void>((resolve, reject) => {
      ipoApply({ids: id}, {showSuccess: true}).then(res=> {
        if(res.code === 0) {
          callback()
          resolve()
        } else {
          reject()
        }
      })
    })
  }

  return (
    <ModalForm
      title='销售人额外奖申请'
      visible={visible}
      onVisibleChange={setVisible}
      formRef={form}
      layout='horizontal'
      width={500}
      labelCol={{span: 13}}
      onFinish={async()=> {
        await submit()
        return true
      }}
    >
      <Spin spinning={loading}>
        <ProFormText 
          label='申请的销售人人数'
          name='num'
          readonly
        />
        <ProFormText 
          label='申请月数'
          name='months'
          readonly
        />
      </Spin>
    </ModalForm>
  )
}

export default Apply