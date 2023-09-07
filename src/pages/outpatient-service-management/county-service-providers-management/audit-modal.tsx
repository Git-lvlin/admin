import ProForm, { 
  ModalForm, 
  ProFormText, 
  ProFormRadio,
  ProFormDependency,
  ProFormDigit,
  ProFormTextArea
} from '@ant-design/pro-form'

import { providerAuditSecond } from '@/services/outpatient-service-management/county-service-providers-management'

type props = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  id?: string
  callback: () => void
}

const AuditModal:React.FC<props> = ({visible, setVisible, id, callback}) => {

  const submit = () => {
    return new Promise<void>((resolve, reject) => {
      providerAuditSecond({

      }).then(res => {

      })
    })
  }

  return (
    <ModalForm
      title='区县服务商初审'
      width={500}
      visible={visible}
      onVisibleChange={setVisible}
      modalProps={{
        destroyOnClose: true
      }}
      layout='horizontal'
      labelCol={{span: 8}}
      onFinish={async ()=> {
        await submit()
        callback()
        return true
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
      />
      <ProFormText 
        label='订单金额'
        name='payAmountDesc'
        readonly
      />
      <ProFormText
        label='法大大合同ID'
        name=''
        readonly
      />
      <ProForm.Item
        label='付款凭证图片'
        name='voucherImg'
      >

      </ProForm.Item>
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
      <ProFormText
        label='初审人'
        name=''
        readonly
      />
    </ModalForm>
  )
}

export default AuditModal