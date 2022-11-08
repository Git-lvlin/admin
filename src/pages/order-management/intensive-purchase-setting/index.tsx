import { useState, useEffect, useRef } from "react"
import ProForm, { ProFormDigit, ProFormRadio } from '@ant-design/pro-form'
import { Row, Col, Button } from 'antd'

import type { FormProps } from "./data"
import type { FormInstance } from "antd"

import PageContainer from '@/components/PageContainer'
import { setConfigByCode, getConfigByCode } from "@/services/order-management/intensive-purchase-setting"
import { amountTransform } from "@/utils/utils"
import styles from './styles.less'

const IntensivePurchaseSetting = () => {
  const [data, setData] = useState<FormProps>()
  const form = useRef<FormInstance>()

  useEffect(()=> {
    getConfigByCode({code: 'transPurchaseConf'}).then(res => {
      if(res.code === 0) {
        setData({
          minBuyNum: res.data.minBuyNum,
          minBuyMoney: amountTransform(res.data.minBuyMoney, '/'),
          ruleType: res.data.ruleType,
          minBuyMoneyMonth: amountTransform(res.data.minBuyMoneyMonth, '/')
        })
      }
    })
  }, [])

  useEffect(()=> {
    form.current?.setFieldsValue({
      minBuyNum: data?.minBuyNum,
      minBuyMoney: data?.minBuyMoney,
      ruleType: data?.ruleType,
      minBuyMoneyMonth: data?.minBuyMoneyMonth
    })
  }, [data])

  

  const submit = (v: FormProps) => {
    return new Promise<void>((resolve, reject) => {
      setConfigByCode({
        code: 'transPurchaseConf',
        content: {
          ...v,
          minBuyMoney: amountTransform(v.minBuyMoney, '*'),
          minBuyMoneyMonth: amountTransform(v.minBuyMoneyMonth, '*')
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
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 21 }}
      >
        <div className={styles.title}>新集约店主采购订单设置</div>
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
            placeholder: '请输入最低采购金额',
            precision: 2
          }}
          rules={[{required: true}]}
        />
        <ProFormRadio.Group
          label='多条件规则'
          name='ruleType'
          options={[
            {
              label: '满足 最低采购量 或 最低采购金额 即可下单',
              value: 1
            },
            {
              label: '同时满足 最低采购量 与 最低采购金额 才可下单',
              value: 2
            }
          ]}
          validateFirst
          rules={[{required: true}]}
          width='md'
          placeholder='请选择规则'
        />
        <div className={styles.title}>生活馆店主非首月在健康生活馆的最低采购金额设置</div>
        <ProFormDigit
          label="最低采购金额"
          name="minBuyMoneyMonth"
          width="md"
          fieldProps={{
            addonAfter: '元/月',
            placeholder: '请输入最低采购金额',
            precision: 2
          }}
          rules={[{required: true}]}
        />
        <div className={styles.tips}>
          <div>备注：</div>
          <div>1、从开通当月开始第3个月开始检查业绩，上月（开通的次月）的新集约订单实付款未达到最低采购金额者不得下单新集约商品</div>
        </div>
      </ProForm>
    </PageContainer>
  )
}

export default IntensivePurchaseSetting
