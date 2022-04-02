import { useState, useEffect } from 'react'
import ProForm, {
  ModalForm,
  ProFormRadio,
  ProFormTextArea,
  ProFormDependency
} from '@ant-design/pro-form'
import { Form } from 'antd'

import type { FC } from 'react'
import type { aduitProps, formWrapData } from './data'

import { amountTransform } from '@/utils/utils'
import Upload from '@/components/upload'
import { accountDetail } from '@/services/daifa-store-management/list'
import { refuse, approve } from '@/services/intensive-store-management/cancel-aduit'

const Aduit: FC<aduitProps> = ({visible, setVisible, data, callback})=> {

  const [amount, setAmount] = useState(0)
  const [form] = Form.useForm()

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 }
  }

  useEffect(()=> {
    accountDetail({ accountType: 'store', accountId: data?.storeNo }).then(res => {
      setAmount(amountTransform(res.data?.total, '/'))
    })
  },[])

  const checkConfirm = ({value}: {value:string}) => {
    return new Promise(async (resolve, reject) => {
    if (value&&value.length<5) {
      reject('最少输入5个字符')
    }else {
      resolve('error')
    }
    })
  }

  const FromWrap: FC<formWrapData> = ({ value, onChange, content, right }) => (
    <div style={{ display: 'flex' }}>
      <div>{content(value, onChange)}</div>
      <div style={{ flex: 1, marginLeft: 10, minWidth: 180 }}>{right(value)}</div>
    </div>
  )

  const submit = (values: any) =>{
    return new Promise((resolve, reject) => {
      if(values.toStatus === 2) {
        approve({
          applyId: data.applyId,
          balance: amount,
          attachList: values.attachList
        }).then(res => {
          if (res.code === 0) {
            callback()
            resolve('')
          } else {
            reject('')
          }
        })
      } else {
        refuse({
          applyId: data.applyId,
          auditMsg: values.auditMsg
        }, {showSuccess: true}).then((res) => {
          if (res.code === 0) {
            callback()
            resolve('')
          } else {
            reject('')
          }
        })
      }
    })
  }

  return (
    <ModalForm
      title={`请确认审核店铺注销申请操作（店铺ID：${data.storeId}）`}
      visible={visible}
      onVisibleChange={setVisible}
      width={550}
      form={form}
      onFinish={async (values) => {
        await submit(values)
        return true;
      }}
      layout= "horizontal"
      modalProps={{
        destroyOnClose: true
      }}
      {...formItemLayout}
    >
      <ProForm.Item label="店铺名称">{data.storeName}</ProForm.Item>
      <ProForm.Item label="店主手机号">{data.memberPhone}</ProForm.Item>
      <ProForm.Item label="店铺地址">
        <div>{data.provinceName}{data.cityName}{data.regionName}</div>
        <div>{data.address}</div>
      </ProForm.Item>
      <ProForm.Item label="当前店主账号余额">{amount}元</ProForm.Item>
      <ProFormRadio.Group
        name="toStatus"
        label="操作结果"
        rules={[{ required: true, message: '请选择操作' }]}
        options={[
          {
            label: '审核拒绝',
            value: 1,
          },
          {
            label: '审核通过',
            value: 2,
          }
        ]}
        initialValue={1}
      />
      <ProFormDependency name={['toStatus']}>
        {({ toStatus }) => {
          if(toStatus === 2){
            return <div style={{ color: 'red', marginLeft: 130, marginTop: '-25px', marginBottom: 20 }}>注销后不能再开启，请谨慎操作！</div>
          }
        }}
      </ProFormDependency>
      <ProFormDependency name={['toStatus']}>
        {({ toStatus }) => {
          return toStatus === 1 && 
          <ProFormTextArea
            name="auditMsg"
            label="理由"
            placeholder="请输入 5-20个字符"
            rules={[
              { required: true, message: '请输入理由' },
              {validator: checkConfirm}
            ]}
            fieldProps={{
              maxLength:20,
            }}
          />
        }}
      </ProFormDependency>
      <ProFormDependency name={['toStatus']}>
        {({ toStatus }) => {
          return toStatus === 2 && <>
            <Form.Item
              label="附件"
              name="attachList"
              rules={[{ required: true, message: '请上传附件' }]}
            >
              <FromWrap
                content={(value, onChange) => <Upload  value={value} onChange={onChange}   maxCount={9} accept="image/*"  size={3 * 1024} />}
                right={() => {
                  return (
                    <dl>
                      <dd>不超过9张图片</dd>
                      <dd>每张小于3M</dd>
                      <dd>与店主沟通放弃余额等的记录截图文件</dd>
                    </dl>
                  )
                }}
              />
            </Form.Item>
          </>
        }}
      </ProFormDependency>
    </ModalForm>
  )
}

export default Aduit
