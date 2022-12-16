import { useEffect, useRef, useState } from 'react'
import ProForm, { ModalForm, ProFormDatePicker, ProFormDigit, ProFormText } from '@ant-design/pro-form'
import moment from 'moment'
import { Space } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import type { FC } from 'react'
import type { SaveCardProps, PopSubmitProps } from './data'
import type { FormInstance } from '@ant-design/pro-form'
import type { RangePickerProps } from 'antd/es/date-picker'

import Upload from '@/components/upload'
import styles from './styles.less'
import { searchByMoreCondition, saveCardSendLog } from "@/services/health-package-activities/promotion-activity-management"

const PopSubmit: FC<PopSubmitProps> = ({visible, setVisible, data, back}) => {

  const submit = () => {
    return new Promise<void>((resolve, reject) => {
      saveCardSendLog({...data, expireTime: moment(data?.expireTime).unix()}, {showSuccess: true}).then(res => {
        if(res.code === 0) {
          back()
          return resolve()
        } else {
          setVisible(false)
          return reject()
        }
      })
    })
  }

  const Title: FC = () => {
    return (
      <>
        <Space>
          <ExclamationCircleOutlined style={{color: '#FAAD14'}}/>
          <div>请确认要为用户({data?.ownerMobile})赠送吸氢服务次数？</div>
        </Space>
      </>
    )
  }
  
  return (
    <ModalForm
      visible={visible}
      onVisibleChange={setVisible}
      width={450}
      title={<Title/>}
      onFinish={async () => {
        await submit()
        return true
      }}
      modalProps={{
        destroyOnClose: true,
        closable: false
      }}
      submitter={{
        searchConfig: {
          submitText: '确认转赠',
          resetText: '取消转赠',
        },
      }}
    >
      <div style={{color: '#F04134'}}>确认后立即生效且无法取消！</div>
      <div style={{color: '#999999'}}>你还要继续吗？</div>
    </ModalForm>
  )
}

const SaveCard: FC<SaveCardProps> = ({visible, setVisible, data, callback}) => {
  const [flag, setFlag] = useState<boolean>(false)
  const [popVisible, setPopVisible] = useState<boolean>(false)
  const [valueData, setValueData] = useState<any>()
  const form = useRef<FormInstance>()

  useEffect(()=> {
    form.current?.setFieldsValue({
      storeMobile: data?.memberPhone,
      realName: data?.realName,
      storeHouseNumber: data?.storeHouseNumber,
      storeName: data?.storeName,
      storeMemberId: data?.memberId
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

  return (
    <ModalForm
      visible={visible}
      onVisibleChange={setVisible}
      title='增加吸氢服务次数'
      onFinish={async(values)=> {
        setValueData(values)
        setPopVisible(true)
      }}
      submitter={{
        searchConfig: {
          submitText: '提交',
          resetText: '返回',
        },
      }}
      width={700}
      modalProps={{
        destroyOnClose: true
      }}
      layout='horizontal'
      formRef={form}
    >
      <ProFormText
        label='店主Id'
        name='storeMemberId'
        hidden
      />
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
        name='storeHouseNumber'
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
        extra={flag ? <span className={styles.extra}>此用户已注册！</span> : ''}
        rules={[
          () => ({
            required: true,
            async validator(_, value) {
              if (/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/g.test(value)) {
                const res = await verifyPhone(value)
                if(res.data.records.length > 0) {
                  setFlag(true)
                } else {
                  return Promise.reject(new Error('此手机用户还未注册，无法调整吸氢服务次数，请先让用户在平台注册！'))
                }
                return Promise.resolve()
              } else {
                setFlag(false)
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
                return Promise.reject(new Error('请输入大于0的整数'))
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
        rules={[{message: '请上传店主申请调整吸氢服务次数的凭证文件'}]}
      >
        <Upload/>
      </ProForm.Item>
      {
        popVisible &&
        <PopSubmit
          visible={popVisible}
          setVisible={setPopVisible}
          data={valueData}
          back={callback}
        />
      }
    </ModalForm>
  )
}

export default SaveCard
