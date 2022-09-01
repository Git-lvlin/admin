import { ModalForm, ProFormRadio, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import type { FC } from "react"
import type { TerminateManagedFormProps, TerminateManagedProps } from "./data"

import styles from "./styles.less"
import { stopOperateHosting, stopHosting } from "@/services/hydrogen-atom-trusteeship/equipment-management"

const TerminateManaged: FC<TerminateManagedProps> = (props) => {
  const {visible, setVisible, data, callback, title = '运营中设备终止托管', type = 1} = props

  const api = {
    1: stopOperateHosting,
    2: stopHosting
  }[type]

  const submit = (e: TerminateManagedFormProps) => {
    return new Promise<void>((resolve, reject) => {
      api?.({
        orderId: data?.orderId,
        ...e
      },{
        showSuccess: true
      }).then(res => {
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
      width={550}
      visible={visible}
      onVisibleChange={setVisible}
      layout='horizontal'
      modalProps={{
        destroyOnClose: true
      }}
      labelCol={{span: 8}}
      wrapperCol={{ span: 14 }}
      onFinish={async (e: TerminateManagedFormProps)=> {
        await submit(e)
        return true
      }}
      submitter={{
        searchConfig: {
          submitText: '停止运营并终止托管设备',
          resetText: '取消'
        }
      }}
    >
      <ProFormText
        name='imei'
        label='当前机器ID'
        initialValue={data?.imei}
        readonly
      />
      <ProFormText
        name='hostingMemberPhone'
        label='设备所属投资人手机号'
        initialValue={data?.hostingMemberPhone}
        readonly
      />
      <ProFormText
        name='storePhone'
        label='设备关联运营中心手机号'
        initialValue={data?.storePhone}
        readonly
      />
      <ProFormSelect
        name='leaseStatus'
        label='当前租期状态'
        initialValue={data?.leaseStatus}
        valueEnum={{
          1:'免租期',
          2:'租期中',
          3:'已逾期'
        }}
        readonly
      />
      <ProFormText
        name='leaseDeadline'
        label='当前租期截止日'
        initialValue={data?.leaseDeadline}
        readonly
      />
      {
        type === 1 &&
        <>
          <ProFormRadio.Group
            name='optType'
            label="运营资质操作"
            rules={[{required: true}]}
            options={[
              {
                label: '不扣除资质',
                value: 1
              },
              {
                label: '扣除1台设备的运营资质',
                value: 2
              }
            ]}
          />
          <ProFormTextArea
            label='停止运营原因'
            name='optContent'
            rules={[
              () => ({
                validator(_, value) {
                  if (value.length < 5) {
                    return Promise.reject(new Error('请输入5-30个字符'))
                  }
                  return Promise.resolve()
                }
              }),
              {required: true}
            ]}
            placeholder='请输入5-30个字符'
            fieldProps={{
              showCount: true,
              maxLength: 30
            }}
            validateFirst
            width='md'
          />
          <ProFormRadio.Group
            name='examType'
            label="生效时间"
            rules={[{required: true}]}
            options={[
              {
                label: '立即停止',
                value: 1
              },
              {
                label: '本月底24点停止(考核本月业绩)',
                value: 3
              }
            ]}
          />
        </>
      }
      <ProFormSelect
        name={ type === 1 ? 'hosingOptType' : 'optType'}
        label='请求终止方'
        rules={[{required: true}]}
        valueEnum={{
          1: '投资人要求终止托管',
          2: '平台决定终止托管'
        }}
      />
      <ProFormTextArea
        label='终止托管原因'
        name={type === 1 ? 'hosingOptContent' : 'optContent'}
        rules={[
          () => ({
            validator(_, value) {
              if (value.length < 5) {
                return Promise.reject(new Error('请输入5-30个字符'))
              }
              return Promise.resolve()
            }
          }),
          {required: true}
        ]}
        placeholder='请输入5-30个字符'
        fieldProps={{
          showCount: true,
          maxLength: 30
        }}
        validateFirst
        width='md'
      />
      <div className={styles.stopOption}>
        <ExclamationCircleOutlined />
        <div>
          <div className={styles.marginTop}>终止托管后，投资人将不能继续获得消费分成，设备将立即停用，并与运营中心解绑，消费者无法继续使用健康卡在此设备消费。请及时在线下将设备收回！</div>
          <div className={styles.red}>请与投资人核实确认，谨慎操作！</div>
        </div>
      </div>
    </ModalForm>
  )
}

export default TerminateManaged
