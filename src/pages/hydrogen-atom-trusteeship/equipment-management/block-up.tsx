import { 
  ModalForm,
  ProFormTextArea
} from '@ant-design/pro-form'
import { ExclamationCircleOutlined } from "@ant-design/icons"

import type{ FC } from "react"
import type { ModalFormProps, OptProps } from "./data"

import styles from './styles.less'
import { deviceSwitch } from '@/services/hydrogen-atom-trusteeship/equipment-management'

const BlockUp: FC<ModalFormProps> = (props) => {
  const { visible, setVisible, type, orderId, callback } = props
  
  const submit = (v: OptProps) => {
    return new Promise<void>((resolve, reject) => {
      deviceSwitch({...v, orderId}).then(res => {
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
    labelCol: { span: 7 },
    wrapperCol: { span: 17 }
  }

  return (
    <ModalForm
      visible={visible}
      onFinish={async (values: OptProps) => {
        submit(values)
        return true
      }}
      layout='horizontal'
      onVisibleChange={setVisible}
      title='确认提示'
      
      width={550}
      {...formItemLayout}
    >
      <div className={styles.tip}>
        <ExclamationCircleOutlined/>
        是否确定{type === 1 ? '停用' : '启用'}机器
      </div>
      <div className={styles.text}>{type === 1 ? '停用' : '启用'}后机器{type === 1 ? '将无法运营' : '即可正常使用'}</div>
      <ProFormTextArea
        label={type === 1 ? '停用理由' : '启用说明'}
        name="optContent"
        width='md'
        fieldProps={{
          showCount: true,
          maxLength: 50,
          placeholder: `请输入${type === 1 ? '停用' : '启用'}用户机器使用的理由，5-50个字符`
        }}
        validateFirst
        rules={[
          { 
            required: true
          },
          () => ({
            validator(_, value) {
              if (value.length < 5) {
                return Promise.reject(new Error(`请输入5-50个字符`))
              }
              return Promise.resolve()
            },
          })
        ]}
      />
    </ModalForm>
  )
}

export default BlockUp