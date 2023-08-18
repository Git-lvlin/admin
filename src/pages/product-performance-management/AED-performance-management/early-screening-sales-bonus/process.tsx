import { useEffect, useRef, useState } from 'react'
import { ModalForm, ProFormDependency, ProFormRadio, ProFormText, ProFormTextArea } from '@ant-design/pro-form'
import { Spin } from 'antd'

import type { FormInstance } from 'antd'

import { countShowPre, ipoAudit } from '@/services/product-performance-management/early-screening-sales-bonus'

type props = {
  type: string
  id?: React.Key[]
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  callback: () => void
  title?: string
  phone?: string
  types?: string
}

const Process: React.FC<props> = ({type, id, visible, setVisible, callback, title, phone, types}) => {
  const [loading, setLoading] = useState(false)
  const form = useRef<FormInstance>()

  useEffect(()=> {
    setLoading(true)
    countShowPre({type, ids: id}).then(res => {
      if(res.code === 0) {
        form.current?.setFieldsValue({
          num: `${res.data?.applyUser} 人`,
          orders: `${res.data?.orderNum} 单`,
          nums: `${res.data?.orderUser} 人`,
          phone: phone ? phone : undefined
        })
      }
    }).finally(()=> {
      setLoading(false)
    })
  }, [id])

  const submit = (r: any) => {
    return new Promise<void>((resolve, reject) => {
      ipoAudit({
        ids: id, 
        auditStatus: r.auditStatus,
        reason: r.reason 
      }, {showSuccess: true}).then(res=> {
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
      title={title}
      visible={visible}
      onVisibleChange={setVisible}
      formRef={form}
      layout='horizontal'
      width={700}
      labelCol={{span: 10}}
      onFinish={async(v: any)=> {
        await submit(v)
        return true
      }}
    >
      <Spin spinning={loading}>
        {
          types === 'all' &&
          <ProFormText 
          label='申请的直推人数'
          name='num'
          readonly
          />
        }
        {
          types === 'one' &&
          <ProFormText 
            label='直推人手机号码'
            name='phone'
            readonly
          />
        }
        {
          types === 'all' &&
          <ProFormText 
            label='完成直推早筛总单数'
            name='orders'
            readonly
          />
        }
        {
          types === 'one' &&
          <ProFormText 
            label='完成直推早筛单数'
            name='orders'
            readonly
          />
        }
        {
          types === 'all' &&
          <ProFormText 
            label='完成直推早筛总人数'
            name='nums'
            readonly
          />
        }
        {
          types === 'one' &&
          <ProFormText 
            label='完成直推早筛人数'
            name='nums'
            readonly
          />
        }
        <ProFormRadio.Group
          label='审核结果'
          name='auditStatus'
          options={[
            {label: '审核通过', value: 1},
            {label: '审核拒绝', value: 2}
          ]}
        />
        <ProFormDependency name={['auditStatus']}>
          {({ auditStatus }) => { 
            if(auditStatus === 2) {
              return (
                <ProFormTextArea
                  label='拒绝原因'
                  name='reason'
                  width='md'
                  fieldProps={{
                    placeholder: '请输入5-15个字符',
                    showCount: true,
                    maxLength: 15
                  }}
                  rules={[
                    {
                      required: true
                    },{
                    validator: (_, value) => {
                      if(value?.length < 5) {
                        return Promise.reject('请输入5-15个字符')
                      } else {
                        return Promise.resolve()
                      }
                    }
                  }]}
                />
              )
            } else {
              return
            }
          }}
        </ProFormDependency>
      </Spin>
    </ModalForm>
  )
}

export default Process