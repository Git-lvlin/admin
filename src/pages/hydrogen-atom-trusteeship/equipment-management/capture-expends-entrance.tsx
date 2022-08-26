import { useState, useEffect } from "react"
import { 
  ModalForm, 
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormRadio
} from '@ant-design/pro-form'
import { ExclamationCircleOutlined } from "@ant-design/icons"
import moment from "moment"

import type { FC } from "react"
import type { ModificationProps, InfoProps } from "./data"

import styles from "./styles.less"
import { oepnRenewWindowTips, oepnRenewWindow } from '@/services/hydrogen-atom-trusteeship/equipment-management'
import { amountTransform } from "@/utils/utils"

const CaptureExpendsEntrance: FC<ModificationProps> = (props) => {
  const { visible, setVisible, data, callback } = props
  const [type, setType] = useState()
  const [info, setInfo] = useState<InfoProps>()

  useEffect(()=> {
    oepnRenewWindowTips().then(res => {
      setInfo(res.data)
    })
  }, [])

  const submit = (v: any) => {
    return new Promise<void>((resolve, reject) => {
      oepnRenewWindow({
        qualificationId: data?.storeQualificationId,
        leaseStart: v.leaseStart,
        duration: v.duration,
        amount: amountTransform(v.amount, '*'),
        remark: v.remark
      }, {
        showSuccess: true
      }).then(res=>{
        if(res.code === 0) {
          callback()
          resolve()
        } else {
          reject()
        }
      })
    })
  }

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }

  return (
    <ModalForm
      visible={visible}
      onFinish={async (values: any) => {
        submit(values)
        return true
      }}
      layout='horizontal'
      onVisibleChange={setVisible}
      title='确认提示'
      width={600}
      {...formItemLayout}
    >
      <div className={styles.tip}>
        <ExclamationCircleOutlined/>
        是否开启机器缴费入口？
      </div>
      <ProFormTextArea
        label='开启说明'
        name='remark'
        rules={[{required: true}]}
        width='md'
      />
      <ProFormText
        label='当前缴费截止日'
        name='payDeadline'
        initialValue={data?.payDeadline}
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
        label='当前租期截止日'
        name='leaseDeadline'
        initialValue={data?.leaseDeadline}
        readonly
      />
      <ProFormDigit
        label='开启缴费入口时长'
        name='duration'
        width='md'
        rules={
          [{
            required: true,
            message: '请输入入口显示时长，1-1000整数'
          }]
        }
        fieldProps={{
          placeholder: '请输入入口显示时长，1-1000整数',
          step: 1,
          max: 1000,
          min: 1,
          addonAfter: '小时'
        }}
      />
      {
        data?.leaseStatus === 3 &&
        <ProFormRadio.Group
          label='缴费配置'
          name='leaseStart'
          fieldProps={{
            onChange: (e) => setType(e.target.value)
          }}
          initialValue='last_end'
          options={[
            {
              label: '按配置缴费，已逾期时段的管理费都需交齐',
              value: 'last_end'
            },
            {
              label: '按配置缴费，已逾期时段的管理费都不用交',
              value: 'pay_time'
            },
            {
              label: '交纳指定费用，已逾期时段的管理费都不用交',
              value: 'pay_to_end_month'
            }
          ]}
        />
      }
      {
        type === 'pay_to_end_month'&&
        <ProFormDigit
          label='指定缴费金额'
          name='amount'
          fieldProps={{
            placeholder: '请输入需要缴费的金额，0-99999.99',
            max: 99999.99,
            min: 0
          }}
          rules={
            [{
              required: true,
              message: '请输入需要缴费的金额，0-99999.99'
            }]
          }
          extra={
            <>
              {
                info?.amountTips.map(res=> (
                  <div key={res}>{res}</div>
                ))
              }
            </>
          }
        />
      }
      {
        type === 'pay_to_end_month'&&
        <ProFormText
          label='缴费后租期截止日'
          name='leaseEnd'
          readonly
          initialValue={`${moment(+new Date()).format('MM月DD日')}（即日起至月底 ）`}
          extra={<div>{info?.endTips}</div>}
        />
      }
    </ModalForm>
  )
}

export default CaptureExpendsEntrance