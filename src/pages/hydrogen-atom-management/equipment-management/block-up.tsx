import ProForm, { 
  ModalForm,
  ProFormTextArea
} from '@ant-design/pro-form'
import { ExclamationCircleOutlined } from "@ant-design/icons"
import moment from 'moment'

import type{ FC } from "react"
import type { ModalFormProps, OptProps } from "./data"

import styles from './styles.less'
import { opt } from '@/services/hydrogen-atom-management/equipment-management'

const BlockUp: FC<ModalFormProps> = (props) => {
  const { visible, setVisible, id, type, refs, user, phone, status, expire } = props
  
  const submit = (v: OptProps) => {
    new Promise((resolve, reject) => {
      opt({
        imei: id,
        type,
        phone,
        remark: v.remark,
        packageType: v.packageType,
        amount: v.amount
      },
      {
        showSuccess: true,
        showError: true
      }
      ).then(res => {
        if(res.success) {
          refs.current?.reload()
          resolve('')
        }else {
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
      onFinish={async (values) => {
        submit(values)
        return true
      }}
      layout='horizontal'
      onVisibleChange={setVisible}
      title='确认提示'
      
      width={550}
      {...formItemLayout}
    >
      {
        (type === 1 || type === 2)?
        <>
          <div className={styles.tip}>
            <ExclamationCircleOutlined/>
            是否确定{type === 1 ? '停用' : '启用'}机器
          </div>
          <div className={styles.text}>{type === 1 ? '停用' : '启用'}后机器{type === 1 ? '将无法运营' : '即可正常使用'}</div>
          <ProFormTextArea
            label={type === 1 ? '停用理由' : '启用说明'}
            name="remark"
            width='md'
            fieldProps={{
              showCount: true,
              maxLength: 50,
              placeholder: `请输入${type === 1 ? '停用' : '启用'}用户机器使用的理由，5-50个字符`
            }}
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
          {
            (status === 2 && type === 2)&&
            <ProForm.Item
              label="租期状态"
            >
              租期中
            </ProForm.Item>
          }
          {
            (status === 3 && type === 2)&&
            <ProForm.Item
              label="租期状态"
            >
              已逾期（已逾期{moment(expire).fromNow().replace('前', '')}）
            </ProForm.Item>
          }
          {
            ((status === 2 || status === 3) && type === 2)&&
            <ProForm.Item
              label="租期截止日"
            >
              {expire}
            </ProForm.Item>
          }
          {
            (status === 3 && type === 2)&&
            <ProForm.Item label='启用后租期截止日期'>
              11
            </ProForm.Item>
          }
        </>:
        <>
          <div className={styles.tip}>
            <ExclamationCircleOutlined/>
            是否确定解除绑定用户{user}机器ID({id})
          </div>
          <div className={styles.text}>解除绑定后将无法管理机器！！！</div>
        </>
      }
    </ModalForm>
  )
}

export default BlockUp