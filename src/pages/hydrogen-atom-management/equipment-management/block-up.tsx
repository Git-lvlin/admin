import { ModalForm } from '@ant-design/pro-form'
import { ExclamationCircleOutlined } from "@ant-design/icons"

import type { FC } from "react"
import type { ModalFormProps } from "./data"

import styles from './styles.less'
import { opt } from '@/services/hydrogen-atom-management/equipment-management'

const BlockUp: FC<ModalFormProps> = (props) => {
  const { visible, setVisible, id, type, refs, user, phone } = props
  
  const submit = () => {
    new Promise((resolve, reject) => {
      opt({
        imei: id,
        type,
        phone
      }).then(res => {
        if(res.success) {
          refs.current?.reload()
          resolve('')
        }else {
          reject()
        }
      })
    })
  }

  return (
    <ModalForm
      visible={visible}
      onFinish={async () => {
        submit()
        return true
      }}
      onVisibleChange={setVisible}
      title='确认提示'
      width={type === 3 ? 550 : 300}
    >
      {
        (type === 1 || type === 2)?
        <>
          <div className={styles.tip}>
            <ExclamationCircleOutlined/>
            是否确定{type === 1 ? '停用' : '启用'}机器
          </div>
          <div>{type === 1 ? '停用' : '启用'}后机器{type === 1 ? '将无法运营' : '即可正常使用'}</div>
        </>:
        <>
          <div className={styles.tip}>
            <ExclamationCircleOutlined/>
            是否确定解除绑定用户{user}机器ID({id})
          </div>
          <div>解除绑定后将无法管理机器！！！</div>
        </>
      }
    </ModalForm>
  )
}

export default BlockUp