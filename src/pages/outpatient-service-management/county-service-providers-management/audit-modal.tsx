import { useEffect, useState, useRef } from 'react'
import { Spin, Image, Button } from 'antd'
import ProForm, { 
  ModalForm, 
  ProFormText, 
  ProFormRadio,
  ProFormDependency,
  ProFormDigit,
  ProFormTextArea
} from '@ant-design/pro-form'
import { Space } from 'antd'

import type { FormInstance } from 'antd'

import { getProviderOrderDetail, auditFirst } from '@/services/outpatient-service-management/county-service-providers-management'
import { amountTransform } from '@/utils/utils'

type props = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  meta?: any
  callback: () => void
}

const AuditModal:React.FC<props> = ({visible, setVisible, meta, callback}) => {
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
        payAmount: `${amountTransform(data?.payAmount, '/').toFixed(2)}元`,
        contractId: meta?.contractId,
        optName: window.localStorage.getItem('nickname')
      })
    }
  }, [data])

  const submit = (v:any) => {
    return new Promise<void>((resolve, reject) => {
      auditFirst({
        ...v,
        subOrderSn: meta?.subOrderSn,
        offlineAmount: v?.offlineAmount && amountTransform(v?.offlineAmount),
        type: data?.isExistProvider === 1 ? 3 : v?.type
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
      title='区县服务商初审'
      width={500}
      visible={visible}
      formRef={form}
      onVisibleChange={setVisible}
      modalProps={{
        destroyOnClose: true
      }}
      layout='horizontal'
      labelCol={{span: 10}}
      onFinish={async (v)=> {
        await submit(v)
        callback()
        return true
      }}
      submitter={{
        render: (props, defaultDoms) => {
          if(data?.isExistProvider === 1) {
            return [
              <Button
                key="rest"
                onClick={() => {
                  props.reset()
                }}
              >
                取消
              </Button>,
              <Button
                key="submit"
                onClick={() => {
                  props.submit()
                }}
                type='primary'
              >
                审核拒绝，终止招募
              </Button>
            ]
          } else {
            return [
              ...defaultDoms
            ]
          }
        }
      }}
    >
      <Spin spinning={loading}>
        <div
          style={{
          maxHeight: '500px',
          overflowX: 'auto'
        }}
        >
          <ProFormText 
            label='服务商编号'
            name='houseNumber'
            readonly
          />
          <ProFormText 
            label='服务区域'
            name='area'
            readonly
            extra={data?.isExistProviderDesc}
          />
          <ProFormText 
            label='订单金额'
            name='payAmount'
            readonly
          />
          <ProFormText
            label='法大大合同ID'
            name='contractId'
            readonly
          />
          <ProForm.Item
            label='付款凭证图片'
            name='voucherImg'
          >
            <Space>
              {
                data?.voucher.map((res: any) => {
                  return (
                    <Image 
                      src={res} 
                      width={50} 
                      height={50}
                      key={res}
                    />
                  )
                })
              }
            </Space>
          </ProForm.Item>
          {
            data?.isExistProvider === 0 &&
            <ProFormRadio.Group
              label='审核结果'
              name='type'
              options={[
                {label: '审核通过', value: 1},
                {label: '审核拒绝', value: 2},
                {label: '审核拒绝，终止招募', value: 3}
              ]}
            />
          }
          <ProFormDependency name={['type']}>
            {({type})=> {
              if(type === 1) {
                return (
                  <ProFormDigit
                    label='缴费总计'
                    name='offlineAmount'
                    rules={[{required: true}]}
                    fieldProps={{
                      controls: false
                    }}
                    placeholder='请输入已交订单金额 + 已确认付款凭证金额'
                  />
                )
              } else if(type === 2 || type === 3){
                return (
                  <ProFormTextArea
                    label='拒绝原因'
                    name='reason'
                    placeholder='请输入5-30个字符'
                    rules={[
                      {
                        required: true,
                        message: '请输入5-30个字符'
                      },
                      {
                        validator: (_, value) => {
                          if(value?.length < 5) {
                            return Promise.reject('请输入5-30个字符')
                          } else {
                            return Promise.resolve()
                          }
                        }
                      }
                    ]}
                  />
                )
              } else {
                return
              }
            }}
          </ProFormDependency>
          {
            data?.isExistProvider === 0 &&
            <ProFormText
              label='初审人'
              name='optName'
              readonly
            />
          }
        </div>
      </Spin>
    </ModalForm>
  )
}

export default AuditModal