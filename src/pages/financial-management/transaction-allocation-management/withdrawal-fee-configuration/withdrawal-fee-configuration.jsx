import React, { useEffect, useState } from 'react'
import ProForm, { ProFormSelect, ProFormDigit } from '@ant-design/pro-form'
import { Input, message, Form, Spin } from 'antd'
import { PageContainer } from '@ant-design/pro-layout'

import { withdrawConfigDetail, withdrawConfigUpdate } from '@/services/financial-management/withdrawal-fee-configuration'
import './styles.less'
import styles from './styles.less'

const WithdrawalFeeConfiguration = () => {
  const [contrary, setContrary] = useState('')
  const [person, setPerson] = useState('')
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  useEffect(()=> {
    setLoading(true)
    withdrawConfigDetail({}).then(res=> {
      form.setFieldsValue({
        ...res?.data
      })
    }).finally(()=> {
      setLoading(false)
    })
    return undefined
  },[])
  const toggleContrary = (val) => {
    setContrary(val)
  }
  const togglePerson = (val) => {
    setPerson(val)
  }
  const commit = (val) => {
    withdrawConfigUpdate({...val}).then(res=> {
      if(res.success){
        message.success('提交成功')
      }
    })
  }
  return (
    <PageContainer title={false}>
      <Spin spinning={loading}>
        <div className={styles.formLayout}>
          <ProForm
            form={form}
            layout='horizontal'
            onFinish={async (values) => {
              await commit(values)
            }}
          >
            <span>对公提现限额</span>
            <ProForm.Group>
              <ProFormDigit
                width="xs"
                name="withdrawBusinessMin"
                label="最低(分)"
                rules={[{ required: true, message: '请输入最低对公提现' }]}
              />
              <ProFormDigit
                width="xs"
                name="withdrawBusinessMax"
                label="最高(分)"
                rules={[{ required: true, message: '请输入最高对公提现' }]}
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormDigit
                label="对公提现税率"
                min={0}
                max={1}
                fieldProps={{ precision: 2, step: "0.01" }}
                name="withdrawBusinessFaxScale"
                width="sm"
                rules={[{ required: true, message: '请输入对公提现税率' }]}
              />
              <ProForm.Item
                label="对公提现手续费(分)"
              >
                <Input.Group compact>
                  <ProFormSelect
                    name="withdrawBusinessFeeType"
                    initialValue={'scale'}
                    allowClear={false}
                    rules={[{ required: true, message: '请选择方式' }]}
                    fieldProps={{
                      onChange: (val) => { toggleContrary(val) }
                    }}
                    options={[
                      {
                        value: 'scale',
                        label: '按比例'
                      },
                      {
                        value: 'fixed',
                        label: '按单笔'
                      },
                    ]}
                  />
                  <ProFormDigit
                    width={200}
                    min="0"
                    max={ contrary == 'scale' ? 1 : 99999999 }
                    fieldProps={{
                      step:"0.01",
                      precision: 2}}
                    name={contrary == 'scale' ? 'withdrawBusinessFeeScale' : 'withdrawBusinessFeeFixed'}
                  />
                </Input.Group>
              </ProForm.Item>
            </ProForm.Group>
            <span>对私提现限额</span>
            <ProForm.Group>
              <ProFormDigit
                width="xs"
                name="withdrawPersonMin"
                label="最低(分)"
                rules={[{ required: true, message: '请输入最低对私提现' }]}
              />
              <ProFormDigit
                width="xs"
                name="withdrawPersonMax"
                label="最高(分)"
                rules={[{ required: true, message: '请输入最高对私提现' }]}
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormDigit
                label="对私提现税率"
                min={0}
                max={1}
                fieldProps={{ precision: 2, step: "0.01" }}
                name="withdrawPersonFaxScale"
                width='sm'
                rules={[{ required: true, message: '请输入对私提现税率' }]}
              />
              <ProForm.Item
                label="对私提现手续费(分)"
              >
                <Input.Group compact>
                  <ProFormSelect
                    name="withdrawPersonFeeType"
                    initialValue={'scale'}
                    allowClear={false}
                    rules={[{ required: true, message: '请选择方式' }]}
                    fieldProps={{
                      onChange: (val) => { togglePerson(val) }
                    }}
                    options={[
                      {
                        value: 'scale',
                        label: '按比例',
                      },
                      {
                        value: 'fixed',
                        label: '按单笔',
                      },
                    ]}
                  />
                  <ProFormDigit
                    width={200}
                    min="0"
                    max={ person === 'scale' ? 1 : 99999999 }
                    fieldProps={{step:"0.01", precision: 2}}
                    name={person === 'scale' ? 'withdrawPersonFeeScale' : 'withdrawPersonFeeFixed'}
                  />
                </Input.Group>
              </ProForm.Item>
            </ProForm.Group>
          </ProForm>
        </div>
      </Spin>
    </PageContainer>
  )
}

export default WithdrawalFeeConfiguration
