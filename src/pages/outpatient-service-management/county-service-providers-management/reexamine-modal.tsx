import { useEffect, useState, useRef } from 'react'
import { Spin, Image } from 'antd'
import ProForm, { 
  // ModalForm,
  DrawerForm, 
  ProFormText, 
  ProFormRadio,
  ProFormDependency,
  ProFormTextArea
} from '@ant-design/pro-form'
import { Space } from 'antd'

import type { FormInstance } from 'antd'

import { getProviderOrderDetail, auditSecond } from '@/services/outpatient-service-management/county-service-providers-management'
import { amountTransform } from '@/utils/utils'

type props = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  meta?: any
  callback: () => void
}

const ReexamineModal:React.FC<props> = ({visible, setVisible, meta, callback}) => {
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
        houseNumber: data?.houseFullName,
        area: data?.provinceName + data?.cityName + data?.areaName,
        contractId: meta?.contractId,
        optName: data?.optName,
        optTime: data?.optTime,
        reOptName: window.localStorage.getItem('nickname')
      })
    }
  }, [data])

  const submit = (v:any) => {
    return new Promise<void>((resolve, reject) => {
      auditSecond({
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
    <DrawerForm
      title='区县服务商复审'
      width={1200}
      visible={visible}
      formRef={form}
      onVisibleChange={setVisible}
      layout='horizontal'
      labelCol={{span: 10}}
      onFinish={async (v)=> {
        await submit(v)
        callback()
        return true
      }}
    >
      <Spin spinning={loading}>
        <div
          style={{
            maxHeight: '1080px',
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
            extra={<span style={data?.isExistProviderDesc === '此区域已有服务商(已交15000元)'? {color: 'red'}: {color: 'rgb(16, 172, 7)'}}>{data?.isExistProviderDesc}</span>}
          />
          <ProForm.Item
            label='订单金额'
            name='payAmount'
          >
            <span style={{color: 'red'}}>{amountTransform(data?.payAmount, '/').toFixed(2)}</span>元
          </ProForm.Item>
          <ProFormText
            label='法大大合同ID'
            name='contractId'
            readonly
          />
          <ProForm.Item
            label='付款凭证图片'
            name='voucherImg'
          >
            <Space wrap>
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
          <ProForm.Item
            label='已审缴费总计'
            name='offlineAmount'
            extra={<span style={{color: '#FF8900'}}>为初审确认录入的（已交订单金额 + 已确认付款凭证金额）</span>}
          >
            <span style={{color: 'red'}}>{amountTransform(data?.offlineAmount, '/').toFixed(2)}</span>元
          </ProForm.Item>
          <ProFormText
            label='初审人'
            name='optName'
            readonly
          />
          <ProFormText
            label='初审时间'
            name='optTime'
            readonly
          />
          <ProFormRadio.Group
            label='审核结果'
            name='type'
            options={[
              {label: '审核通过', value: 1},
              {label: '审核拒绝', value: 2},
              {label: '审核拒绝，终止招募', value: 3}
            ]}
          />
          <ProFormDependency name={['type']}>
            {({type})=> {
              if(type === 2 || type === 3){
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
          <ProFormText
            label='复审人'
            name='reOptName'
            readonly
          />
        </div>
      </Spin>
    </DrawerForm>
  )
}

export default ReexamineModal