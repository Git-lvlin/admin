import { useState, useEffect, useRef } from 'react'
import { Spin } from 'antd'
import ProForm, { ProFormRadio } from '@ant-design/pro-form'

import type { FormInstance } from 'antd'

import { withdrawTypeDetail } from '@/services/financial-management/withdrawal-fee-configuration'
import styles from './styles.less'

const SelectSystem: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const form = useRef<FormInstance>()

  useEffect(()=> {
    setLoading(true)
    withdrawTypeDetail().then(res => {
      if(res.code === 0) {
        form.current?.setFieldsValue({
          withdrawType: res.data.withdrawType
        })
      }
    }).finally(()=> {
      setLoading(false)
    })
  }, [])

  return (
    <Spin spinning={loading}>
      <div className={styles.formLayout}>
        <ProForm
          layout='horizontal'
          submitter={false}
          formRef={form}
        >
          <ProFormRadio.Group
            label='当前选择'
            name='withdrawType'
            initialValue='youfuCommission'
            disabled
            options={[
             {label: '优付', value: 'youfuCommission'},
             {label: '薪宝', value: 'xinbaoCommission'}
            ]}
            width='md'
          />
        </ProForm>
      </div>
    </Spin>
  )
}

export default SelectSystem