import { useEffect, useRef, useState } from 'react'
import { 
  ModalForm, 
  ProFormDigit, 
  ProFormRadio, 
  ProFormSelect, 
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-form'

import type { FormInstance } from 'antd'
import type { adsConfigProps } from './data'

import { couponList } from '@/services/coupon-management/coupon-list'
import { advTypeSave } from '@/services/cms/ads-management'


const AdsConfig: React.FC<adsConfigProps> = ({visible, setVisible, type, callback}) => {
  const [list, setList] = useState<any>([])
  const form = useRef<FormInstance>()

  const adType = {
    SplashAd: '开屏广告',
    BannerAd: '横幅广告',
    InterstitialAd: '插屏广告',
    RewardVideoAd: '激励视频广告',
    KUAISHOU: '快手短视频广告',
  }[type as string]

  const name = window.localStorage.getItem('nickname')

  useEffect(()=> {
    form.current?.setFieldsValue({
      adType,
      optAdminName: name,
    })
  }, [type])

  useEffect(()=> {
    if(type === 'RewardVideoAd'){
      couponList({
        couponStatus: 2,
        issueType: 5,
        couponType: 1,
        couponVerifyStatus: 4
      }).then(res => {
        if(res.success) {
          list.push({label: '无红包', value: 0})
          const arr = res.data.map((item: any) => ({
            label: item.couponAmountDisplay + '元' + item.couponName,
            value: item.id
          }))
          setList([...arr, ...list])
        }
      })
    }
  }, [])

  const submit = (value: any) => {
    return new Promise<void>((resolve, reject) => {
      advTypeSave({
        ...value,
        adType: type
      }, {showSuccess: true}).then(res => {
        if(res.code === 0) {
          callback()
          resolve()
        } else {
          reject('配置失败')
        }
      })
    })
  }

  return (
    <ModalForm
      width={700}
      visible={visible}
      onVisibleChange={setVisible}
      title='配置广告'
      onFinish={async (values)=> {
        await submit(values)
        return true
      }}
      formRef={form}
      layout='horizontal'
      labelCol={{span: 8}}
    >
      <ProFormText
        label='广告类型'
        name='adType'
        readonly
      />
      <ProFormDigit
        label='每人每日最多展示'
        name='maxPerPersonPerDay'
        fieldProps={{
          placeholder: '请输入1-100之间的整数',
          addonAfter: '次',
          max: 100,
          min: 1,
          controls: false
        }}
        width='md'
        validateFirst
        rules={[
          {
            validator: (_, value) => {
              const reg = /^[1-9]\d*$/
              if(reg.test(value) && value <= 100) {
                return Promise.resolve()
              } else {
                return Promise.reject('请输入1-100之间的整数')
              }
            }
          },
          {
            required: true
          }
        ]}
      />
      {
        type === 'SplashAd' &&
        <ProFormDigit
          label='间隔展示最短时间'
          width='md'
          name='intervalDisplay'
          validateFirst
          fieldProps={{
            placeholder: '请输入1-1200之间的整数',
            addonAfter: '秒',
            max: 1200,
            min: 1,
            controls: false
          }}
          rules={[
            {
              validator: (_, value) => {
                const reg = /^[1-9]\d*$/
                if(reg.test(value) && value <= 1200) {
                  return Promise.resolve()
                } else {
                  return Promise.reject('请输入1-1200之间的整数')
                }
              }
            },
            {
              required: true
            }
          ]}
        />
      }
      {
        type === 'RewardVideoAd' &&
        <ProFormSelect
          label='选择激励红包'
          width='md'
          placeholder='请选择已审核通过的激励红包'
          name='couponId'
          options={list}
          rules={[{required: true}]}
        />
      }
      <ProFormTextArea
        label='备注'
        name='remark'
        width='md'
        placeholder='请输入至少5-50个字符'
        fieldProps={{
          maxLength: 50,
          showCount: true
        }}
        validateFirst
        rules={[{
          validator: (_, value) => {
            if(value?.legth < 5) {
              return Promise.reject('请输入至少5-50个字符')
            } else {
              return Promise.resolve()
            }
          }
        }]}
      />
      <ProFormRadio.Group
        label='展示状态'
        name='switch'
        rules={[{
          required: true
        }]}
        options={[
          {label: '显示', value: 1},
          {label: '不显示', value: 2}
        ]}
      />
      <ProFormText
        label='操作人'
        name='optAdminName'
        readonly
      />
    </ModalForm>
  )
}

export default AdsConfig