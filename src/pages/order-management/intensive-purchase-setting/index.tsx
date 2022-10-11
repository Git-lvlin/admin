import { useState, useEffect, useRef } from "react"
import ProForm, { ProFormDigit } from '@ant-design/pro-form'
import { Row, Col, Button } from 'antd'

import type { FormProps } from "./data"
import type { FormInstance } from "antd"

import PageContainer from '@/components/PageContainer'
import { setConfigByCode, getConfigByCode } from "@/services/order-management/intensive-purchase-setting"
import { amountTransform } from "@/utils/utils"

const IntensivePurchaseSetting = () => {
  const [data, setData] = useState<FormProps>()
  const form = useRef<FormInstance>()

  useEffect(()=> {
    getConfigByCode({code: 'transPurchaseConf'}).then(res => {
      if(res.code === 0) {
        setData({
          minBuyNum: res.data.minBuyNum,
          minBuyMoney: amountTransform(res.data.minBuyMoney, '/')
        })
      }
    })
  }, [])

  useEffect(()=> {
    form.current?.setFieldsValue({
      minBuyNum: data?.minBuyNum,
      minBuyMoney: data?.minBuyMoney
    })
  }, [data])

  

  const submit = (v: FormProps) => {
    return new Promise<void>((resolve, reject) => {
      setConfigByCode({
        code: 'transPurchaseConf',
        content: {
          ...v,
          minBuyMoney: amountTransform(v.minBuyMoney, '*')
        }
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
    <PageContainer>
      <ProForm<FormProps>
        onFinish={async(v: FormProps)=>{
          await submit(v)
        }}
        style={{
          background: '#FFF',
          padding: 20
        }}
        formRef={form}
        submitter={{
          render: (props, doms) => (
            <Row>
              <Col span={14} offset={5}>
                <Button
                  key='ok'
                  type='primary'
                  onClick={()=>{
                    props?.submit()
                  }}
                >
                  保存
                </Button>
              </Col>
            </Row>
          )
        }}
        layout='horizontal'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        
      >
        <ProFormDigit
          label="最低采购量"
          name="minBuyNum"
          fieldProps={{
            addonAfter: '款',
            placeholder: '请输入最低采购量'
          }}
          validateFirst
          rules={[
            () => ({
              validator(_, value) {
                const reg = /^((0)|([1-9][0-9]*))$/
                if (!reg.test(value)) {
                  return Promise.reject(new Error('请输入整数'))
                }
                return Promise.resolve()
              },
            }),
            {required: true}
          ]}
          width="md"
        />
        <ProFormDigit
          label="最低采购金额"
          name="minBuyMoney"
          width="md"
          fieldProps={{
            addonAfter: '元',
            placeholder: '请输入最低采购金额'
          }}
          rules={[{required: true}]}
        />
      </ProForm>
    </PageContainer>
  )
}

export default IntensivePurchaseSetting
