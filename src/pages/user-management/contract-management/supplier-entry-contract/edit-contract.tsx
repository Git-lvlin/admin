import { useRef, useEffect } from "react"
import ProForm, { 
  ModalForm, 
  ProFormText,
  ProFormRadio,
  ProFormDatePicker,
  ProFormDigit,
  ProFormDependency
} from "@ant-design/pro-form"

import type { EditContractProps, ModalFormProps } from "../data"
import type { FormInstance } from "antd"

import { editDetailInfo } from "@/services/setting/contract-management"
import Upload from "@/components/upload"
import moment from "moment"

const EditContract = (props: EditContractProps) => {
  const { visible, setVisible, data, id, callback } = props

  const form = useRef<FormInstance>()

  useEffect(()=>{
    if(data) {
      const type = {
        1: '线上合同',
        2: '线下合同'
      }[data.type]
      const signStatus = {
        1: '已签订',
        2: '未签订',
        3: '待上传',
        4: '待支付',
        5: '待签订'
      }[data.signStatus]

      form.current?.setFieldsValue({
        type,
        signStatus,
        name: data.name,
        phone: data.phone,
        pactNo: data.pactNo,
        operateName: data.operateName,
        mode: data.mode,
        createTime: moment(data.createTime * 1000).format("YYYY-MM-DD HH:mm:ss"),
        pactUrl: data.pactUrl ? data.pactUrl : null,
        signTime: data.signDte ? moment(data.signDte * 1000) : null,
        signLong: data.signLong ? data.signLong : ''
      })
    }
  }, [data])

  const submit = (v: ModalFormProps) => {
    return new Promise<void>((resolve, reject) => {
      editDetailInfo({
        ...v,
        signDte: moment(v.signTime).unix(),
        id
      }).then(res=> {
        if(res.code === 0) {
          callback()
          resolve()
        } else {
          reject('')
        }
      })
    })
  }

  return (
    <ModalForm<ModalFormProps>
      title="上传入驻合同文件"
      width={500}
      visible={visible}
      onVisibleChange={setVisible}
      onFinish={ async (v) => {
        await submit(v)
        return true
      }}
      layout="horizontal"
      formRef={form}
      wrapperCol={{span: 16}}
      labelCol={{span: 8}}
    >
      <div
        style={{
          overflowY: 'scroll',
          height: '500px'
        }}
      >
        <ProFormText
          label='合同类型'
          name='type'
          readonly
        />
        <ProFormText
          label='签订状态'
          name='signStatus'
          readonly
        />
        <ProFormText
          label='供应商名称'
          name='name'
          initialValue={data?.name}
          readonly
        />
        <ProFormText
          label='供应商手机'
          name='phone'
          initialValue={data?.phone}
          readonly
        />
        <ProFormRadio.Group
          name="mode"
          label="签订模式"
          rules={[{required: true}]}
          options={[
            {
              label: '普通',
              value: 1
            },
            {
              label: '特殊',
              value: 2
            }
          ]}
        />
        <ProForm.Item
          label='上传入驻合同文件'
          name='pactUrl'
          extra={<div>请上传pdf格式文件，不超过800KB</div>}
          rules={[{
            required: true
          }]}
        >
          <Upload 
            size={1024 * 0.8} 
            accept='.pdf' 
            code={307}
            isPDF={true}
          />
        </ProForm.Item>
        <ProFormText
          label='协议编号'
          name='pactNo'
          width='sm'
          rules={[{
            required: true
          }]}
        />
        <ProFormDatePicker 
          name="signTime" 
          label="签订日期" 
          width='sm'
          rules={[{
            required: true
          }]}
        />
        <ProFormDigit
          name="signLong" 
          label="合作期限" 
          width='sm'
          rules={[{
            required: true
          }]}
          fieldProps={{
            addonAfter: '个月'
          }}
        />
        <ProFormDependency name={['signTime', 'signLong']}>
          {({ signTime, signLong}) => {
            if(signTime && signLong) {
              return (
                <ProForm.Item
                  label='到期时间'
                  name='expireTime'
                >
                  <div>{moment(signTime).add(signLong, 'month').subtract(1, 'day').format('YYYY-MM-DD')}</div>
                </ProForm.Item>
              )
            } else {
              return null
            }
          }}
        </ProFormDependency>
        <ProFormText
          label='创建人'
          name='operateName'
          readonly
        />
        <ProFormText
          label='创建时间'
          name='createTime'
          readonly
        />
      </div>
    </ModalForm>
  )
}

export default EditContract
