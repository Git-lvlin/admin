import { useEffect, useRef } from 'react'
import ProForm, { ModalForm, ProFormDatePicker, ProFormDigit, ProFormText } from '@ant-design/pro-form'
import moment from 'moment'

import type { FC } from 'react'
import type { SaveCardProps } from './data'
import type { FormInstance } from '@ant-design/pro-form'
import type { RangePickerProps } from 'antd/es/date-picker'

import Upload from '@/components/upload'
import styles from './styles.less'
import { searchByMoreCondition, saveCardSendLog } from "@/services/health-package-activities/promotion-activity-management"

const SaveCard: FC<SaveCardProps> = ({visible, setVisible, data}) => {
  const form = useRef<FormInstance>()

  useEffect(()=> {
    form.current?.setFieldsValue({
      storeMobile: data?.memberPhone,
      realName: data?.realName,
      storeNo: data?.storeHouseNumber,
      storeName: data?.storeName
    })
  }, [data])

  const disabledDate: RangePickerProps['disabledDate'] = current => {
    return current && current < moment().endOf('day').subtract(1, 'day')
  }

  const verifyPhone = (e: string) => {
    return searchByMoreCondition({
      phoneNumber: e,
      pageSize: 10,
      pageNum: 1
    })
  }

  const submit = (e: any) => {
    return new Promise<void>((resolve, reject) => {
      saveCardSendLog({...e}, {showSuccess: true}).then(res => {
        if(res.code === 0) {
          return resolve()
        } else {
          return reject()
        }
      })
    })
  }

  return (
    <ModalForm
      visible={visible}
      onVisibleChange={setVisible}
      title='增加吸氢服务次数'
      onFinish={async(values)=> {
        await submit(values)
        return true
      }}
      width={700}
      modalProps={{
        destroyOnClose: true
      }}
      layout='horizontal'
      formRef={form}
    >
      <ProFormText
        label='店主手机'
        name='storeMobile'
        readonly
      />
      <ProFormText
        label='店主姓名'
        name='realName'
        readonly
      />
      <ProFormText
        label='店铺编号'
        name='storeNo'
        readonly
      />
      <ProFormText
        label='店铺名称'
        name='storeName'
        readonly
      />
      <ProFormText
        label='增加吸氢服务的用户手机'
        name='ownerMobile'
        rules={[
          () => ({
            required: true,
            async validator(_, value) {
              if (/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/g.test(value)) {
                const res = await verifyPhone(value)
                if(res.data.records.length > 0) {
                  return Promise.reject(new Error('该用户已注册！'))
                } 
                return Promise.resolve()
              } else {
                return Promise.reject(new Error('请输入正确的用户手机'))
              }
            }
          })
        ]}
        width='md'
      />
      <ProForm.Group>
        <ProFormDigit
          label='增加吸氢服务次数'
          name='cardNum'
          fieldProps={{
            addonAfter: '次'
          }}
          rules={[
            ()=> ({
              required: true,
              validator: (_, value) => {
                if((/^[1-9]\d*$/).test(value)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('请输入非0整数'))
              }
            })
          ]}
        />
        <ProFormDatePicker
          label='有效期'
          name='expireTime'
          rules={[{required: true, message: '需大于或等于当前日期'}]}
          fieldProps={{
            disabledDate: disabledDate
          }}
        />
      </ProForm.Group>
      <ProForm.Item
        label='上传店主申请调整吸氢服务次数凭证'
        name='url'
        rules={[{required: true, message: '请上传店主申请调整吸氢服务次数的凭证文件'}]}
      >
        <Upload/>
      </ProForm.Item>
      <ProFormDigit
        label='店主已申请次数'
        name='applyNum'
        extra={<span className={styles.extra}>每次申请限增加1次吸氢服务，次数不能重复</span>}
        fieldProps={{
          addonAfter: '次'
        }}
        rules={[
          ()=> ({
            validator: (_, value) => {
              if((/^[1-9]\d*$/).test(value)) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('请输入非0整数'))
            }
          })
        ]}
        width='md'
      />
    </ModalForm>
  )
}

export default SaveCard
