import { useEffect, useRef, useState } from 'react'
import { 
  ModalForm, 
  ProFormDateTimePicker,
  ProFormText,
  ProFormTextArea,
  ProFormSelect
} from '@ant-design/pro-form'

import type { FC  } from 'react'
import type { FormInstance } from 'antd'
import type { FormProps, AddRecordProps, dataProps } from './data'

import { addDonateRecord, getPackageList } from '@/services/love-feedback-activities/registration-record-love-feedback'
import styles from './styles.less'


const AddRecord: FC<AddRecordProps> = ({visible, setVisible, callback}) => {
  const [num, setNum] = useState<number>(1)
  const [types, setTypes] = useState([])
  const [value, setValue] = useState<number>()
  const form = useRef<FormInstance>()

  useEffect(()=> {
    const name = window.localStorage.getItem('nickname')
    form.current?.setFieldsValue({
      operator: name
    })
  }, [])

  useEffect(()=> {
    getPackageList().then(res => {
      if(res.success) {
        setTypes(res.data.records?.map((data: dataProps) => ({
          label: data.salePrice,
          value: data.packageId
        })))
      }
    })
  }, [])

  useEffect(()=>{
    if(value) {
      form.current?.setFieldsValue({
        amount: `${value} X ${num} = ${value * num}元`
      })
    }
  }, [value, num])

  const submit = (e: FormProps) => {
    return new Promise<void>((resolve, reject) => {
      addDonateRecord(e, {showSuccess: true}).then(res => {
        if(res.success) {
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
      title='添加记录'
      visible={visible}
      onVisibleChange={setVisible}
      width={500}
      layout='horizontal'
      labelCol={{ span: 8}}
      wrapperCol={{ span: 20 }}
      formRef={form}
      onFinish={async (values)=> {
        await submit(values)
        return true
      }}
    >
      <ProFormDateTimePicker 
        label='交易时间'
        name='tradeTime'
        rules={[{required: true}]}
      />
      <ProFormText
        label='附言手机号'
        name='phone'
        rules={[{required: true}]}
      />
      <ProFormText
        label='付款人户名'
        name='userName'
        rules={[{required: true}]}
      />
      <ProFormSelect
        label='交易金额类型'
        name='packageId'
        rules={[{required: true, message: '请选择交易金额类型'}]}
        options={types}
        fieldProps={{
          allowClear: false,
          placeholder: '请选择交易金额类型',
          onChange: (_, e:any) => setValue(e.label)
        }}
      />
      <ProFormSelect
        label='捐款数量'
        name='payNum'
        rules={[{required: true}]}
        options={[
          {label: 1, value: 1},
          {label: 2, value: 2},
          {label: 3, value: 3},
          {label: 4, value: 4},
          {label: 5, value: 5},
          {label: 6, value: 6},
          {label: 7, value: 7},
          {label: 8, value: 8},
          {label: 9, value: 9},
          {label: 10, value: 10}
        ]}
        initialValue={1}
        fieldProps={{
          onChange: e => setNum(e),
          allowClear: false,
          placeholder: '请选择捐款数量'
        }}
        extra={<div className={styles.extra}>将添加 {num} 条记录</div>}
      />
      <ProFormText 
        label='捐款总金额'
        name='amount'
        readonly
      />
      <ProFormText
        label='付款人账号'
        name='payAccount'
        rules={[{required: true}]}
      />
      <ProFormText
        label='电子回单编号'
        name='replySlipNo'
        rules={[{required: true}]}
      />
      <ProFormTextArea
        label='附言'
        name='attachment'
        rules={[{required: true}]}
      />
      <ProFormText
        label='录入操作人'
        name='operator'
        readonly
      />
    </ModalForm>
  )
}

export default AddRecord
