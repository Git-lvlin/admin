import { useState } from 'react'
import { ModalForm, ProFormText, ProFormDigit, ProFormTextArea } from '@ant-design/pro-form'

import { amountTransform } from '@/utils/utils'
import { rechargeApply } from '@/services/financial-management/yeahgo-virtual-account-management'

const PayModal = ({visible, setVisible, callback, data, setPayInfo}) => {
  const [num, setNum] = useState()

  const submit = (value) => {
    return new Promise((resolve, reject) => {
      rechargeApply({
        ...value,
        amount: amountTransform(value.amount, '*')
      }).then(res => {
        if(res.code === 0) {
          setPayInfo(res?.data)
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
      title="账户充值"
      visible={visible}
      onVisibleChange={setVisible}
      modalProps={{
        destroyOnClose: true
      }}
      layout='horizontal'
      width={500}
      submitter={{
        searchConfig: {
          submitText: '立即充值'
        },
        resetButtonProps: {
          style: {
            display: 'none'
          }
        }
      }}
      onFinish={async (values) => {
        await submit(values)
      }}
    >
      <ProFormText
        label='充值账户'
        name='accountSn'
        initialValue={data?.platform?.sn}
        readonly
      />
      <div style={{margin: '20px 0'}}>现有余额：￥{amountTransform(data?.platform?.balance, '/')}</div>
      <ProFormDigit
        label='充值金额'
        name='amount'
        rules={[{required: true}]}
        fieldProps={{
          addonAfter: '元',
          value: num,
          onChange: (v) => {
            const val = v.toFixed(2)
            setNum(val)
          }
        }}
      />
      <ProFormTextArea
        label='充值描述'
        name='description'
        rules={[{required: true}]}
      />
      <div style={{marginTop: 20}}>支付方式：支付宝</div>
    </ModalForm>
  )
}

export default PayModal