import { ModalForm, ProFormTextArea } from '@ant-design/pro-form'

import type { modelProps } from './data'

import { unfreeze } from '@/services/financial-management/unfrozen-list'

const Model: React.FC<modelProps> = ({visible, setVisible, type, callback, id}) => {
  const obj = window.localStorage.getItem('user') as string
  const user = JSON.parse(obj)

  const submit = (v: {remark: string}) => {
    return new Promise<void>((resolve, reject) => {
      unfreeze({
        orderSn: id,
        type,
        operatorId: user.id,
        operator: user.username,
        ...v
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
      title='请确认要将此订单交易资金解冻给已分账的各角色？'
      layout='horizontal'
      visible={visible}
      onVisibleChange={setVisible}
      onFinish={async (values: {remark: string})=> {
        await submit(values)
        return true
      }}
      width={500}
      submitter={{
        searchConfig: {
          resetText: '暂时不解冻',
          submitText: `${type === 1 ? '解冻各分账角色的资金' : '确认解冻资金，并将资金转到平台账户'}`
        }
      }}
    >
      <ProFormTextArea
        label='解冻说明'
        name='remark'
        rules={[{required: true}]}
      />
    </ModalForm>
  )
}

export default Model
