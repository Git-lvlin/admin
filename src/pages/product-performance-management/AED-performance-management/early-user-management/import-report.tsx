import { useEffect, useRef } from 'react'
import ProForm, { ModalForm, ProFormText } from '@ant-design/pro-form'
import Upload from '@/components/upload'

import type { importReportProps } from './data'
import type { FormInstance } from 'antd'

import { reportHandle } from '@/services/product-performance-management/early-user-management'

const ImportReport:React.FC<importReportProps> = ({visible, setVisible, data, callback}) => {
  const form = useRef<FormInstance>()

  useEffect(()=> {
    form.current?.setFieldsValue({
      name: data?.signUser,
      detectionNo: data?.detectionNo
    })
  }, [])

  const submit = (value: any) => {
    return new Promise<void>((resolve, reject) => {
      reportHandle({...value, subOrderSn: data?.subOrderSn}, {showSuccess: true}).then(res => {
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
      title='导入报告'
      width={500}
      layout='horizontal'
      labelCol={{span: 10}}
      onFinish={async (values)=> {
        await submit(values)
        return true
      }}
      modalProps={{
        destroyOnClose: true
      }}
      formRef={form}
      submitter={{
        searchConfig: {
          resetText: '取消'
        }
      }}
      visible={visible}
      onVisibleChange={setVisible}
    >
      <ProFormText
        label='早筛人姓名'
        name='name'
        readonly
      />
      <ProFormText
        label='活检编号'
        name='detectionNo'
        readonly
      />
      {/* <ProFormText
        label='报告编号'
        name='reportNo'
        width='sm'
        rules={[{
          required: true
        }]}
      /> */}
      <ProForm.Item
        label='导入报告'
        name='reportUrl'
        rules={[{
          required: true
        }]}
      >
        <Upload code='309' accept='.pdf'/>
      </ProForm.Item>
    </ModalForm>
  )
}

export default ImportReport