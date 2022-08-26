import { ModalForm, ProFormRadio, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import type { FC } from 'react'
import { StopOperationProps, StopOperationFormProps } from "./data"

import styles from "./styles.less"
import { stopOperate } from "@/services/hydrogen-atom-trusteeship/equipment-management"

const StopOperation: FC<StopOperationProps> = ({visible, setVisible, data, callback}) => {

  const submit = (v: StopOperationFormProps) => {
    return new Promise<void>((resolve, reject) => {
      stopOperate({
        orderId: data?.orderId,
        ...v
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
      title='停止运营设备'
      width={550}
      visible={visible}
      onVisibleChange={setVisible}
      layout='horizontal'
      modalProps={{
        destroyOnClose: true
      }}
      labelCol={{span: 8}}
      wrapperCol={{ span: 14 }}
      onFinish={async (e: StopOperationFormProps)=> {
        await submit(e)
        return true
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
        label='设备关联运营商手机号'
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
      <div className={styles.stopOption}>
        <ExclamationCircleOutlined />
        <div>
          <div className={styles.marginTop}>到达停止生效时间后，设备将立即停用，并与运营商解绑，运营商无法继续获得设备健康卡营收的分成，消费者也无法继续使用健康卡在此设备消费。</div>
          <div className={styles.red}>请与运营商核时确认，谨慎操作！</div>
        </div>
      </div>
    </ModalForm>
  )
}

export default StopOperation
